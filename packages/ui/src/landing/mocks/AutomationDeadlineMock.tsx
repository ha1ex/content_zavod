import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';
import { KaitenLogo } from '../KaitenLogo';

interface Card {
  title: string;
  meta: string;
}

const QUEUE: Card[] = [
  { title: 'Обновить прайс на лендинге', meta: '2 сентября' },
  { title: 'Собрать бриф по редизайну', meta: '4 сентября' },
  { title: 'Обновить регламент онбординга', meta: '8 сентября' },
];

const IN_PROGRESS: Card[] = [{ title: 'Подготовить документ для подрядчика', meta: '29 апреля' }];

const DONE: Card[] = [
  { title: 'Согласовать новый баннер', meta: 'закрыто вчера' },
  { title: 'Выгрузить отчет по спринту', meta: 'закрыто 22 августа' },
];

/** Приглушенная карточка-сосед: даёт колонке объём и контекст доски. */
function MutedCard({ title, meta }: Card) {
  return (
    <div className="rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) p-2.5">
      <div className="text-[12px] font-medium leading-snug text-(--color-text-secondary)">{title}</div>
      <div className="mt-2 flex items-center gap-2">
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-semibold text-(--color-text-accent)">
          АК
        </span>
        <span className="ml-auto text-[10px] text-(--color-text-secondary)">{meta}</span>
      </div>
    </div>
  );
}

function Column({
  title,
  count,
  children,
}: {
  title: string;
  count: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-w-0 flex-1 rounded-(--radius-lg) bg-(--color-surface-section) p-2">
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <span className="truncate text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
          {title}
        </span>
        <span className="ml-auto inline-flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-(--color-border-default) px-1 text-[10px] font-semibold text-(--color-text-secondary)">
          {count}
        </span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

/**
 * Контроль сроков автоматизацией Kaiten: канбан из трёх колонок, в «В работе»
 * карточка с горящим сроком (метка «Срочно» и красная плашка времени), поверх
 * доски — уведомление от Кайтена «Обратите внимание, задача почти просрочена».
 * Показывает, что о дедлайне сообщает система, а не коллега вручную.
 */
export function AutomationDeadlineMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative w-[680px] overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-2xl)',
        'bg-(--color-surface-card)',
        'shadow-[0_0_40px_-12px_rgba(24,24,27,0.25)]',
      )}
    >
      {/* window-chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Текущие задачи</span>
          <span>Напоминания</span>
        </div>
      </div>

      <div className="relative p-4">
        <div className="flex min-h-[344px] gap-3">
          <Column title="Очередь" count="3">
            {QUEUE.map((c) => (
              <MutedCard key={c.title} {...c} />
            ))}
          </Column>

          <Column title="В работе" count="2">
            {IN_PROGRESS.map((c) => (
              <MutedCard key={c.title} {...c} />
            ))}

            {/* карточка, у которой горит срок */}
            <div className="rounded-(--radius-lg) border border-(--color-red-100)/40 bg-(--color-surface-card) px-2.5 pb-2.5 pt-1.5 shadow-[0_0_10px_-2px_rgba(24,24,27,0.10)]">
              <div className="text-[9px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                Родительская карточка
              </div>
              <div className="mt-1.5 text-[12px] font-medium leading-snug text-(--color-text-primary)">
                Заменить картинку на сайте
              </div>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-semibold text-(--color-text-accent)">
                  АК
                </span>
                <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-(--color-red-100) px-1.5 py-0.5 text-[9.5px] font-semibold text-white">
                  <Icon name="Clock" aria-hidden className="h-2.5 w-2.5" strokeWidth={2.5} />
                  Сегодня
                </span>
              </div>
              {/* прогресс чек-листа — тот же вид, что в соседних моках */}
              <div className="mt-1.5">
                <div className="mb-1.5 flex items-center gap-2">
                  <span className="text-[10px] text-(--color-text-secondary)">Чек-лист</span>
                  <span className="ml-auto text-[10px] font-semibold text-(--color-text-secondary)">1/2</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-(--color-neutral-200)">
                  <div className="h-full w-1/2 rounded-full bg-(--color-action-primary)" />
                </div>
              </div>
              <ul className="mt-3 space-y-1">
                {[
                  { text: 'Согласовать новый баннер', done: true },
                  { text: 'Выложить на прод', done: false },
                ].map((it) => (
                  <li key={it.text} className="flex items-center gap-1.5">
                    {it.done ? (
                      <span className="inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] bg-(--color-action-primary)">
                        <svg viewBox="0 0 12 12" className="h-2 w-2" fill="none" stroke="#fff" strokeWidth="2.5">
                          <path d="M2.5 6.2l2.4 2.4L9.6 3.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex h-3 w-3 shrink-0 rounded-[3px] border border-(--color-neutral-300)" />
                    )}
                    <span className="truncate text-[10px] text-(--color-text-secondary)">{it.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </Column>

          <Column title="Готово" count="2">
            {DONE.map((c) => (
              <MutedCard key={c.title} {...c} />
            ))}
          </Column>
        </div>

        {/* уведомление Kaiten: лежит поверх пустого низа доски, карточек не задевает */}
        <div className="absolute right-8 top-[258px] w-[300px] rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) p-3 shadow-[0_0_40px_-12px_rgba(24,24,27,0.35)]">
          <div className="flex gap-2.5">
            <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center">
              <KaitenLogo markOnly className="h-full w-full" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="text-[11.5px] font-normal leading-tight text-red-700">
                Обратите внимание, задача почти просрочена
              </div>
              <div className="mt-1 text-[10.5px] leading-snug text-(--color-text-secondary)">
                Срок карточки «Заменить картинку на сайте» — сегодня 10:35
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
