/**
 * ModuleApiMock — справочник Kaiten API (developers.kaiten.ru): шапка с логотипом,
 * вкладки протоколов, слева поиск и список эндпоинтов с методами, справа вводная
 * страница с базовым URL, заголовком авторизации и лимитами запросов.
 *
 * Мок фиксированной ширины 1120px: колонка эндпоинтов и основной текст рассчитаны
 * на эту сетку, в узких слотах масштабируется снаружи.
 */
import { cn } from '../../primitives/cn';
import { KaitenLogo } from '../KaitenLogo';

type Method = 'POST' | 'GET' | 'PATCH' | 'DELETE';

/** Цвет метода как в справочнике: чтение — сиреневый и синий, изменение — оранжевый, удаление — красный. */
const METHOD: Record<Method, string> = {
  POST: 'border-[#2f6fb0] text-[#2f6fb0]',
  GET: 'border-[#7d4ccf] text-[#7d4ccf]',
  PATCH: 'border-[#c07a1b] text-[#c07a1b]',
  DELETE: 'border-[#c0392b] text-[#c0392b]',
};

type Row = { group: string } | { name: string; method: Method } | { name: string; active: true };

const NAV: Row[] = [
  { group: 'Overview' },
  { name: 'Introduction', active: true },
  { group: 'Spaces' },
  { name: 'Create new space', method: 'POST' },
  { name: 'Retrieve list of spaces', method: 'GET' },
  { name: 'Retrieve space', method: 'GET' },
  { name: 'Update space', method: 'PATCH' },
  { name: 'Remove space', method: 'DELETE' },
  { group: 'Space Boards' },
  { name: 'Create new board', method: 'POST' },
  { name: 'Get list of boards', method: 'GET' },
  { name: 'Get board', method: 'GET' },
  { name: 'Update board', method: 'PATCH' },
  { name: 'Remove board', method: 'DELETE' },
];

const TABS = ['REST', 'EXTERNAL WEBHOOKS', 'WEBHOOKS', 'SCIM'];

function Code({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-[4px] bg-(--color-surface-section) px-1.5 py-0.5 font-mono text-[12px] text-(--color-text-secondary)">
      {children}
    </span>
  );
}

export interface ModuleApiMockProps {
  className?: string;
}

export function ModuleApiMock({ className }: ModuleApiMockProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'w-[1120px] overflow-hidden rounded-(--radius-2xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        "font-['Roboto',system-ui,sans-serif] text-(--color-text-primary)",
        className,
      )}
    >
      {/* шапка */}
      <div className="flex items-center gap-2 border-b border-(--color-border-default) px-6 py-3.5">
        <KaitenLogo markOnly tone="dark" className="h-6 w-6" />
        <span className="text-[19px] font-semibold">Kaiten</span>
        <span className="text-[14px] text-(--color-text-secondary)">Developers</span>
      </div>

      {/* вкладки протоколов */}
      <div className="flex items-center gap-7 border-b border-(--color-border-default) px-6">
        {TABS.map((t, i) => (
          <span
            key={t}
            className={cn(
              'py-3 text-[12px] tracking-[.06em]',
              i === 0
                ? 'border-b-2 border-(--color-action-primary) text-(--color-text-accent)'
                : 'text-(--color-text-secondary)',
            )}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex">
        {/* список эндпоинтов */}
        <div className="w-[280px] shrink-0 border-r border-(--color-border-default) px-4 py-4">
          <div className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) px-3 py-2 text-[13px] text-(--color-text-tertiary)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            Search
          </div>

          <div className="mt-4 flex flex-col">
            {NAV.map((r, i) =>
              'group' in r ? (
                <div key={i} className="px-2 pb-1.5 pt-3 text-[12px] text-(--color-text-tertiary)">
                  {r.group}
                </div>
              ) : (
                <div
                  key={i}
                  className={cn(
                    'flex items-center gap-2 rounded-(--radius-md) px-2 py-1.5 text-[13px]',
                    'active' in r ? 'bg-[#eef4fd]' : '',
                  )}
                >
                  <span className="flex-1 truncate">{r.name}</span>
                  {'method' in r && (
                    <span
                      className={cn(
                        'rounded-full border px-2 py-[1px] text-[10px] font-medium',
                        METHOD[r.method],
                      )}
                    >
                      {r.method}
                    </span>
                  )}
                </div>
              ),
            )}
          </div>
        </div>

        {/* вводная страница */}
        <div className="min-w-0 flex-1 px-8 py-5 text-[13px] leading-[1.75]">
          <h3 className="text-[30px] font-normal leading-tight">Kaiten API</h3>

          <p className="mt-4">JSON API version: 1</p>
          <p>
            Base URL: <Code>https://&lt;your_domain&gt;.kaiten.ru/api/v1</Code>
          </p>
          <p>
            Latest API version is always available at{' '}
            <Code>https://&lt;your_domain&gt;.kaiten.ru/api/latest</Code>
          </p>
          <p>All requests must contain bearer auth header.</p>

          <div className="mt-2 rounded-(--radius-md) bg-(--color-surface-section) px-4 py-2.5 font-mono text-[12.5px] text-(--color-text-secondary)">
            Authorization: Bearer &lt;api_key&gt;
          </div>

          <p className="mt-3">Example:</p>
          <div className="mt-2 rounded-(--radius-md) bg-(--color-surface-section) px-4 py-2.5 font-mono text-[12.5px] text-(--color-text-secondary)">
            Authorization: Bearer 296a5709-99bc-49a7-96e0-c0a1b236091f
          </div>

          <p className="mt-3">You can get the API key in the user profile.</p>
          <p>API consumes and produces application/json.</p>

          <h4 className="mt-6 text-[22px] font-normal leading-tight">API Rate Limits</h4>
          <p className="mt-3">
            To keep the load on our servers, API rate limits apply. In order to properly configure your API
            client consider the following response headers:
          </p>
          <ul className="mt-2 list-disc pl-6">
            <li>
              <Code>X-RateLimit-Remaining</Code> — remaining number of requests until limit will be reached.
            </li>
            <li>
              <Code>X-RateLimit-Reset</Code> — UTC epoch when the limit will be reset
            </li>
          </ul>
          <p className="mt-2 font-semibold">Current limit: 5 request per second.</p>
          <p>If the limit is reached, Kaiten will return 429 HTTP code.</p>
        </div>
      </div>
    </div>
  );
}
