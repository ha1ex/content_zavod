import { cn } from '../../primitives/cn';
import { DarkTerminal, ResultCard, TPrompt, TFlag, TStr, TNum, TKey } from './DarkTerminal';

/**
 * Скрипты и ИИ-агенты Kaiten CLI: массовое чтение batch-get берёт список
 * карточек за один заход, а строка stats показывает, сколько обращений к API
 * ушло на задачу. Внизу — сравнение «по одной карточке» и «batch-get».
 * Одна ось цвета — экономия обращений (зелёный = меньше запросов).
 * Терминал — в едином стиле DarkTerminal (эталон CTAdark).
 * Домен: cli-community-edition.
 */
export function CliBatchStatsMock() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[600px] space-y-3">
      <DarkTerminal title="bash — кайтен@ваш-сервер">
        <div className="ln">
          <TPrompt />
          <TFlag>--json</TFlag>
          <span>card-location-history batch-get</span>
        </div>
        <div className="ln ind">
          <TFlag>--card-ids</TFlag>
          <TStr>&apos;[101, 102, 103]&apos;</TStr>
        </div>

        {/* stats-блок */}
        <div className="dterm__panel">
          <div className="ln">
            <TKey>&quot;stats&quot;</TKey>
            <span>{'{'}</span>
          </div>
          <div className="ln ind">
            <TKey>&quot;cards&quot;</TKey>
            <span>:</span>
            <TNum>3</TNum>
            <span>,</span>
            <TKey>&quot;http_request_count&quot;</TKey>
            <span>:</span>
            <TNum>1</TNum>
          </div>
          <div className="ln">
            <span>{'}'}</span>
          </div>
        </div>
      </DarkTerminal>

      {/* результат: сравнение стратегий чтения — одна карта, две строки */}
      <ResultCard>
        <div className="mb-3 text-[11px] font-semibold uppercase text-(--color-text-secondary)">
          Обращений к API за задачу
        </div>
        <div className="space-y-2">
          <CompareRow label="По одной карточке" requests="3 запроса" width="w-full" strong={false} />
          <CompareRow label="batch-get" requests="1 запрос" width="w-[34%]" strong />
        </div>
      </ResultCard>
    </div>
  );
}

function CompareRow({
  label,
  requests,
  width,
  strong,
}: {
  label: string;
  requests: string;
  width: string;
  strong: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex w-36 shrink-0 items-center gap-1.5 text-[11.5px] font-medium text-(--color-text-primary)">
        {strong ? (
          <span className="inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-(--color-green-100) text-(--color-neutral-000)">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
        {label}
      </span>
      <div className="relative h-5 flex-1 overflow-hidden rounded-md bg-(--color-neutral-200)">
        <div
          className={cn(
            'h-full rounded-md',
            width,
            strong ? 'bg-(--color-green-100)' : 'bg-(--color-neutral-400)',
          )}
        />
      </div>
      <span
        className={cn(
          'w-20 shrink-0 text-right text-[12px] font-semibold tabular-nums',
          strong ? 'text-green-700' : 'text-(--color-text-secondary)',
        )}
      >
        {requests}
      </span>
    </div>
  );
}
