import { cn } from '../../primitives/cn';
import { TerminalChrome, Prompt, Flag, CheckGlyph } from './CliTerminalHeroMock';

/**
 * Локальные снимки и метрики Kaiten CLI: команда snapshot build один раз читает
 * пространство, а query metrics считает поток задач по снимку без обращений к
 * API. Терминал сверху, таблица результата по доскам снизу. Одна ось цвета —
 * «локально / без сети» (зелёный). Домен: cli-community-edition.
 */
export function CliSnapshotMetricsMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative mx-auto w-full max-w-[720px] overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.28)]',
      )}
    >
      <TerminalChrome title="kaiten — аналитика" />

      <div className="space-y-2 bg-(--color-neutral-950) px-5 py-4 font-mono text-[11.5px] leading-relaxed md:text-[12px]">
        {/* сбор снимка */}
        <div className="flex flex-wrap items-baseline gap-x-2">
          <Prompt />
          <Flag>--json</Flag>
          <span className="text-(--color-neutral-000)">snapshot build</span>
          <Flag>--name</Flag>
          <span className="text-(--color-blue-100)">team-q1</span>
          <Flag>--preset</Flag>
          <span className="text-(--color-blue-100)">analytics</span>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-2 pl-3 text-(--color-neutral-500)">
          <Flag>--window-start</Flag>
          <span>2026-01-01</span>
          <Flag>--window-end</Flag>
          <span>2026-03-31</span>
        </div>
        <div className="flex items-center gap-2 text-(--color-neutral-400)">
          <CheckGlyph />
          <span>снимок team-q1 собран · <span className="text-(--color-green-100)">1</span> чтение из API</span>
        </div>

        {/* расчёт метрик */}
        <div className="flex flex-wrap items-baseline gap-x-2 pt-1.5">
          <Prompt />
          <Flag>--json</Flag>
          <span className="text-(--color-neutral-000)">query metrics</span>
          <Flag>--metric</Flag>
          <span className="text-(--color-blue-100)">throughput</span>
          <Flag>--group-by</Flag>
          <span className="text-(--color-blue-100)">board_id</span>
        </div>
      </div>

      {/* таблица результата */}
      <div className="border-t border-(--color-border-default) bg-(--color-surface-card) px-5 py-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
            Поток задач за квартал
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--color-green-12) px-2 py-0.5 text-[10px] font-semibold text-green-700">
            <OfflineGlyph />
            без обращений к API
          </span>
        </div>

        <table className="w-full border-collapse font-mono text-[11.5px]">
          <thead>
            <tr className="text-left text-(--color-text-secondary)">
              <th className="pb-1.5 font-medium">доска</th>
              <th className="pb-1.5 text-right font-medium">завершено</th>
            </tr>
          </thead>
          <tbody className="text-(--color-text-primary)">
            <MetricRow board="Разработка · спринты" value={128} />
            <MetricRow board="Поддержка · заявки" value={214} />
            <MetricRow board="Инфраструктура" value={57} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MetricRow({ board, value }: { board: string; value: number }) {
  return (
    <tr className="border-t border-(--color-border-default)">
      <td className="py-1.5">{board}</td>
      <td className="py-1.5 text-right font-semibold text-(--color-text-accent)">{value}</td>
    </tr>
  );
}

function OfflineGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-green-700">
      <path d="M4 4l16 16M8.8 8.9A9 9 0 003 12M12 20h.01M8.5 15.5a5 5 0 016.4-.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
