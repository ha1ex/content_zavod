import { cn } from '../../primitives/cn';

interface Lead {
  initials: string;
  name: string;
  role: string;
  reports: number;
  openings: number;
  highlight?: boolean;
}

interface Member {
  initials: string;
  name: string;
  role: string;
  vacancy?: boolean;
}

const LEADS: Lead[] = [
  { initials: 'НГ', name: 'Наталья Громова', role: 'Frontend Lead', reports: 8, openings: 1 },
  { initials: 'ДО', name: 'Дмитрий Орлов', role: 'Backend Lead', reports: 6, openings: 2, highlight: true },
  { initials: 'ЕР', name: 'Елена Рябова', role: 'QA Lead', reports: 5, openings: 0 },
];

const TEAM: Member[] = [
  { initials: 'РК', name: 'Роман Климов', role: 'Senior Go' },
  { initials: 'ВТ', name: 'Виктор Тарасов', role: 'Middle Go' },
  { initials: 'АН', name: 'Анна Никитина', role: 'Middle Python' },
  { initials: '?', name: 'Открытая вакансия', role: 'Senior Backend', vacancy: true },
];

/**
 * Mock фрагмента оргструктуры HR-домена: CTO → 3 Lead'а → команда Backend
 * с одной open vacancy.
 */
export function OrgChartMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Структура · Технологический блок</span>
          <span>19 человек</span>
          <span>3 открытые вакансии</span>
        </div>
      </div>
      <div className="space-y-5 p-5 md:p-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-(--radius-xl) border border-(--color-action-primary)/40 bg-(--color-action-primary-soft)/40 px-4 py-2.5 shadow-sm">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-(--color-action-primary) text-[12px] font-semibold text-white">ДО</span>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">CTO</div>
              <div className="text-[12.5px] font-semibold text-(--color-text-primary)">Дмитрий Орлов</div>
            </div>
            <div className="ml-2 border-l border-(--color-border-default) pl-3 text-[10px] text-(--color-text-secondary)">
              <div>19 в подчинении</div>
              <div className="font-semibold text-(--color-text-accent)">3 вакансии</div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2.5 md:gap-3">
          {LEADS.map((l) => (
            <div key={l.name} className={cn('relative rounded-(--radius-xl) border bg-(--color-surface-page) p-3', l.highlight ? 'border-(--color-action-primary)/40 shadow-sm' : 'border-(--color-border-default)')}>
              <div className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-(--color-border-default)" />
              <div className="flex items-center gap-2">
                <span className={cn('inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold', l.highlight ? 'bg-(--color-action-primary) text-white' : 'bg-(--color-action-primary-soft) text-(--color-text-accent)')}>{l.initials}</span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11.5px] font-semibold text-(--color-text-primary)">{l.name}</div>
                  <div className="truncate text-[10px] text-(--color-text-secondary)">{l.role}</div>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex h-4 items-center rounded-full bg-(--color-neutral-200) px-1.5 text-[9px] font-medium text-(--color-text-primary)">{l.reports} в команде</span>
                {l.openings > 0 && <span className="inline-flex h-4 items-center rounded-full bg-(--color-orange-12) px-1.5 text-[9px] font-medium text-amber-800">{l.openings} {l.openings === 1 ? 'открыта' : 'открыто'}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-4 gap-2 md:gap-2.5">
          {TEAM.map((m) => (
            <div key={m.name} className={cn('rounded-(--radius-lg) border bg-(--color-surface-page) p-2.5', m.vacancy ? 'border-dashed border-(--color-orange-100)/50 bg-(--color-orange-12)/20' : 'border-(--color-border-default)')}>
              <div className="flex items-center gap-2">
                <span className={cn('inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold', m.vacancy ? 'bg-(--color-orange-12) text-amber-800' : 'bg-(--color-action-primary-soft) text-(--color-text-accent)')}>{m.initials}</span>
                <div className="min-w-0 flex-1">
                  <div className={cn('truncate text-[10.5px] font-semibold leading-tight', m.vacancy ? 'text-amber-800' : 'text-(--color-text-primary)')}>{m.name}</div>
                  <div className="truncate text-[9px] text-(--color-text-secondary)">{m.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
