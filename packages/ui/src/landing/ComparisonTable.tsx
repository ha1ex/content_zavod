import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { ComparisonTableMock, type KctSection } from './mocks/ComparisonTableMock';
import { ComparisonCopyMock } from './mocks/ComparisonCopyMock';

export interface ComparisonRowProps {
  label: string;
  /** Значения по колонкам — string или boolean (✓/✗). */
  values: Array<string | boolean>;
}

export interface ComparisonColumnProps {
  name: string;
  badge?: string;
  highlighted?: boolean;
}

/** Строка grouped-режима: a=Кайтен, b=конкурент. boolean → ✓/−; строка → текст ячейки. */
export interface ComparisonGroupedRow {
  label: string;
  a: boolean | string;
  b: boolean | string;
}

/** Раздел grouped-режима для ComparisonTableMock. Пустой title → без раскрывашки. */
export interface ComparisonSection {
  title?: string;
  rows: ComparisonGroupedRow[];
}

export interface ComparisonTableProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Название конкурента (grouped-режим). */
  competitor?: string;
  /** Текстовый заголовок лиловой колонки вместо логотипа Кайтена (сравнение двух продуктов Кайтена). */
  brandLabel?: string;
  /** Сноска источника/даты (grouped-режим). */
  footnote?: string;
  /** Grouped-режим — рендерит эталонный ComparisonTableMock. */
  sections?: ComparisonSection[];
  /** Плоский режим (fallback). */
  columns?: ComparisonColumnProps[];
  rows?: ComparisonRowProps[];
}

/**
 * Параллельная таблица сравнения «у них / у нас» для vs-страниц и
 * migration-from-competitor layout. Заменяет generic FeatureGrid для случаев,
 * когда нужна явная side-by-side компарация.
 */
export function ComparisonTable({
  eyebrow,
  title,
  description,
  competitor,
  brandLabel,
  footnote,
  sections,
  columns,
  rows,
}: ComparisonTableProps) {
  // Grouped-режим. Два мока по типу ячеек:
  //   • строковые a/b → ComparisonCopyMock (описательный текст, без раскрывашек);
  //   • булевые a/b → эталонный ComparisonTableMock (✓/−, раскрывающиеся разделы).
  // Разведены отдельными файлами, чтобы галочковый мок (90% случаев) оставался нетронутым.
  if (sections && sections.length > 0) {
    const isCopy = sections.some((s) =>
      s.rows.some((r) => typeof r.a === 'string' || typeof r.b === 'string'),
    );
    return (
      <section
        className={cn(
          'mx-auto w-full max-w-(--container-kaiten)',
          'px-4 py-16 md:px-6 xl:px-0 lg:py-20',
        )}
      >
        {eyebrow && (
          <p
            data-comp="comparison_table.eyebrow"
            className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        {isCopy ? (
          <ComparisonCopyMock
            title={title}
            brandLabel={brandLabel}
            competitor={competitor ?? ''}
            sections={sections}
            footnote={footnote ?? ''}
          />
        ) : (
          <ComparisonTableMock
            title={title}
            competitor={competitor ?? ''}
            // isCopy=false гарантирует булевые ячейки — сужаем тип для эталонного мока.
            sections={sections as KctSection[]}
            footnote={footnote ?? ''}
          />
        )}
      </section>
    );
  }

  if (!columns || !rows) return null;

  return (
    <section
      className={cn(
        'mx-auto w-full max-w-(--container-kaiten)',
        'px-4 py-16 md:px-6 xl:px-0 lg:py-20',
      )}
    >
      <div className="mb-10 max-w-2xl">
        {eyebrow && (
          <p
            data-comp="comparison_table.eyebrow"
            className="mb-3 text-sm font-medium uppercase tracking-wide text-(--color-text-accent)"
          >
            {eyebrow}
          </p>
        )}
        <h2
          data-comp="comparison_table.title"
          className="text-3xl font-semibold leading-tight md:text-4xl"
        >
          {title}
        </h2>
        {description && (
          <p
            data-comp="comparison_table.description"
            className="mt-4 text-lg text-(--color-text-primary)"
          >
            {description}
          </p>
        )}
      </div>

      <div
        className={cn(
          'overflow-x-auto rounded-(--radius-2xl) border border-(--color-border-default)',
          'bg-(--color-surface-card)',
        )}
      >
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-(--color-border-default) bg-(--color-surface-section)">
              <th className="px-5 py-4 text-xs font-medium uppercase tracking-wide text-(--color-text-secondary)">
                Возможность
              </th>
              {columns.map((c, i) => (
                <th
                  key={i}
                  data-comp={`comparison_table.columns[${i}]`}
                  className={cn(
                    'px-5 py-4 text-sm font-semibold',
                    c.highlighted
                      ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)'
                      : 'text-(--color-text-primary)',
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span data-comp={`comparison_table.columns[${i}].name`}>{c.name}</span>
                    {c.badge && (
                      <span
                        data-comp={`comparison_table.columns[${i}].badge`}
                        className="rounded-full bg-(--color-action-primary)/15 px-2 py-0.5 text-[10px] font-medium text-(--color-text-accent)"
                      >
                        {c.badge}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                data-comp={`comparison_table.rows[${ri}]`}
                className={cn(
                  ri !== rows.length - 1 && 'border-b border-(--color-border-default)',
                )}
              >
                <td
                  data-comp={`comparison_table.rows[${ri}].label`}
                  className="px-5 py-4 font-medium text-(--color-text-primary)"
                >
                  {row.label}
                </td>
                {row.values.map((v, ci) => (
                  <td
                    key={ci}
                    data-comp={`comparison_table.rows[${ri}].values[${ci}]`}
                    className={cn(
                      'px-5 py-4 text-sm',
                      columns[ci]?.highlighted &&
                        'bg-(--color-action-primary-soft)/40 text-(--color-text-primary)',
                    )}
                  >
                    {typeof v === 'boolean' ? (
                      v ? (
                        <span
                          aria-label="есть"
                          className="inline-flex items-center text-(--color-action-primary)"
                        >
                          <Icon name="Check" className="h-5 w-5" />
                        </span>
                      ) : (
                        <span
                          aria-label="нет"
                          className="inline-flex items-center text-(--color-text-secondary)"
                        >
                          <Icon name="Minus" className="h-5 w-5" />
                        </span>
                      )
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
