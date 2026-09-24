import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * ExcelTableViewMock (`excel-table-view`) — табличное представление Кайтена.
 *
 * Блок «Кайтен сохраняет привычный табличный формат»: та же таблица, что в файле,
 * только у строки есть тип карточки, колонка доски, срок, метки, признак
 * блокировки (чем заблокирована) и ответственный. Сортировка по колонке, группы «Задачи команды»,
 * вложенная дочерняя карточка, свернутые выполненные карточки и строка сумм —
 * как в настоящем табличном виде продукта.
 */

type Kind = 'goal' | 'doc' | 'report' | 'folder';
type Label = 'Планирование' | 'Документы' | 'Аналитика' | 'Маркетинг' | 'Продажи';
type Person = 'Teamlead' | 'Екатерина Громова' | 'Артем Куликов' | 'Анна Морозова';

type Row =
  | { type: 'group'; title: string; nested?: boolean }
  | { type: 'done'; text: string }
  | {
      type: 'card';
      kind: Kind;
      title: string;
      column: string;
      due: string;
      label: Label;
      who: Person;
      /** Чем заблокирована: карточка-блокер или причина. */
      blocked?: string;
      parent?: boolean;
      nested?: boolean;
    };

const ROWS: Row[] = [
  { type: 'group', title: 'Задачи команды' },
  { type: 'done', text: '3 карточки выполнены' },
  { type: 'card', kind: 'goal', title: 'Собрать план работ на октябрь', column: 'Запланировано', due: '25.09.2026', label: 'Планирование', who: 'Teamlead' },
  { type: 'card', kind: 'doc', title: 'Обновить инструкцию для новых сотрудников', column: 'Запланировано', due: '24.09.2026', label: 'Документы', who: 'Екатерина Громова' },
  { type: 'card', kind: 'report', title: 'Подготовить отчет по проектам', column: 'Запланировано', due: '23.09.2026', label: 'Аналитика', who: 'Teamlead' },
  { type: 'card', kind: 'folder', title: 'Подготовить дизайн слайдов', column: 'Запланировано', due: '20.09.2026', label: 'Маркетинг', who: 'Артем Куликов' },
  { type: 'card', kind: 'folder', title: 'Подготовить презентацию для клиента', column: 'В работе', due: '21.09.2026', label: 'Маркетинг', who: 'Анна Морозова', parent: true, blocked: 'Дизайн слайдов' },
  { type: 'group', title: 'Задачи команды', nested: true },
  { type: 'card', kind: 'folder', title: 'Подготовить дизайн слайдов', column: 'Запланировано', due: '20.09.2026', label: 'Маркетинг', who: 'Артем Куликов', nested: true },
  { type: 'card', kind: 'doc', title: 'Обновить прайс-лист', column: 'В работе', due: '16.09.2026', label: 'Продажи', who: 'Артем Куликов', blocked: 'Цены поставщика' },
  { type: 'card', kind: 'report', title: 'Собрать обратную связь клиентов', column: 'В работе', due: '22.09.2026', label: 'Аналитика', who: 'Teamlead' },
  { type: 'card', kind: 'doc', title: 'Согласовать договор с подрядчиком', column: 'На согласовании', due: '18.09.2026', label: 'Документы', who: 'Teamlead', blocked: 'Реквизиты подрядчика' },
  { type: 'card', kind: 'folder', title: 'Утвердить макеты для рассылки', column: 'На согласовании', due: '18.09.2026', label: 'Маркетинг', who: 'Анна Морозова', blocked: 'Тексты рассылки' },
  { type: 'card', kind: 'goal', title: 'Согласовать план обучения команды', column: 'На согласовании', due: '22.09.2026', label: 'Планирование', who: 'Екатерина Громова' },
];

/** Цвет метки — как в продукте: насыщенная пастель, темный текст. */
const LABEL_CLASS: Record<Label, string> = {
  Планирование: 'bg-amber-200',
  Документы: 'bg-lime-200',
  Аналитика: 'bg-orange-300/70',
  Маркетинг: 'bg-pink-300',
  Продажи: 'bg-sky-300',
};

const PERSON: Record<Person, { initials: string; bg: string }> = {
  Teamlead: { initials: 'TL', bg: 'bg-teal-200 text-teal-800' },
  'Екатерина Громова': { initials: 'ЕГ', bg: 'bg-amber-100 text-amber-800' },
  'Артем Куликов': { initials: 'АК', bg: 'bg-orange-200 text-orange-800' },
  'Анна Морозова': { initials: 'АМ', bg: 'bg-sky-200 text-sky-800' },
};

