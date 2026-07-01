import { Fragment } from 'react';
import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

type Tone = 'teal' | 'violet' | 'green' | 'orange' | 'yellow' | 'pink' | 'blue';
const TONE: Record<Tone, [string, string]> = {
  teal: ['#d9f0ec', '#0e7a66'], violet: ['#efe9f9', '#7d4ccf'], green: ['#e7f3df', '#4a8a2f'],
  orange: ['#fdecd9', '#b9700f'], yellow: ['#f7f0cf', '#8a6a00'], pink: ['#fbe3ec', '#c2185b'], blue: ['#e2eefb', '#2f6fb0'],
};
const AVPAL = ['#c98a8a', '#8a9bc9', '#8ac9a0', '#c9b78a', '#b88ac9', '#7d9ac9'];

type PCard = { title: string; tags?: [string, Tone][]; date?: string; checks?: [string, string, number][]; av: number; bar?: boolean };

function Tag({ v }: { v: [string, Tone] }) { const t = TONE[v[1]]; return <span className="inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-[12.5px] font-medium" style={{ background: t[0], color: t[1] }}>{v[0]}</span>; }
function DatePill({ children }: { children: React.ReactNode }) { return <span className="inline-flex items-center rounded-full bg-[#d9f0ec] px-2.5 py-0.5 text-[12.5px] font-medium text-[#0e7a66]">{children}</span>; }
function Avatars({ n }: { n: number }) { return <div className="flex -space-x-1.5">{Array.from({ length: n }).map((_, i) => <span key={i} className="inline-flex h-6 w-6 rounded-full border-2 border-white" style={{ background: AVPAL[i % AVPAL.length] }} />)}</div>; }
function Check({ c }: { c: [string, string, number] }) {
  return (
    <div className="relative overflow-hidden rounded">
      <div className="absolute inset-y-0 left-0 bg-[#dcebf7]" style={{ width: c[2] + '%' }} />
      <div className="relative flex items-center justify-between px-2 py-0.5 text-[12px] text-[#5b7a98]"><span className="truncate">{c[0]}</span><span className="ml-2 shrink-0">{c[1]}</span></div>
    </div>
  );
}

function PortfolioCard({ d }: { d: PCard }) {
  return (
    <div className="overflow-hidden rounded-(--radius-lg) border border-(--color-border-default) bg-white shadow-[0_1px_2px_rgba(45,45,45,0.05)]">
      <div className="space-y-2.5 p-3">
        <div className="text-[15px] font-medium text-(--color-text-primary)">{d.title}</div>
        {d.tags && <div className="flex flex-wrap gap-1.5">{d.tags.map((t, i) => <Tag key={i} v={t} />)}</div>}
        {d.date && <div><DatePill>{d.date}</DatePill></div>}
        {d.checks && <div className="space-y-1">{d.checks.map((c, i) => <Check key={i} c={c} />)}</div>}
        <Avatars n={d.av} />
      </div>
      {d.bar && <div className="h-1 w-1/4 bg-(--color-action-primary)" />}
    </div>
  );
}
const PF_COLS: [string, number, Tone][] = [['Оценка формы договора', 2, 'blue'], ['Согласование', 2, 'blue'], ['Заключение контракта', 1, 'yellow'], ['Ожидание аванса', 1, 'orange'], ['Производство/проектирование', 2, 'orange']];
const PF_CARDS: PCard[][] = [
  [{ title: 'Проект 5', tags: [['Котельная', 'teal'], ['ООО Альфа', 'violet']], date: '01.01.2024-26.10.2024', checks: [['Чек-лист Ожидает аванса', '0/1', 0]], av: 2, bar: true }],
  [{ title: 'Объект 2', tags: [['ООО Ромашка', 'green']], date: '10.07.2023-21.07.2023', checks: [['Чек-лист Проектирование', '3/3', 100], ['Чек-лист Закупки', '4/4', 100], ['Чек-лист Изготовления', '1/2', 50]], av: 2 }],
  [{ title: 'Проект 1', tags: [['ООО Василек', 'green']], date: '21.08.2023-31.08.2024', checks: [['Чек-лист Проектирование', '3/3', 100], ['Чек-лист Закупки', '1/2', 50], ['Чек-лист Изготовления', '3/3', 100], ['Чек-лист Этапа ПСИ', '1/2', 50]], av: 2 }],
  [{ title: 'Объект 4', tags: [['DM', 'violet'], ['Yes', 'green'], ['Ежедневно в 00:05', 'orange']], date: '21.08.2024-31.08.2024', av: 2 }],
  [{ title: 'Объект 7', tags: [['Фундамент', 'orange']], av: 1 }, { title: 'Проект 9', tags: [['Монтаж', 'blue']], av: 2 }],
];
const LEFT_BARS: [string, string][] = [['Проект 1', '4 карточки'], ['Проект 2', '4 карточки'], ['Проект 3', '4 карточки']];
const RIGHT_BARS: [string, string][] = [['Проект 1 - Задачи', '6 карточек'], ['Проект 2 - Задачи', '8 карточек'], ['Проект 3 - Задачи', '4 карточки']];

