import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { LandingSpec } from '../schemas/landing-spec';

/**
 * custom-tz-fidelity — проверка дословного соответствия копирайта лендинга ТЗ.
 *
 * Только для custom-флоу (1-в-1 по ТЗ). Сверяет каждую копирайт-строку спека с
 * источником ТЗ (`content/briefs/<slug>.tz.md`) и флагит строки, которых там нет
 * дословно (перефраз / выдумка / пропуск). Advisory: возвращает warnings, не
 * блокирует. Визуальные данные (hero.board, mockVariant, иконки) НЕ проверяются —
 * это правила рендера, не ТЗ.
 *
 * Точность зависит от полноты ТЗ-источника: если intake извлёк docx не полностью
 * (текстбоксы/картинки), в tz.md не будет части текста → возможны ложные warnings.
 * См. правило `custom-tz-full-extraction`.
 */

export interface TzFidelityWarning {
  where: string;
  text: string;
}

export interface TzFidelityResult {
  ok: boolean;
  warnings: TzFidelityWarning[];
  checked: number;
  source: string | null;
}

/** Нормализация для сравнения: регистр, кавычки, тире, разделители бейджей, пробелы. */
function norm(s: string): string {
  return s
    .toLowerCase()
    .replace(/[«»"'`]/g, '"')
    .replace(/[—–]/g, '-')
    .replace(/[·|→↦►▸]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Копирайт-строки лендинга (без визуальных данных: hero.board, mockVariant, icon). */
function collectCopy(spec: LandingSpec): Array<{ where: string; text: string }> {
  const out: Array<{ where: string; text: string }> = [];
  const push = (where: string, t: unknown) => {
    if (typeof t === 'string' && t.trim().length >= 3) out.push({ where, text: t });
  };
  spec.sections.forEach((s, i) => {
    const c = s.component;
    if (c === 'SiteHeader' || c === 'LandingFooterMock' || c === 'LandingFooter') return;
    const p = s.props as Record<string, unknown>;
    push(`${c}[${i}].eyebrow`, p.eyebrow);
    push(`${c}[${i}].title`, p.title);
    push(`${c}[${i}].subtitle`, p.subtitle);
    push(`${c}[${i}].description`, p.description);
    push(`${c}[${i}].footnote`, p.footnote);
    push(`${c}[${i}].text`, p.text);
    const items = p.items as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(items)) {
      items.forEach((it, j) => {
        push(`${c}[${i}].items[${j}].title`, it.title);
        push(`${c}[${i}].items[${j}].description`, it.description);
        push(`${c}[${i}].items[${j}].question`, it.question);
        push(`${c}[${i}].items[${j}].answer`, it.answer);
        push(`${c}[${i}].items[${j}].brand`, it.brand);
      });
    }
    const secs = p.sections as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(secs)) {
      secs.forEach((sec, j) => {
        push(`${c}[${i}].sections[${j}].title`, sec.title);
        const rows = sec.rows as Array<Record<string, unknown>> | undefined;
        if (Array.isArray(rows)) rows.forEach((r, k) => push(`${c}[${i}].sections[${j}].rows[${k}]`, r.label));
      });
    }
    const rows = p.rows as Array<Record<string, unknown>> | undefined;
    if (Array.isArray(rows)) rows.forEach((r, k) => push(`${c}[${i}].rows[${k}]`, r.label));
    const pc = p.primaryCta as { label?: string } | undefined;
    const sc = p.secondaryCta as { label?: string } | undefined;
    if (pc?.label) push(`${c}[${i}].primaryCta`, pc.label);
    if (sc?.label) push(`${c}[${i}].secondaryCta`, sc.label);
  });
  return out;
}

export async function validateLandingTzFidelity(
  spec: LandingSpec,
  opts: { root: string; slug: string },
): Promise<TzFidelityResult> {
  let src: string | null = null;
  const tzMd = resolve(opts.root, 'content', 'briefs', `${opts.slug}.tz.md`);
  try {
    src = await readFile(tzMd, 'utf-8');
  } catch {
    src = null;
  }
  if (!src) return { ok: true, warnings: [], checked: 0, source: null };

  const normSrc = norm(src);
  const copy = collectCopy(spec);
  const warnings: TzFidelityWarning[] = [];
  for (const { where, text } of copy) {
    if (!normSrc.includes(norm(text))) {
      warnings.push({ where, text: text.length > 70 ? text.slice(0, 67) + '…' : text });
    }
  }
  return {
    ok: warnings.length === 0,
    warnings,
    checked: copy.length,
    source: `content/briefs/${opts.slug}.tz.md`,
  };
}
