import { cn } from '../../primitives/cn';

/**
 * Правило «чек-лист закрыт → карточка в «Готово»», остановленный кадр: чек-лист
 * уже закрыт (3/3), и карточка застыла ровно посередине между колонками
 * «В работе» и «Готово». В исходной колонке осталась серая плашка на её месте,
 * в «Готово» — фиолетовая: слот, куда правило приземлит карточку.
 *
 * Карточка приподнята над доской, лежит поверх обеих плашек и отбрасывает тень —
 * состояние перетаскивания. Статичный CSS, без хуков и анимации.
 */

const CHECKLIST: string[] = [
  'Согласовать макет',
  'Подключить тестовый контур',
  'Прогнать регресс',
];

/** Геометрия доски: три колонки ровно укладываются в 680 − 2×16 padding. */
const COL_W = 208;
const COL_GAP = 12;
/** Ширина карточки внутри колонки (px-2 с двух сторон). */
const CARD_W = COL_W - 16;
/** Левый край карточки: padding доски + колонка «Очередь» + отбивка + px-2. */
const CARD_LEFT = 16 + COL_W + COL_GAP + 8;
/** Полный путь карточки из «В работе» в «Готово» (ширина колонки + отбивка). */
const SHIFT = COL_W + COL_GAP;
/** Кадр остановлен на середине пути — карточка ровно между колонками. */
const FROZEN_AT = SHIFT / 2;
/** Слот под карточку-соседа над зависшей: 68 на карточку + 8 отбивки. */
const ABOVE_H = 76;
/** Верх плашки-приёмника в «Готово»: там соседей сверху нет. */
const DROP_TOP = 48;
/**
 * Верх зависшей карточки: контент колонки начинается на 48px, над слотом лежит
 * одна карточка-сосед — на её высоту всё и сдвигаем.
 */
const CARD_TOP = 48 + ABOVE_H;
/** Высота карточки: по ней выровнены обе плашки и зарезервированный слот. */
const CARD_H = 238;
/** Слот в колонке под зависшую карточку плюс 8px отбивки до соседней. */
const CARD_SLOT_H = CARD_H + 8;

const CSS = `
.acd__card{transform:translate(${FROZEN_AT}px,${(DROP_TOP - CARD_TOP) / 2}px);z-index:10}
.acd__card>div{box-shadow:0 0 30px -8px rgba(24,24,27,.35)}
.acd__tick{opacity:1}
.acd__bar{width:100%}
.acd__count-1{opacity:0}
.acd__count-3{opacity:1}
.acd__done{opacity:0}
.acd__ghost{opacity:1}
`;

/** Строка «Основных параметров» карточки задачи. */
function Param({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-[62px] shrink-0 text-[10px] text-(--color-text-secondary)">{label}</span>
      <span className="min-w-0 flex-1 truncate text-[10px] text-(--color-text-primary)">
        {children}
      </span>
    </div>
  );
}