function CountBadge({ n, tone }: { n: number | string; tone?: Tone }) { const t = tone ? TONE[tone] : ['#ededf0', '#6b6b70']; return <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-[12px] font-semibold" style={{ background: t[0], color: t[1] }}>{n}</span>; }
function CollapsedBar({ title, count }: { title: string; count: string }) {
  return (
    <div className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section) px-4 py-3">
      <Icon name="GripVertical" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
      <span className="text-[15px] font-semibold text-(--color-text-primary)">{title}</span>
      <span className="ml-auto inline-flex items-center rounded-md bg-[#e2eefb] px-2 py-0.5 text-[12.5px] font-medium text-[#2f6fb0]">{count}</span>
      <Icon name="ChevronDown" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
    </div>
  );
}
function TBtn({ icon, label, active }: { icon: string; label?: string; active?: boolean }) {
  return <span className={cn('inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5', active ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)' : 'text-(--color-text-secondary)')}><Icon name={icon} className="h-5 w-5" strokeWidth={2} />{label && <span className="text-[14px] font-semibold">{label}</span>}</span>;
}

/**
 * Mock сложного дашборда Kaiten «Портфель проектов»: доска-портфель с воронкой
 * (Оценка → Согласование → Контракт → Аванс → Производство) и свимлейном
 * «Первый приоритет» (карточки с тегами, датами, чек-листами, аватарами),
 * свёрнутые доски проектов/задач и доски «Письма»/«Документы» с колонками.
 */
export function ModulePortfolioMock() {
  return (
    <div aria-hidden className="w-[1360px] overflow-hidden rounded-2xl border border-(--color-border-default) bg-(--color-surface-section) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]">
      {/* toolbar */}
      <div className="flex items-center gap-1 border-b border-(--color-border-default) bg-white px-3 py-2">
        <Icon name="Menu" className="mr-1 h-5 w-5 text-(--color-text-secondary)" strokeWidth={2} />
        <span className="mr-2 text-[15px] font-medium text-(--color-text-primary)">Проекты</span>
        <TBtn icon="LayoutGrid" label="ДОСКИ" active /><TBtn icon="List" /><TBtn icon="Table2" /><TBtn icon="AlignLeft" /><TBtn icon="Calendar" /><TBtn icon="ChartLine" /><TBtn icon="SquareChevronDown" />
        <span className="ml-2 inline-flex items-center rounded-lg border border-(--color-action-primary) px-3 py-1.5 text-[13px] font-semibold text-(--color-text-accent)">ДОБАВИТЬ</span>
        <span className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--color-border-default) text-[14px] font-semibold text-(--color-text-secondary)">=</span>
        <span className="ml-1 inline-flex h-8 w-9 items-center justify-center rounded-lg border border-(--color-border-default) text-(--color-text-secondary)"><Icon name="ListFilter" className="h-4 w-4" strokeWidth={2} /></span>
      </div>

      <div className="space-y-4 p-4">
        {/* Портфель проектов */}
        <div className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section)">
          <div className="flex items-center gap-2 px-4 py-3"><Icon name="GripVertical" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} /><span className="text-[16px] font-semibold text-(--color-text-primary)">Портфель проектов</span></div>
          <div className="flex border-b border-(--color-border-default) px-3 pb-2">
            {PF_COLS.map((c, i) => (
              <div key={c[0]} className={cn('flex w-[220px] shrink-0 items-center gap-2 px-3', i > 0 && 'border-l border-(--color-border-default)')}><span className="text-[14px] font-medium text-(--color-text-primary)">{c[0]}</span><span className="ml-auto"><CountBadge n={c[1]} tone={c[2]} /></span></div>
            ))}
          </div>
          <div className="border-b border-(--color-border-default) px-4 py-2"><span className="text-[14px] font-semibold text-(--color-text-primary)">Первый приоритет</span></div>
          <div className="flex p-3">
            {PF_CARDS.map((col, i) => (
              <div key={i} className={cn('w-[220px] shrink-0 px-3', i > 0 && 'border-l border-(--color-border-default)')}>
                <div className="space-y-3">{col.map((card, j) => <PortfolioCard key={j} d={card} />)}</div>
              </div>
            ))}
          </div>
        </div>

        {/* collapsed board bars */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          {LEFT_BARS.map((b, i) => (
            <Fragment key={i}>
              <CollapsedBar title={b[0]} count={b[1]} />
              <CollapsedBar title={RIGHT_BARS[i]![0]} count={RIGHT_BARS[i]![1]} />
            </Fragment>
          ))}
        </div>

        {/* Письма + Документы — свёрнуты, как доски проектов */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-3">
          <CollapsedBar title="Письма" count="6 карточек" />
          <CollapsedBar title="Документы" count="5 карточек" />
        </div>
      </div>
    </div>
  );
}
