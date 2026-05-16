import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

type Role = 'Владелец' | 'Редактор' | 'Комментирует' | 'Только смотрит';

interface Member {
  initials: string;
  tone: 'violet' | 'blue' | 'orange' | 'green';
  name: string;
  meta: string;
  role: Role;
  group?: boolean;
}

const MEMBERS: Member[] = [
  {
    initials: 'АП',
    tone: 'violet',
    name: 'Анна Петрова',
    meta: 'Руководитель продукта · вы',
    role: 'Владелец',
  },
  {
    initials: 'ИК',
    tone: 'blue',
    name: 'Илья Климов',
    meta: 'Тимлид разработки',
    role: 'Редактор',
  },
  {
    initials: 'КМ',
    tone: 'orange',
    name: 'Команда Маркетинг',
    meta: '12 человек',
    role: 'Комментирует',
    group: true,
  },
  {
    initials: 'СВ',
    tone: 'green',
    name: 'Светлана Веденеева',
    meta: 'Подрядчик · внешний',
    role: 'Только смотрит',
  },
];

const TONE_CLASS: Record<Member['tone'], string> = {
  violet: 'bg-(--color-action-primary) text-white',
  blue: 'bg-(--color-blue-100) text-white',
  orange: 'bg-(--color-orange-100) text-white',
  green: 'bg-(--color-green-100) text-white',
};

const ROLE_CLASS: Record<Role, string> = {
  'Владелец': 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  'Редактор': 'bg-(--color-blue-12) text-(--color-blue-100)',
  'Комментирует': 'bg-(--color-orange-12) text-amber-800',
  'Только смотрит': 'bg-(--color-neutral-200) text-(--color-text-primary)',
};

/**
 * Mock окна настройки доступа к документу: участники с ролями, группы, внешние
 * гости, переключатель публичной ссылки. Тон: «доступ настраивается за минуту
 * для всей команды, группы или одного человека».
 */
export function PermissionsPanelMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Доступ · Регламент онбординга</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            5 участников
          </span>
        </div>
      </div>

      <div className="p-4 md:p-5">
        {/* add row */}
        <div className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2">
          <Icon name="UserPlus" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
          <span className="flex-1 text-[11px] text-(--color-text-secondary)">
            Добавить участника или группу
          </span>
          <span className="inline-flex h-6 items-center gap-1 rounded-(--radius-md) bg-(--color-action-primary) px-2 text-[10.5px] font-medium text-white">
            Пригласить
          </span>
        </div>

        {/* members */}
        <div className="mt-3 space-y-1.5">
          {MEMBERS.map((m, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) p-2.5"
            >
              <span
                className={cn(
                  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-xl) text-[10px] font-semibold',
                  m.group ? 'bg-(--color-neutral-200) text-(--color-text-primary)' : TONE_CLASS[m.tone],
                )}
              >
                {m.group ? (
                  <Icon name="Users" className="h-3.5 w-3.5" strokeWidth={2} />
                ) : (
                  m.initials
                )}
              </span>
              <div className="min-w-0 flex-1">
                <div className="truncate text-[11.5px] font-semibold text-(--color-text-primary)">
                  {m.name}
                </div>
                <div className="truncate text-[10px] text-(--color-text-secondary)">{m.meta}</div>
              </div>
              <span
                className={cn(
                  'inline-flex h-5 items-center gap-1 rounded-full px-2 text-[10px] font-medium',
                  ROLE_CLASS[m.role],
                )}
              >
                {m.role}
                <Icon name="ChevronDown" className="h-2.5 w-2.5" strokeWidth={2.5} />
              </span>
            </div>
          ))}
        </div>

        {/* public link toggle */}
        <div className="mt-3 rounded-(--radius-xl) border border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/40 p-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-xl) bg-(--color-action-primary) text-white">
              <Icon name="Link2" className="h-3.5 w-3.5" strokeWidth={2} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
                Открыт по ссылке
              </div>
              <div className="text-[10px] text-(--color-text-secondary)">
                Внешние участники могут только читать. Доступ можно отключить в любой момент.
              </div>
            </div>
            <span className="inline-flex h-5 w-9 shrink-0 items-center rounded-full bg-(--color-action-primary) p-0.5">
              <span className="h-4 w-4 translate-x-4 rounded-full bg-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
