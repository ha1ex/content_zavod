import chalk from 'chalk';

/**
 * Generic repair loop (этап 4).
 *
 * Контракт: generate() возвращает T или бросает (NoObjectGeneratedError, AbortError и т.п.).
 * validate(T) возвращает структурированные ошибки. Если ошибки есть — раннер собирает
 * "what to fix" обратную связь через buildRepairMessage() и зовёт generate(again, feedback).
 *
 * Принципы:
 *   - первая попытка — без feedback (модель ещё не видела ошибок);
 *   - каждый следующий вызов получает list[T_error] в человекочитаемом виде;
 *   - максимум maxAttempts всего (1 baseline + N-1 repairs).
 */

export interface RepairAttemptLog<E> {
  attempt: number;
  ok: boolean;
  errors: E[];
  durationMs: number;
  /** Подъём из generate() (если был throw). Тогда result === undefined. */
  threw?: Error;
}

export interface RepairResult<T, E> {
  /** Успешный результат, если хоть одна попытка прошла валидатор. Иначе — последний кандидат (может быть undefined). */
  result?: T;
  ok: boolean;
  attempts: RepairAttemptLog<E>[];
  /** Ошибки валидатора последней попытки. Пуст если ok=true. */
  finalErrors: E[];
}

export interface RepairOptions<T, E> {
  /**
   * @param attempt 1-based номер попытки
   * @param feedback Описание ошибок предыдущей попытки. undefined на attempt=1.
   * @param previous Кандидат, который не прошёл валидатор (если был). undefined на attempt=1.
   */
  generate: (attempt: number, feedback: string | undefined, previous: T | undefined) => Promise<T>;
  validate: (value: T) => { ok: boolean; errors: E[] };
  buildRepairMessage: (errors: E[]) => string;
  maxAttempts?: number;
  /** chalk-логгер; передай (msg) => void или () => {} чтобы заглушить. */
  log?: (line: string) => void;
}

export async function runWithRepair<T, E>(opts: RepairOptions<T, E>): Promise<RepairResult<T, E>> {
  const maxAttempts = Math.max(1, opts.maxAttempts ?? 2);
  const log = opts.log ?? ((line: string) => console.log(line));
  const attempts: RepairAttemptLog<E>[] = [];
  let previous: T | undefined;
  let feedback: string | undefined;
  let lastErrors: E[] = [];

  for (let i = 1; i <= maxAttempts; i++) {
    const t0 = Date.now();
    try {
      const value = await opts.generate(i, feedback, previous);
      const v = opts.validate(value);
      const dur = Date.now() - t0;
      attempts.push({ attempt: i, ok: v.ok, errors: v.errors, durationMs: dur });
      if (v.ok) {
        log(chalk.green(`[repair] ✓ attempt ${i} passed (${dur}ms)`));
        return { result: value, ok: true, attempts, finalErrors: [] };
      }
      log(chalk.yellow(`[repair] ✗ attempt ${i}: ${v.errors.length} error(s) (${dur}ms)`));
      previous = value;
      feedback = opts.buildRepairMessage(v.errors);
      lastErrors = v.errors;
    } catch (err) {
      const dur = Date.now() - t0;
      const e = err instanceof Error ? err : new Error(String(err));
      attempts.push({ attempt: i, ok: false, errors: [], durationMs: dur, threw: e });
      log(chalk.red(`[repair] ✗ attempt ${i} threw: ${e.message} (${dur}ms)`));
      // throw-фидбек: подсовываем модели сообщение об ошибке для попытки 2+
      feedback = `Previous attempt failed with: ${e.message}. Re-emit a strictly valid output.`;
      previous = undefined;
      lastErrors = [];
    }
  }

  return { result: previous, ok: false, attempts, finalErrors: lastErrors };
}
