import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

type Status = 'done' | 'in-progress' | 'todo';

interface Task {
  text: string;
  owner: string;
  ownerTone: 'violet' | 'blue' | 'orange';
  status: Status;
}

interface Day {
  num: number;
  date: string;
  title: string;
  active?: boolean;
  tasks: Task[];
}

const DAYS: Day[] = [
  { num: 1, date: 'пн · 12 мая', title: 'Первый день', tasks: [
    { text: 'Получить ноутбук, доступы, корп-почту', owner: 'IT', ownerTone: 'blue', status: 'done' },
    { text: 'Подписать NDA и трудовой договор', owner: 'HR', ownerTone: 'violet', status: 'done' },
    { text: 'Знакомство с командой · stand-up', owner: 'Тимлид', ownerTone: 'orange', status: 'done' },
  ]},
  { num: 2, date: 'вт · 13 мая', title: 'Среда и инструменты', tasks: [
    { text: 'Развернуть проект локально, прогнать тесты', owner: 'Тимлид', ownerTone: 'orange', status: 'done' },
    { text: 'Прочитать onboarding-доку и кодстайл', owner: 'HR', ownerTone: 'violet', status: 'done' },
    { text: 'Security training · 1 час', owner: 'IT', ownerTone: 'blue', status: 'done' },
  ]},
  { num: 3, date: 'ср · 14 мая', title: 'Сегодня · первая задача', active: true, tasks: [
    { text: 'Парная сессия с ментором · 1 час', owner: 'Ментор', ownerTone: 'orange', status: 'done' },
    { text: 'Закрыть первую small-задачу из бэклога', owner: 'Тимлид', ownerTone: 'orange', status: 'in-progress' },
    { text: 'Запросить ревью у двух коллег', owner: 'Сама', ownerTone: 'violet', status: 'todo' },
  ]},
  { num: 4, date: 'чт · 15 мая', title: 'Команда и процессы', tasks: [
    { text: '1-on-1 с тимлидом · ожидания на испытательный', owner: 'Тимлид', ownerTone: 'orange', status: 'todo' },
    { text: 'Знакомство со смежной командой Frontend', owner: 'HR', ownerTone: 'violet', status: 'todo' },
    { text: 'Ревью своего PR от коллеги', owner: 'Сама', ownerTone: 'violet', status: 'todo' },
  ]},
  { num: 5, date: 'пт · 16 мая', title: 'Ретро первой недели', tasks: [
    { text: 'Запушить и смерджить первую задачу', owner: 'Сама', ownerTone: 'violet', status: 'todo' },
    { text: 'Заполнить чек-лист обратной связи HR', owner: 'HR', ownerTone: 'violet', status: 'todo' },
    { text: 'Ретро-встреча с ментором', owner: 'Ментор', ownerTone: 'orange', status: 'todo' },
  ]},
];

const OWNER_CLASS: Record<Task['ownerTone'], string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

/**
 * Mock чек-листа онбординга HR-домена: 5 дней первой недели с задачами,
 * владельцами и статусами. День 3 — активный сегодня.
 */
export function OnboardingChecklistMock() {
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
          <span className="font-medium text-(--color-text-primary)">Онбординг · Анна Соколова · Backend developer</span>
          <span>Старт 12 мая</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">7 из 15 задач</span>
        </div>
      </div>
      <div className="p-4 md:p-5">
        <div className="mb-4 space-y-1.5">
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
            <span>Прогресс первой недели</span>
            <span className="font-semibold text-(--color-text-accent)">47%</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-(--color-neutral-200)">
            <div className="h-full w-[47%] rounded-full bg-(--color-action-primary)" />
          </div>
        </div>
        <div className="grid gap-2.5 md:grid-cols-5">
          {DAYS.map((d) => (
            <div key={d.num} className={cn('rounded-(--radius-xl) border p-2.5', d.active ? 'border-(--color-action-primary)/40 bg-(--color-action-primary-soft)/30 shadow-sm' : 'border-(--color-border-default) bg-(--color-surface-page)')}>
              <div className="mb-2 flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">День {d.num}</div>
                  <div className={cn('text-[11.5px] font-semibold leading-tight', d.active ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)')}>{d.title}</div>
                </div>
                <span className="text-[9px] text-(--color-text-secondary)">{d.date}</span>
              </div>
              <div className="space-y-1.5">
                {d.tasks.map((t, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className={cn('mt-px inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-md border text-[10px]', t.status === 'done' ? 'border-(--color-action-primary) bg-(--color-action-primary) text-white' : t.status === 'in-progress' ? 'border-(--color-action-primary) bg-white text-(--color-action-primary)' : 'border-(--color-border-default) bg-white')}>
                      {t.status === 'done' && '✓'}
                      {t.status === 'in-progress' && <Icon name="Loader" className="h-2.5 w-2.5" strokeWidth={2.5} />}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className={cn('text-[10.5px] leading-tight', t.status === 'done' ? 'text-(--color-text-secondary) line-through' : t.status === 'in-progress' ? 'font-medium text-(--color-text-primary)' : 'text-(--color-text-primary)')}>{t.text}</div>
                      <span className={cn('mt-1 inline-flex h-3.5 items-center rounded-full px-1 text-[9px] font-medium leading-none', OWNER_CLASS[t.ownerTone])}>{t.owner}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
