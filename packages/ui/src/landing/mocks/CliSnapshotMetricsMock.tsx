import { cn } from '../../primitives/cn';
import { DarkTerminal, ResultCard, TPrompt, TFlag, TNum, TOk } from './DarkTerminal';

/**
 * Локальные снимки и метрики Kaiten CLI: команда snapshot build один раз читает
 * пространство, а query metrics считает метрики по снимку без обращений к API.
 * Терминал сверху, результат снизу — вертикальные столбики «Загрузка команды по
 * неделям» (взято из RetailReportMiniMock). Пилл «без обращений к API» держит
 * тему локальности. Терминал — в едином стиле DarkTerminal.
 * Домен: cli-community-edition.
 */
export function CliSnapshotMetricsMock() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[600px] space-y-3">
      <DarkTerminal title="bash — кайтен@ваш-сервер">
        {/* сбор снимка */}
        <div className="ln">
          <TPrompt />
          <TFlag>--json</TFlag>
          <span>snapshot build</span>
          <TFlag>--name</TFlag>
          <TNum>team-q1</TNum>
          <TFlag>--preset</TFlag>
          <TNum>analytics</TNum>
        </div>
        <div className="ln ind">
          <TFlag>--window-start</TFlag>
          <span>2026-01-01</span>
          <TFlag>--window-end</TFlag>
          <span>2026-03-31</span>
        </div>
        <TOk>
          снимок team-q1 собран · <TNum>1</TNum> чтение из API
        </TOk>

        {/* расчёт метрик */}
        <div className="ln" style={{ marginTop: 10 }}>
          <TPrompt />
          <TFlag>--json</TFlag>
          <span>query metrics</span>
          <TFlag>--metric</TFlag>
          <TNum>workload</TNum>
          <TFlag>--group-by</TFlag>
          <TNum>week</TNum>
        </div>
      </DarkTerminal>

      {/* результат: загрузка команды по неделям — вертикальные столбики (из RetailReportMiniMock) */}
      <ResultCard>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase text-(--color-text-secondary)">
            Загрузка команды по неделям
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--color-green-12) px-2 py-0.5 text-[10px] font-semibold text-green-700">
            <OfflineGlyph />
            без обращений к API
          </span>
        </div>

        <div className="flex h-28 items-end gap-2">
          {WEEKS.map((h, i) => (
            <div
              key={i}
              className={cn(
                'flex-1 rounded-t',
                h === WEEKS_MAX ? 'bg-(--color-action-primary)' : 'bg-(--color-action-primary)/70',
              )}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
        <div className="mt-2 flex gap-2">
          {WEEKS.map((_, i) => (
            <span key={i} className="flex-1 text-center text-[10px] text-(--color-text-secondary)">
              Н{i + 1}
            </span>
          ))}
        </div>
      </ResultCard>
    </div>
  );
}

const WEEKS = [42, 60, 35, 78, 52, 88, 64, 70];
const WEEKS_MAX = Math.max(...WEEKS);

function OfflineGlyph() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className="text-green-700">
      <path d="M4 4l16 16M8.8 8.9A9 9 0 003 12M12 20h.01M8.5 15.5a5 5 0 016.4-.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
