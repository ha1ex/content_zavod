/**
 * ru-typography — авто-простановка неразрывных пробелов по правилу дизайн-системы
 * (`.claude/skills/design-system-kaiten-v01/SKILL.md`, раздел «неразрывные пробелы»).
 * Применяется в ОБОИХ путях рендера (preview `RenderLanding` + TSX-генератор
 * `render-landing`), поэтому авторам вручную ставить ` ` не нужно — правило
 * зашито в рендер. Правило контент-завода: `ru-nbsp-typography`.
 *
 * Что делает:
 *  1. короткие предлоги/союзы (в, и, к, с, о, на, за, из, что, как, или, а, но…)
 *     не висят в конце строки → неразрывный пробел к СЛЕДУЮЩЕМУ слову;
 *  2. частицы ли/же/бы/ль → неразрывный пробел к ПРЕДЫДУЩЕМУ слову;
 *  3. длинное тире «—» отбивается неразрывным пробелом от предыдущего слова.
 *
 * Безопасно для кода/команд/URL: трогает только русские служебные слова + пробел
 * и « — », которых в командах CLI (`kaiten --json …`), путях и ссылках нет.
 * Внутренние дефисы (AI-агент) НЕ трогает — это делается точечно в самом тексте
 * неразрывным дефисом U+2011. Идемпотентна.
 */

const NBSP = ' ';

// Короткие предлоги/союзы — клеим к следующему слову (список из DS §nbsp).
const GLUE_NEXT =
  'в|и|к|с|у|о|на|по|за|из|от|до|под|без|для|над|при|про|что|как|или|а|но|не|если|во|со|об|то|это|мы|вы|их|я';
const GLUE_NEXT_RE = new RegExp(`(^|[\\s(«„"'\\-—])(${GLUE_NEXT})[ \\t]+`, 'gi');

export function ruNbsp(text: string): string {
  if (typeof text !== 'string' || text.length === 0) return text;
  let t = text;
  // 1) предлоги/союзы → к следующему слову; несколько проходов для цепочек («и в …»)
  for (let i = 0; i < 3; i++) {
    const prev = t;
    t = t.replace(GLUE_NEXT_RE, (_m, b, w) => `${b}${w}${NBSP}`);
    if (t === prev) break;
  }
  // 2) частицы ли/же/бы/ль → к предыдущему слову
  t = t.replace(/[ \t]+(ли|же|бы|ль)(?=[\s.,!?;:)»"']|$)/gi, `${NBSP}$1`);
  // 3) длинное тире отбивается неразрывным пробелом от предыдущего слова
  t = t.replace(/(\S)[ \t]+—/g, `$1${NBSP}—`);
  return t;
}

/** Глубокий обход: применяет ruNbsp ко всем строковым значениям структуры. */
export function ruNbspDeep<T>(value: T): T {
  if (typeof value === 'string') return ruNbsp(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => ruNbspDeep(v)) as unknown as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = ruNbspDeep(v);
    return out as T;
  }
  return value;
}
