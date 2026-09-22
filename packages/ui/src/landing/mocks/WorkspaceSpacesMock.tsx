import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

export type WorkspaceSpacesVariant = 'spaces' | 'access';

interface Space {
  name: string;
  boards: string[];
  access: string;
  icon: string;
  open?: boolean;
}

const SPACES: Space[] = [
  { name: 'Маркетинг', icon: 'Megaphone', access: 'Команда · 12', open: true, boards: ['Контент-план', 'Реклама', 'События'] },
  { name: 'Разработка', icon: 'Code', access: 'Команда · 24', boards: ['Текущий спринт', 'Бэклог', 'Релизы'] },
  { name: 'Поддержка', icon: 'Headphones', access: 'Команда · 8', boards: ['Обращения', 'База знаний'] },
  { name: 'Руководство', icon: 'ChartLine', access: 'Только руководители', boards: ['Портфель проектов', 'Отчеты'] },
];

const MEMBERS: { who: string; name: string; role: string; tone: 'violet' | 'gray' }[] = [
  { who: 'АМ', name: 'Анна Морозова', role: 'Администратор', tone: 'violet' },
  { who: 'ЕГ', name: 'Егор Гусев', role: 'Участник', tone: 'violet' },
  { who: 'АК', name: 'Алина Кравцова', role: 'Участник', tone: 'violet' },
  { who: 'ПС', name: 'Павел Соколов', role: 'Только чтение', tone: 'gray' },
];

function SpacesTree() {
  return (
    <div className="grid grid-cols-[236px_1fr]">
      <div className="border-r border-(--color-border-default) bg-(--color-surface-section) p-3">
        <div className="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
          <Icon name="LayoutList" className="h-3.5 w-3.5" strokeWidth={2} />
          Пространства
        </div>
        <div className="flex flex-col gap-0.5">
          {SPACES.map((s) => (
            <div key={s.name}>
              <div
                className={cn(
                  'flex items-center gap-2 rounded-(--radius-md) px-2 py-1.5 text-[12.5px]',
                  s.open ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)' : 'text-(--color-text-primary)',
                )}
              >
                <Icon name={s.open ? 'ChevronDown' : 'ChevronRight'} className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                <Icon name={s.icon} className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="truncate">{s.name}</span>
              </div>
              {s.open &&
                s.boards.map((b) => (
                  <div key={b} className="flex items-center gap-2 py-1 pl-9 text-[12px] text-(--color-text-secondary)">
                    <Icon name="Columns3" className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
                    <span className="truncate">{b}</span>
                  </div>
                ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center gap-1.5 px-2 text-[12px] font-medium text-(--color-text-accent)">
          <Icon name="Plus" className="h-3.5 w-3.5" strokeWidth={2.4} />
          Создать пространство
        </div>
      </div>

      <div className="p-4">
        <div className="text-[13px] font-semibold text-(--color-text-primary)">Пространства компании</div>
        <div className="mt-3 flex flex-col gap-2">
          {SPACES.map((s) => (
            <div key={s.name} className="flex items-center gap-3 rounded-(--radius-lg) border border-(--color-border-default) px-3 py-2.5">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-lg) bg-(--color-action-primary-soft) text-(--color-text-accent)">
                <Icon name={s.icon} className="h-4 w-4" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <div className="text-[12.5px] font-medium text-(--color-text-primary)">{s.name}</div>
                <div className="truncate text-[11px] text-(--color-text-secondary)">{s.boards.join(' · ')}</div>
              </div>
              <span
                className={cn(
                  'ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[10.5px] font-medium',
                  s.access.startsWith('Только')
                    ? 'bg-(--color-orange-12) text-amber-800'
                    : 'bg-(--color-green-12) text-green-700',
                )}
              >
                {s.access}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AccessPanel() {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <span className="inline-flex h-8 w-8 items-center justify-center rounded-(--radius-lg) bg-(--color-action-primary-soft) text-(--color-text-accent)">
          <Icon name="Megaphone" className="h-4 w-4" strokeWidth={2} />
        </span>
        <div>
          <div className="text-[13px] font-semibold text-(--color-text-primary)">Доступ к пространству «Маркетинг»</div>
          <div className="text-[11px] text-(--color-text-secondary)">Участники видят только доски этого пространства</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) px-3 py-2">
        <Icon name="UserPlus" className="h-4 w-4 shrink-0 text-(--color-text-secondary)" strokeWidth={2} />
        <span className="text-[12px] text-(--color-text-secondary)">Почта или имя коллеги</span>
        <span className="ml-auto shrink-0 rounded-(--radius-md) bg-(--color-action-primary) px-3 py-1 text-[11.5px] font-semibold uppercase text-white">
          Пригласить
        </span>
      </div>

      <div className="mt-3 overflow-hidden rounded-(--radius-lg) border border-(--color-border-default)">
        {MEMBERS.map((m, i) => (
          <div
            key={m.who}
            className={cn('flex items-center gap-2.5 px-3 py-2.5', i > 0 && 'border-t border-(--color-border-default)')}
          >
            <span
              className={cn(
                'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold text-white',
                m.tone === 'violet' ? 'bg-(--color-action-primary)' : 'bg-(--color-neutral-400)',
              )}
            >
              {m.who}
            </span>
            <span className="text-[12.5px] text-(--color-text-primary)">{m.name}</span>
            <span className="ml-auto inline-flex w-[118px] items-center justify-between gap-1 rounded-(--radius-md) border border-(--color-border-default) px-2 py-1 text-[11px] text-(--color-text-secondary)">
              {m.role}
              <Icon name="ChevronDown" className="h-3 w-3" strokeWidth={2} />
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-(--radius-lg) bg-(--color-surface-section) px-3 py-2.5">
        <Icon name="Users" className="h-4 w-4 shrink-0 text-(--color-text-accent)" strokeWidth={2} />
        <span className="text-[12px] text-(--color-text-primary)">Группа «Отдел маркетинга»</span>
        <span className="ml-auto text-[11px] text-(--color-text-secondary)">12 участников</span>
      </div>
    </div>
  );
}

/**
 * Window: пространства Kaiten в двух видах — 'spaces' (боковое меню с деревом
 * пространств и досок плюс список пространств компании с уровнем доступа) и
 * 'access' (окно доступа к пространству: приглашение, роли участников, группа).
 * Дизайн-ширина 640px, в узких слотах масштабируется.
 */
export function WorkspaceSpacesMock({ variant }: { variant: WorkspaceSpacesVariant }) {
  return (
    <div
      aria-hidden
      className={cn(
        'w-[640px] overflow-hidden rounded-(--radius-2xl) border border-(--color-border-default)',
        'bg-(--color-surface-card) shadow-[0_10px_40px_-20px_rgba(45,45,45,0.3)]',
      )}
    >
      <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-2.5">
        <Icon name="Menu" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
        <span className="text-[13px] font-semibold text-(--color-text-primary)">
          {variant === 'spaces' ? 'Рабочие пространства' : 'Настройки доступа'}
        </span>
        <span className="ml-auto inline-flex h-6 w-6 items-center justify-center rounded-full bg-(--color-action-primary) text-[10px] font-semibold text-white">
          АМ
        </span>
      </div>
      {variant === 'spaces' ? <SpacesTree /> : <AccessPanel />}
    </div>
  );
}