/** Ширины колонок: шеврон · название · колонка · срок · метки · блокировка · ответственный. */
const GRID = '36px 268px 132px 104px 144px 164px 1fr';

/** Тип карточки — эмодзи слева от названия, как в продукте. */
const KIND_EMOJI: Record<Kind, string> = { goal: '🟢', doc: '📰', report: '📊', folder: '📁' };

function KindIcon({ kind }: { kind: Kind }) {
  return <span className="inline-flex w-5 shrink-0 justify-center text-[16px] leading-none">{KIND_EMOJI[kind]}</span>;
}

function Cell({ children, className }: { children?: React.ReactNode; className?: string }) {
  return (
    <div className={cn('flex min-w-0 items-center border-r border-(--color-border-default) px-2.5 last:border-r-0', className)}>
      {children}
    </div>
  );
}

export function ExcelTableViewMock() {
  return (
    <div
      aria-hidden
      className="relative w-[1000px] overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) text-[14px] text-(--color-text-primary) shadow-[0_0_40px_rgba(45,45,45,0.12)]"
    >
      {/* шапка таблицы */}
      <div className="grid h-10 border-b border-(--color-border-default) font-medium" style={{ gridTemplateColumns: GRID }}>
        <Cell className="justify-center border-r-0">
          <Icon name="ChevronDown" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
        </Cell>
        <Cell>Название</Cell>
        <Cell className="gap-1.5">
          Колонка
          <Icon name="ArrowUp" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
        </Cell>
        <Cell>Срок</Cell>
        <Cell>Метки</Cell>
        <Cell>Заблокирована</Cell>
        <Cell>Ответственный</Cell>
      </div>

      {/* строки */}
      {ROWS.map((r, i) => (
        <div
          key={i}
          className="grid h-10 border-b border-(--color-border-default)"
          style={{ gridTemplateColumns: GRID }}
        >
          <Cell className="justify-center border-r-0">
            {r.type === 'group' && !r.nested ? (
              <Icon name="ChevronDown" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
            ) : r.type === 'card' && r.parent ? (
              <Icon name="ChevronDown" className="h-4 w-4 text-(--color-text-secondary)" strokeWidth={2} />
            ) : null}
          </Cell>

          {r.type === 'group' ? (
            <>
              <Cell className={cn('font-medium text-(--color-purple-100)', r.nested && 'pl-5')}>{r.title}</Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </>
          ) : r.type === 'done' ? (
            <>
              <Cell className="text-[13px] italic text-(--color-text-secondary) underline underline-offset-2">{r.text}</Cell>
              <Cell />
              <Cell />
              <Cell />
              <Cell />
              <Cell />
            </>
          ) : (
            <>
              <Cell className={cn('gap-2', r.nested && 'pl-9')}>
                <KindIcon kind={r.kind} />
                <span className="truncate">{r.title}</span>
              </Cell>
              <Cell>
                <span className="truncate">{r.column}</span>
              </Cell>
              <Cell>{r.due}</Cell>
              <Cell>
                <span className={cn('truncate rounded-full px-2.5 py-0.5 text-[13px]', LABEL_CLASS[r.label])}>
                  {r.label}
                </span>
              </Cell>
              <Cell className="gap-1.5">
                {r.blocked ? (
                  <>
                    <Icon name="CircleAlert" className="h-4 w-4 shrink-0 text-red-600" strokeWidth={2} />
                    <span className="truncate text-[13px]">{r.blocked}</span>
                  </>
                ) : null}
              </Cell>
              <Cell className="gap-2">
                <span
                  className={cn(
                    'inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold',
                    PERSON[r.who].bg,
                  )}
                >
                  {PERSON[r.who].initials}
                </span>
                <span className="truncate text-[13px]">{r.who}</span>
              </Cell>
            </>
          )}
        </div>
      ))}

      {/* строка сумм */}
      <div className="grid h-10" style={{ gridTemplateColumns: GRID }}>
        <div className="col-span-2 flex items-center gap-2 border-r border-(--color-border-default) pl-[46px] pr-3 text-[13px] text-(--color-text-secondary)">
          Суммы цифровых полей
          <Icon name="CircleHelp" className="h-4 w-4" strokeWidth={2} />
        </div>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
      </div>
    </div>
  );
}
