import { cn } from '../../primitives/cn';

/**
 * ApiDocsMock — портал разработчиков Kaiten (developers.kaiten.ru), страница
 * Introduction: шапка «Kaiten Developers», вкладки REST / External webhooks /
 * Webhooks / SCIM, слева поиск и дерево методов с метками POST / GET / PATCH /
 * DELETE, справа «Kaiten API» — версия, базовый адрес и заголовок авторизации.
 *
 * Повторяет скриншот документации, но свёрстан под колонку лендинга: длинные
 * адреса и ключ переносятся внутри своих плашек, ничего не уходит за край.
 * Дизайн-ширина 640px, в узких слотах масштабируется ScaleToFit.
 */

type Method = 'POST' | 'GET' | 'PATCH' | 'DELETE';

const METHOD: Record<Method, string> = {
  POST: 'border-[#1565c0] text-[#1565c0]',
  GET: 'border-[#7d4ccf] text-[#7d4ccf]',
  PATCH: 'border-[#c77700] text-[#c77700]',
  DELETE: 'border-[#d32f2f] text-[#d32f2f]',
};

const NAV: { group: string; items: [string, Method][] }[] = [
  {
    group: 'Spaces',
    items: [
      ['Create new space', 'POST'],
      ['Retrieve list of spaces', 'GET'],
      ['Retrieve space', 'GET'],
      ['Update space', 'PATCH'],
      ['Remove space', 'DELETE'],
    ],
  },
  {
    group: 'Space Boards',
    items: [
      ['Create new board', 'POST'],
      ['Get list of boards', 'GET'],
    ],
  },
];

function Code({ children, block }: { children: React.ReactNode; block?: boolean }) {
  return (
    <span
      className={cn(
        'rounded-[4px] bg-[#f4f4f4] font-mono text-[#555]',
        // Строковые адреса не рвём посередине; длинный ключ в плашке переносится.
        block ? 'block break-all px-3 py-2.5 text-[10.5px] leading-[16px]' : 'whitespace-nowrap px-1 py-[1px] text-[10px]',
      )}
    >
      {children}
    </span>
  );
}

export function ApiDocsMock() {
  return (
    <div
      aria-hidden
      className="w-[640px] overflow-hidden rounded-[16px] border border-[#e0e0e0] bg-white font-[Roboto,system-ui,sans-serif] text-[#2d2d2d] shadow-[0_8px_24px_-12px_rgba(45,45,45,0.25)]"
    >
      {/* Шапка портала */}
      <div className="flex items-center gap-2 border-b border-[#e0e0e0] px-4 py-3">
        {/* Фирменный знак Кайтена — пути из apps/web/public/brand/kaiten-logo-dark.svg */}
        <svg width="20" height="20" viewBox="0 0 80 80" fill="none" aria-hidden>
          <path
            d="M59.0856 0H20.9144C9.36367 0 0 9.35857 0 20.903V59.097C0 70.6414 9.36367 80 20.9144 80H59.0856C70.6363 80 80 70.6414 80 59.097V20.903C80 9.35857 70.6363 0 59.0856 0Z"
            fill="#F11F24"
          />
          <path
            d="M31.8576 8.72032L8.72032 31.8576C4.27271 36.3052 4.27271 43.5162 8.72032 47.9638L31.8576 71.101C36.3052 75.5486 43.5162 75.5486 47.9638 71.101L71.101 47.9638C75.5486 43.5162 75.5486 36.3052 71.101 31.8576L47.9638 8.72032C43.5162 4.27271 36.3052 4.27271 31.8576 8.72032Z"
            fill="#78FFC7"
          />
          <path
            d="M39.7808 59.559C50.7054 59.559 59.5615 50.7034 59.5615 39.7795C59.5615 28.8556 50.7054 20 39.7808 20C28.8562 20 20 28.8556 20 39.7795C20 50.7034 28.8562 59.559 39.7808 59.559Z"
            fill="#7D4CCF"
          />
        </svg>
        <span className="text-[15px] font-semibold">Kaiten</span>
        <span className="text-[13px] text-[#757575]">Developers</span>
      </div>

      {/* Вкладки */}
      <div className="flex gap-5 border-b border-[#e0e0e0] px-4 text-[10.5px] tracking-[0.06em] text-[#616161]">
        <span className="border-b-2 border-[#7d4ccf] py-2.5 font-medium text-[#7d4ccf]">REST</span>
        <span className="py-2.5">EXTERNAL WEBHOOKS</span>
        <span className="py-2.5">WEBHOOKS</span>
        <span className="py-2.5">SCIM</span>
      </div>

      <div className="grid grid-cols-[200px_1fr]">
        {/* Дерево методов */}
        <div className="border-r border-[#e0e0e0] px-3 pb-3 pt-3">
          <div className="mb-3 flex h-[28px] items-center gap-2 rounded-[6px] border border-[#dcdcdc] px-2.5 text-[11px] text-[#424242]">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
            Search
          </div>
          <div className="px-1.5 pb-1.5 text-[10px] text-[#616161]">Overview</div>
          <div className="mb-2 rounded-[6px] bg-[#edf3fd] px-1.5 py-1.5 text-[11px]">Introduction</div>
          {NAV.map((g) => (
            <div key={g.group} className="mb-1">
              <div className="px-1.5 py-1.5 text-[10px] text-[#616161]">{g.group}</div>
              {g.items.map(([label, m]) => (
                <div key={label} className="flex items-center justify-between px-1.5 py-[5px] text-[11px]">
                  {label}
                  <span className={cn('rounded-full border px-1.5 py-[1px] text-[8px] font-medium leading-[11px]', METHOD[m])}>
                    {m}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Статья */}
        <div className="px-5 pb-5 pt-4 text-[11px] leading-[18px]">
          <div className="mb-2.5 text-[24px] font-normal leading-[30px]">Kaiten API</div>
          <p>JSON API version: 1</p>
          <p>
            Base URL: <Code>https://&lt;your_domain&gt;.kaiten.ru/api/v1</Code>
          </p>
          <p>
            Latest API version is always available at
            <br />
            <Code>https://&lt;your_domain&gt;.kaiten.ru/api/latest</Code>
          </p>
          <p className="mb-2.5">All requests must contain bearer auth header.</p>
          <Code block>Authorization: Bearer &lt;api_key&gt;</Code>
          <p className="mb-1.5 mt-2.5">Example:</p>
          <Code block>Authorization: Bearer 296a5709-99bc-49a7-96e0-c0a1b236091f</Code>
          <p className="mt-2.5">You can get the API key in the user profile.</p>
          <p>API consumes and produces application/json.</p>
          <div className="mt-3 text-[17px] leading-[24px]">API Rate Limits</div>
          <p className="mt-1 text-[#424242]">
            To keep the load on our servers, API rate limits apply. Consider the response headers:
          </p>
          <p className="mt-1">
            <Code>X-RateLimit-Remaining</Code> <Code>X-RateLimit-Reset</Code>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApiDocsMock;
