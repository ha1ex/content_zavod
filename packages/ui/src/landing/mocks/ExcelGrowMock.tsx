import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * ExcelGrowMock (`excel-grow`) — таблица задач в Excel, которая растет без конца.
 *
 * Блок «Excel хранит данные. Кайтен помогает управлять работой»: аккуратный файл
 * превращается в бесконечный список — статичный первый кадр, внизу кадр растворяется,
 * в подвале множатся листы. Это визуальный аргумент «потолка таблицы», поэтому
 * оформление намеренно не кайтеновское: серая сетка, зеленая шапка файла.
 */

type Row = {
  task: string;
  who: string;
  due: string;
  status: 'В работе' | 'Готово' | 'Не начата' | 'Ждем ответ';
  note?: string;
};

/** Строки листа: обычная операционка команды, которую заводят в таблицу. */
const ROWS: Row[] = [
  { task: 'Обновить прайс на сайте', who: 'Анна', due: '04.09', status: 'В работе', note: 'Ждем цены' },
  { task: 'Собрать отчет по продажам за август', who: 'Игорь', due: '05.09', status: 'Не начата', note: 'Нет данных филиалов' },
  { task: 'Согласовать макет каталога', who: 'Мария', due: '05.09', status: 'Ждем ответ', note: 'Правки от продаж' },
  { task: 'Договор с подрядчиком по монтажу', who: 'Павел', due: '08.09', status: 'В работе', note: 'Юристы смотрят п. 4' },
  { task: 'Рассылка по клиентам из сегмента B', who: 'Анна', due: '09.09', status: 'Не начата' },
  { task: 'Проверить остатки на складе', who: 'Дмитрий', due: '10.09', status: 'Готово', note: 'Сверено с 1С' },
  { task: 'Интервью с кандидатом на позицию', who: 'Мария', due: '11.09', status: 'Не начата', note: 'Перенести на пятницу' },
  { task: 'Обновить регламент приемки', who: 'Павел', due: '12.09', status: 'В работе' },
  { task: 'Счета за сентябрь по подрядчикам', who: 'Игорь', due: '12.09', status: 'Ждем ответ', note: 'Ждем подписи' },
  { task: 'Фотосъемка новой коллекции', who: 'Анна', due: '15.09', status: 'Не начата', note: 'Бронь студии?' },
  { task: 'Перенести задачи из чата в таблицу', who: 'Дмитрий', due: '15.09', status: 'В работе', note: 'См. чат' },
  { task: 'Сверка по заказам с бухгалтерией', who: 'Игорь', due: '16.09', status: 'Не начата' },
  { task: 'Тексты для страницы каталога', who: 'Мария', due: '17.09', status: 'Готово', note: 'Готово, см. файл' },
  { task: 'Подготовить презентацию для клиента', who: 'Анна', due: '18.09', status: 'В работе', note: 'Версия 3, финал?' },
];

const STATUS_CLASS: Record<Row['status'], string> = {
  'В работе': 'text-(--color-text-primary)',
  Готово: 'text-green-700',
  'Не начата': 'text-(--color-text-secondary)',
  'Ждем ответ': 'text-amber-800',
};

/** Высота строки в design-координатах — от нее считается шаг анимации. */
const ROW_H = 26;

const KEYFRAMES = `
/* Анимация остановлена на первом кадре по решению макета: строки стоят. */
.xlg .roll{ animation:none; }
@keyframes xlgRoll{
  0%{ transform:translateY(0); }
  100%{ transform:translateY(-${ROW_H * ROWS.length}px); }
}
@media (prefers-reduced-motion: reduce){
  .xlg .roll{ animation:none !important; }
}
`;

const SHEETS = ['Проекты', 'Маркетинг', 'Разработка', 'Склад', 'Лист5', 'Лист6', 'Лист7'];

function Cell({
  children,
  className,
  width,
}: {
  children?: React.ReactNode;
  className?: string;
  width: string;
}) {
  return (
    <div
      className={cn(
        'shrink-0 truncate border-r border-(--color-border-default) px-2',
        'leading-[23px]',
        className,
      )}
      style={{ width }}
    >
      {children}
    </div>
  );
}

