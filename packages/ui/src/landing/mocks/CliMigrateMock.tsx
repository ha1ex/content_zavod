import { Icon } from '../../primitives/Icon';
import { DarkTerminal, ResultCard, TPrompt, TFlag, TStr, TNum, TOk, TMut } from './DarkTerminal';

/**
 * Сценарий «Переезд в Kaiten» лендинга Kaiten CLI: перенос досок, карточек,
 * участников и связей из другого трекера (Trello / Jira / CSV) в Kaiten одной
 * прогонкой команд import. Терминал в общем стиле DarkTerminal, снизу —
 * карта-сводка миграции (источники → Kaiten, счётчики перенесённых сущностей).
 * Домен: cli-community-edition.
 */
export function CliMigrateMock() {
  return (
    <div aria-hidden className="mx-auto w-full max-w-[600px] space-y-3">
      <DarkTerminal title="bash — кайтен@ваш-сервер">
        <div className="ln">
          <TPrompt />
          <span>import boards</span>
          <TFlag>--from</TFlag>
          <TStr>trello</TStr>
          <TFlag>--file</TFlag>
          <TStr>./export.json</TStr>
        </div>
        <TOk>
          3 доски · <TNum>128</TNum> карточек · <TNum>24</TNum> участника
        </TOk>
        <div className="ln">
          <TPrompt />
          <span>import cards</span>
          <TFlag>--from</TFlag>
          <TStr>csv</TStr>
          <TFlag>--board-id</TFlag>
          <TNum>42</TNum>
          <TFlag>--map</TFlag>
          <TStr>title,status,assignee</TStr>
        </div>
        <TOk>
          <TNum>342</TNum> карточки · <TMut>связи и метки сохранены</TMut>
        </TOk>
      </DarkTerminal>

      <ResultCard>
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[11px] font-semibold uppercase text-(--color-text-secondary)">
            Перенос в Kaiten
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--color-green-12) px-2 py-0.5 text-[10px] font-semibold text-green-700">
            <CheckDot />
            готово
          </span>
        </div>

        {/* источники → Kaiten */}
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-section) px-2 py-1 text-[11px] font-medium text-(--color-text-primary)">
            Trello
          </span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-section) px-2 py-1 text-[11px] font-medium text-(--color-text-primary)">
            CSV
          </span>
          <Icon name="ArrowRight" className="h-4 w-4 text-(--color-text-tertiary)" strokeWidth={2} />
          <span className="rounded-md bg-(--color-action-primary-soft) px-2 py-1 text-[11px] font-semibold text-(--color-text-accent)">
            Kaiten
          </span>
        </div>

        <div className="space-y-2">
          {ROWS.map((r) => (
            <MigRow key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      </ResultCard>
    </div>
  );
}

const ROWS: { label: string; value: string }[] = [
  { label: 'Доски и колонки', value: '3' },
  { label: 'Карточки и статусы', value: '470' },
  { label: 'Участники и метки', value: '24' },
  { label: 'Связи и блокировки', value: 'сохранены' },
];

function MigRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) px-3 py-2">
      <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-(--color-green-100) text-(--color-neutral-000)">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
          <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="min-w-0 flex-1 text-[12px] font-medium text-(--color-text-primary)">{label}</span>
      <span className="shrink-0 font-mono text-[12px] font-semibold text-(--color-text-primary) tabular-nums">
        {value}
      </span>
    </div>
  );
}

function CheckDot() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-green-700">
      <path d="M5 12l5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
