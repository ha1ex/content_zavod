import { cn } from '../../primitives/cn';
import { Prompt, Flag } from './CliTerminalHeroMock';

/**
 * Скрипты и ИИ-агенты Kaiten CLI: массовое чтение batch-get берёт список
 * карточек за один заход, а строка stats показывает, сколько обращений к API
 * ушло на задачу. Внизу — сравнение «по одной карточке» и «batch-get».
 * Одна ось цвета — экономия обращений (зелёный = меньше запросов).
 * Домен: cli-community-edition.
 */
export function CliBatchStatsMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[720px] overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.28)]',
      )}
    >
      <div className="space-y-2 bg-(--color-neutral-950) px-5 py-4 font-mono text-[11.5px] leading-relaxed md:text-[12px]">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Prompt />
          <Flag>--json</Flag>
          <span className="text-(--color-neutral-000)">card-location-history batch-get</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 pl-3">
          <Flag>--card-ids</Flag>
          <span className="text-(--color-green-100)">'[101, 102, 103]'</span>
        </div>

        {/* stats-блок */}
        <div className="mt-1 rounded-lg border border-(--color-neutral-800) bg-(--color-neutral-900) px-3 py-2 text-(--color-neutral-400)">
          <div>
            <span className="text-(--color-violet-100)">"stats"</span>: {'{'}
          </div>
          <div className="pl-3">
            <span className="text-(--color-violet-100)">"cards"</span>: <span className="text-(--color-blue-100)">3</span>,{' '}
            <span className="text-(--color-violet-100)">"http_request_count"</span>:{' '}
            <span className="text-(--color-green-100)">1</span>
          </div>
          <div>{'}'}</div>
        </div>
      </div>

      {/* сравнение стратегий чтения */}
      <div className="grid gap-2 border-t border-(--color-border-default) bg-(--color-surface-card) px-5 py-4 sm:grid-cols-2">
        <CompareCard
          label="По одной карточке"
          requests="3 обращения к API"
          strong={false}
        />
        <CompareCard
          label="batch-get"
          requests="1 обращение к API"
          strong
        />
      </div>
    </div>
  );
}

function CompareCard({
  label,
  requests,
  strong,
}: {
  label: string;
  requests: string;
  strong: boolean;
}) {
  return (
    <div
      className={cn(
        'rounded-(--radius-xl) border px-3.5 py-3',
        strong
          ? 'border-(--color-green-100) bg-(--color-green-12)'
          : 'border-(--color-border-default) bg-(--color-surface-section)',
      )}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] font-medium text-(--color-text-primary)">{label}</span>
        {strong ? (
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-(--color-green-100) text-(--color-neutral-000)">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
              <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        ) : null}
      </div>
      <div
        className={cn(
          'mt-1 text-sm font-semibold',
          strong ? 'text-green-700' : 'text-(--color-text-secondary)',
        )}
      >
        {requests}
      </div>
    </div>
  );
}