function HeaderCell({ letter, name, width }: { letter: string; name: string; width: string }) {
  return (
    <div
      className="shrink-0 border-r border-(--color-border-default) bg-(--color-surface-section) px-2 leading-[26px] text-[10px] font-semibold uppercase tracking-wide text-(--color-text-secondary)"
      style={{ width }}
    >
      {letter} · {name}
    </div>
  );
}

function Rows() {
  return (
    <>
      {ROWS.map((r, i) => (
        <div
          key={i}
          className="flex border-b border-(--color-border-default) text-[11.5px] text-(--color-text-primary)"
          style={{ height: ROW_H }}
        >
          <div className="w-8 shrink-0 border-r border-(--color-border-default) bg-(--color-surface-section) text-center leading-[23px] text-[10px] text-(--color-text-secondary)">
            {i + 1}
          </div>
          <Cell width="286px">{r.task}</Cell>
          <Cell width="104px" className="text-(--color-text-secondary)">
            {r.who}
          </Cell>
          <Cell width="78px" className="text-(--color-text-secondary)">
            {r.due}
          </Cell>
          <Cell width="118px" className={STATUS_CLASS[r.status]}>
            {r.status}
          </Cell>
          <Cell width="126px" className="text-(--color-text-secondary)">
            {r.note}
          </Cell>
        </div>
      ))}
    </>
  );
}

export function ExcelGrowMock() {
  return (
    <div className="xlg">
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div
        aria-hidden
        className="relative h-[506px] w-[720px] overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_0_40px_rgba(45,45,45,0.12)]"
      >
        {/* шапка файла */}
        <div className="flex items-center gap-2 border-b border-(--color-border-default) bg-[#217346] px-4 py-2.5">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-md bg-white/25 text-white">
            <Icon name="Table" className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <span className="text-[13px] font-semibold text-white">
            Задачи_команды_v7_финал_правки.xlsx
          </span>
          <span className="ml-auto text-[11px] text-white/80">Общий доступ · 9 человек</span>
        </div>

        {/* панель формул */}
        <div className="flex items-center gap-2 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-1.5 text-[10.5px] text-(--color-text-secondary)">
          <span className="rounded border border-(--color-border-default) bg-(--color-surface-card) px-2 py-0.5">
            B248
          </span>
          <span className="truncate">Обновить прайс на сайте</span>
          <span className="ml-auto">Строк: 1 248</span>
        </div>

        {/* заголовки колонок */}
        <div className="flex border-b border-(--color-border-default)">
          <div className="w-8 shrink-0 border-r border-(--color-border-default) bg-(--color-surface-section) leading-[26px]" />
          <HeaderCell letter="A" name="Задача" width="286px" />
          <HeaderCell letter="B" name="Кто делает" width="104px" />
          <HeaderCell letter="C" name="Срок" width="78px" />
          <HeaderCell letter="D" name="Статус" width="118px" />
          <HeaderCell letter="E" name="Комментарий" width="126px" />
        </div>

        {/* бесконечная лента строк */}
        <div className="relative h-[366px] overflow-hidden">
          <div className="roll">
            <Rows />
          </div>
          {/* растворение кадра: строк становится все больше, конца не видно */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-[linear-gradient(to_bottom,rgba(255,255,255,0)_0%,rgba(255,255,255,0.85)_100%)]" />
        </div>

        {/* подвал с листами */}
        <div className="absolute inset-x-0 bottom-0 flex items-center gap-1 border-t border-(--color-border-default) bg-(--color-surface-section) px-3 py-2">
          {SHEETS.map((s, i) => (
            <span
              key={s}
              className={cn(
                'rounded-md px-2 py-1 text-[10px]',
                i === 0
                  ? 'bg-(--color-surface-card) font-semibold text-(--color-text-primary)'
                  : 'text-(--color-text-secondary)',
              )}
            >
              {s}
            </span>
          ))}
          <span className="text-[10px] text-(--color-text-secondary)">+</span>
        </div>
      </div>
    </div>
  );
}