/** Приглушённая карточка-сосед: даёт колонке объём и контекст доски. */
function MutedCard({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="h-full rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) p-2.5">
      <div className="text-[12px] font-medium leading-snug text-(--color-text-secondary)">
        {title}
      </div>
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
  above,
  reserveSlot,
  children,
}: {
  title: string;
  count: string;
  /** Карточка над зарезервированным слотом. */
  above?: React.ReactNode;
  /** Колонки, над которыми зависла карточка, резервируют под неё место. */
  reserveSlot?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="shrink-0 rounded-(--radius-lg) bg-(--color-surface-section) px-2 pb-3 pt-2"
      style={{ width: COL_W }}
    >
      <div className="mb-2 flex items-center gap-1.5 px-1">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
          {title}
        </span>
        <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-border-default) px-1 text-[10px] font-semibold text-(--color-text-secondary)">
          {count}
        </span>
      </div>
      {above && (
        <div className="mb-2" style={{ height: ABOVE_H - 8 }}>
          {above}
        </div>
      )}
      {/* слот под едущую карточку: она абсолютная, поэтому место резервируем */}
      {reserveSlot && <div style={{ height: CARD_SLOT_H }} />}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export function AutomationChecklistDoneMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'acd relative w-[680px] overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-2xl)',
        'bg-(--color-surface-card)',
        'shadow-[0_0_40px_-12px_rgba(24,24,27,0.25)]',
      )}
    >
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* window-chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Текущие задачи</span>
          <span>Чек-листы</span>
        </div>
      </div>

      <div className="relative p-4">
        {/* место, куда правило приземлит карточку — подсвеченный слот в «Готово» */}
        <div
          className="absolute rounded-(--radius-lg) bg-(--color-action-primary)/10"
          style={{ top: DROP_TOP, left: CARD_LEFT + SHIFT, width: CARD_W, height: CARD_H }}
        />

        <div className="flex" style={{ gap: COL_GAP }}>
          <Column title="Очередь" count="4">
            <MutedCard title="Обновить документацию API" meta="24 августа" />
            <MutedCard title="Настроить стенд для демо" meta="26 августа" />
            <MutedCard title="Собрать метрики за август" meta="28 августа" />
            <MutedCard title="Проверить импорт из Jira" meta="29 августа" />
          </Column>
          <Column
            title="В работе"
            count="2"
            reserveSlot
            above={<MutedCard title="Рефакторинг модуля отчетов" meta="21 августа" />}
          />
          <Column title="Готово" count="3" reserveSlot>
            <MutedCard title="Релиз приложения" meta="закрыто 12 августа" />
            <MutedCard title="A/B-тест главной страницы" meta="закрыто 9 августа" />
          </Column>
        </div>

        {/* карточка: едет из «В работе» в «Готово», когда чек-лист закрыт */}
        <div className="acd__card absolute" style={{ top: CARD_TOP, left: CARD_LEFT, width: CARD_W }}>
          <div className="rounded-(--radius-lg) border border-[#ededed] bg-(--color-surface-card) p-2.5 shadow-[0_0_10px_-2px_rgba(24,24,27,0.10)]">
            <div className="flex items-center gap-2">
              <span className="whitespace-nowrap text-[9.5px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                Родительская карточка
              </span>
              <span className="acd__done ml-auto inline-flex items-center gap-1 rounded-full bg-(--color-green-12) px-1.5 py-0.5 text-[9.5px] font-medium text-green-700">
                Готово
              </span>
            </div>

            <div className="mt-2 text-[11.5px] font-medium leading-snug text-(--color-text-primary)">
              Интеграция CRM с сервисами
            </div>

            {/* основные параметры карточки — как в карточке задачи Kaiten */}
            <div className="mt-2 space-y-1 border-t border-(--color-border-default) pt-2">
              <Param label="Колонка">В работе</Param>
              <Param label="Участник">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-flex h-3 w-3 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[7px] font-semibold text-(--color-text-accent)">
                    АК
                  </span>
                  Ответственный
                </span>
              </Param>
              <Param label="Срок">21 августа</Param>
            </div>

            {/* чек-лист: все пункты уже закрыты — это и запустило правило */}
            <div className="mt-2.5">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="text-[10px] text-(--color-text-secondary)">Чек-лист</span>
                <span className="relative ml-auto text-[10px] font-semibold text-(--color-text-secondary)">
                  <span className="acd__count-1">0/3</span>
                  <span className="acd__count-3 absolute right-0 top-0 text-green-700">3/3</span>
                </span>
              </div>
              <div className="h-1 overflow-hidden rounded-full bg-(--color-neutral-200)">
                <div className="acd__bar h-full rounded-full bg-(--color-action-primary)" />
              </div>

              <ul className="mt-2 space-y-1.5">
                {CHECKLIST.map((text, i) => (
                  <li key={text} className={`acd__row acd__row--${i + 1} flex items-center gap-1.5`}>
                    <span className="relative inline-flex h-3 w-3 shrink-0 items-center justify-center rounded-[3px] border border-(--color-neutral-300)">
                      <span className="acd__tick absolute inset-0 flex items-center justify-center rounded-[2px] bg-(--color-action-primary)">
                        <svg
                          viewBox="0 0 12 12"
                          className="h-2 w-2"
                          fill="none"
                          stroke="#fff"
                          strokeWidth="2.5"
                        >
                          <path
                            d="M2.5 6.2l2.4 2.4L9.6 3.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </span>
                    <span className="truncate text-[10.5px] text-(--color-text-secondary)">
                      {text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* плашка в исходной колонке — место, откуда карточка уехала */}
        <div
          className="acd__ghost absolute rounded-(--radius-lg) bg-black/5"
          style={{ top: CARD_TOP, left: CARD_LEFT, width: CARD_W, height: CARD_H }}
        />
      </div>
    </div>
  );
}
