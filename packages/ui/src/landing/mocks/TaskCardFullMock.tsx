import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * TaskCardFullMock (`task-card-full`) — карточка задачи Кайтена целиком.
 *
 * Блок «Вся информация по задаче — внутри карточки»: слева параметры,
 * описание, чек-лист и файлы, справа — обсуждение с командой. Показывает,
 * что контекст задачи не разъезжается по почте, чатам и диску.
 */

const CHECKLIST: { text: string; done: boolean }[] = [
  { text: 'Выгрузить новые цены от поставщика', done: true },
  { text: 'Согласовать наценку с коммерческим отделом', done: true },
  { text: 'Обновить карточки товаров на сайте', done: false },
  { text: 'Проверить прайс в каталоге', done: false },
];

const FILES: { name: string; meta: string }[] = [
  { name: 'Прайс_сентябрь.xlsx', meta: '248 КБ' },
  { name: 'Согласование_наценки.pdf', meta: '96 КБ' },
];

const THREAD: { who: string; initials: string; text: string; own?: boolean }[] = [
  {
    who: 'Игорь Лапин',
    initials: 'ИЛ',
    text: 'Поставщик прислал цены, добавил файл в карточку.',
  },
  {
    who: 'Анна Ковалева',
    initials: 'АК',
    text: 'Наценку согласовали, беру в работу карточки товаров.',
    own: true,
  },
  {
    who: 'Мария Седова',
    initials: 'МС',
    text: 'Тексты для каталога готовы, можно публиковать вместе с прайсом.',
  },
];

function Avatar({ children, muted }: { children: React.ReactNode; muted?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold',
        muted
          ? 'bg-(--color-surface-section) text-(--color-text-secondary)'
          : 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
      )}
    >
      {children}
    </span>
  );
}

function Param({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-[10.5px]">
      <span className="w-[86px] shrink-0 text-(--color-text-secondary)">{label}</span>
      <span className="flex items-center gap-1.5 text-(--color-text-primary)">{children}</span>
    </div>
  );
}

export function TaskCardFullMock() {
  return (
    <div
      aria-hidden
      className="relative flex h-[480px] w-[720px] flex-col overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_0_40px_rgba(45,45,45,0.12)]"
    >
      {/* шапка карточки */}
      <div className="flex items-start gap-3 border-b border-(--color-border-default) px-5 py-3.5">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold leading-snug text-(--color-text-primary)">
            Обновить прайс на сайте
          </div>
          <div className="mt-1 flex items-center gap-2 text-[10.5px] text-(--color-text-secondary)">
            <span className="text-(--color-text-accent) underline underline-offset-2">#4821</span>
            <span>Отдел маркетинга / Сайт и контент</span>
          </div>
        </div>
        <span className="ml-auto inline-flex h-5 shrink-0 items-center rounded-full bg-(--color-action-primary-soft) px-2 text-[9px] font-medium text-(--color-text-accent)">
          В работе
        </span>
      </div>

      <div className="flex min-h-0 flex-1">
        {/* левая колонка — контекст задачи */}
        <div className="w-[452px] shrink-0 space-y-3.5 border-r border-(--color-border-default) px-5 py-4">
          <div className="space-y-2">
            <Param label="Ответственный">
              <Avatar>АК</Avatar>
              Анна Ковалева
            </Param>
            <Param label="Срок">
              <Icon name="Calendar" className="h-3 w-3 text-(--color-text-secondary)" strokeWidth={2} />4 сентября
            </Param>
            <Param label="Участники">
              <Avatar>ИЛ</Avatar>
              <Avatar muted>МС</Avatar>
              <Avatar muted>ПТ</Avatar>
            </Param>
          </div>

          {/* описание */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
              <Icon name="AlignLeft" className="h-3 w-3" strokeWidth={2} />
              Описание
            </div>
            <div className="space-y-1.5">
              <div className="h-1.5 w-full rounded-full bg-(--color-neutral-200)" />
              <div className="h-1.5 w-5/6 rounded-full bg-(--color-neutral-200)" />
              <div className="h-1.5 w-4/6 rounded-full bg-(--color-neutral-200)" />
            </div>
          </div>

          {/* чек-лист */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
              <Icon name="SquareCheck" className="h-3 w-3" strokeWidth={2} />
              Чек-лист
              <span className="ml-auto normal-case text-(--color-text-secondary)">2 из 4</span>
            </div>
            <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-(--color-surface-section)">
              <div className="h-full w-1/2 rounded-full bg-(--color-action-primary)" />
            </div>
            <div className="space-y-1.5">
              {CHECKLIST.map((c) => (
                <div key={c.text} className="flex items-center gap-2 text-[11px]">
                  <span
                    className={cn(
                      'inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded border',
                      c.done
                        ? 'border-transparent bg-(--color-green-100) text-white'
                        : 'border-(--color-border-default)',
                    )}
                  >
                    {c.done ? <Icon name="Check" className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                  </span>
                  <span
                    className={cn(
                      c.done
                        ? 'text-(--color-text-secondary) line-through'
                        : 'text-(--color-text-primary)',
                    )}
                  >
                    {c.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* файлы */}
          <div>
            <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
              <Icon name="Paperclip" className="h-3 w-3" strokeWidth={2} />
              Файлы
            </div>
            <div className="flex gap-2">
              {FILES.map((f) => (
                <div
                  key={f.name}
                  className="flex min-w-0 flex-1 items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) px-2.5 py-2"
                >
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--color-surface-section) text-(--color-text-secondary)">
                    <Icon name="FileText" className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[10.5px] font-medium text-(--color-text-primary)">
                      {f.name}
                    </span>
                    <span className="block text-[9px] text-(--color-text-secondary)">{f.meta}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* правая колонка — обсуждение */}
        <div className="flex min-w-0 flex-1 flex-col bg-(--color-surface-section)">
          <div className="flex items-center gap-1.5 border-b border-(--color-border-default) px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
            <Icon name="MessageSquare" className="h-3 w-3" strokeWidth={2} />
            Обсуждение
          </div>
          <div className="flex-1 space-y-2.5 px-4 py-3">
            {THREAD.map((m) => (
              <div
                key={m.who}
                className={cn(
                  'rounded-(--radius-lg) border bg-(--color-surface-card) p-2.5',
                  m.own
                    ? 'border-(--color-action-primary)/40 shadow-sm'
                    : 'border-(--color-border-default) opacity-80',
                )}
              >
                <div className="flex items-center gap-1.5">
                  <Avatar muted={!m.own}>{m.initials}</Avatar>
                  <span className="text-[10px] font-semibold text-(--color-text-primary)">
                    {m.who}
                  </span>
                </div>
                <div className="mt-1.5 text-[10.5px] leading-snug text-(--color-text-secondary)">
                  {m.text}
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-(--color-border-default) px-4 pt-2.5 pb-4">
            <div className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-2.5 py-2 text-[10.5px] text-(--color-text-secondary)">
              Написать в задачу
              <span className="ml-auto inline-flex h-5 w-5 items-center justify-center rounded-md bg-(--color-action-primary) text-white">
                <Icon name="ArrowUp" className="h-3 w-3" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
