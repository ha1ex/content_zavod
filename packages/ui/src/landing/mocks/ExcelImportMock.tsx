import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * ExcelImportMock (`excel-import`) — перенос задач из XLS-файла в Кайтен.
 *
 * Блок «Не начинайте с нуля»: слева строки файла, справа те же задачи уже
 * карточками на доске, между ними — строка, которая перелетает в колонку
 * «Очередь» (чистый CSS @keyframes, 6.4с, уважает prefers-reduced-motion).
 */

type Item = { task: string; who: string; due: string };

const ROWS: Item[] = [
  { task: 'Обновить прайс на сайте', who: 'Анна', due: '04.09' },
  { task: 'Отчет по продажам за август', who: 'Игорь', due: '05.09' },
  { task: 'Согласовать макет каталога', who: 'Мария', due: '05.09' },
  { task: 'Договор с подрядчиком', who: 'Павел', due: '08.09' },
];

/** Карточки, которые уже создались из строк файла. */
const CARDS: { title: string; who: string; due: string }[] = [
  { title: 'Обновить прайс на сайте', who: 'АК', due: '4 сен' },
  { title: 'Отчет по продажам за август', who: 'ИЛ', due: '5 сен' },
  { title: 'Согласовать макет каталога', who: 'МС', due: '5 сен' },
];

const KEYFRAMES = `
.xim .fly{ animation: ximFly 6.4s ease-in-out infinite; }
@keyframes ximFly{
  0%,8%{ transform:translate(0,0) scale(0.96); opacity:0; }
  16%{ transform:translate(0,0) scale(1); opacity:1; }
  52%{ transform:translate(324px,-96px) scale(1); opacity:1; }
  64%,100%{ transform:translate(324px,-96px) scale(0.98); opacity:0; }
}
.xim .slot{ animation: ximSlot 6.4s ease-in-out infinite; }
@keyframes ximSlot{
  0%,56%{ opacity:1; }
  66%,100%{ opacity:0; }
}
.xim .landed{ animation: ximLanded 6.4s ease-in-out infinite; }
@keyframes ximLanded{
  0%,60%{ opacity:0; transform:translateY(4px); }
  70%,100%{ opacity:1; transform:translateY(0); }
}
@media (prefers-reduced-motion: reduce){
  .xim .fly{ display:none; }
  .xim .slot{ animation:none !important; opacity:0; }
  .xim .landed{ animation:none !important; opacity:1; transform:none; }
}
`;

function Avatar({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-semibold text-(--color-text-accent)">
      {children}
    </span>
  );
}

function BoardCard({
  title,
  who,
  due,
  className,
}: {
  title: string;
  who: string;
  due: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'space-y-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) p-2.5',
        className,
      )}
    >
      <div className="text-[11.5px] font-medium leading-snug text-(--color-text-primary)">
        {title}
      </div>
      <div className="flex items-center justify-between">
        <Avatar>{who}</Avatar>
        <span className="inline-flex items-center gap-1 text-[10px] text-(--color-text-secondary)">
          <Icon name="Calendar" className="h-3 w-3" strokeWidth={2} />
          {due}
        </span>
      </div>
    </div>
  );
}

export function ExcelImportMock() {
  return (
    <div className="xim">
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
      <div
        aria-hidden
        className="relative h-[480px] w-[720px] overflow-hidden rounded-(--radius-3xl) border border-(--color-border-default) bg-(--color-surface-card) shadow-[0_0_40px_rgba(45,45,45,0.12)]"
      >
        <div className="flex items-center gap-2 border-b border-(--color-border-default) px-4 py-2.5">
          <span className="text-[13px] font-semibold text-(--color-text-primary)">
            Импорт задач
          </span>
          <span className="text-[12px] text-(--color-text-secondary)">
            / XLS и CSV
          </span>
          <span className="ml-auto inline-flex items-center gap-1 rounded-md bg-(--color-green-12) px-2 py-1 text-[10px] font-medium text-green-700">
            <Icon name="Check" className="h-3 w-3" strokeWidth={2.5} />
            Перенесено 248 задач
          </span>
        </div>

        <div className="flex h-[calc(480px-49px)] items-stretch">
          {/* файл */}
          <div className="w-[300px] shrink-0 border-r border-(--color-border-default) p-4">
            <div className="flex items-center gap-2 rounded-(--radius-lg) border border-(--color-border-default) px-2.5 py-2">
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-(--color-green-12) text-green-700">
                <Icon name="Table" className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[10.5px] font-semibold text-(--color-text-primary)">
                  Задачи_команды.xlsx
                </span>
                <span className="block text-[9px] text-(--color-text-secondary)">
                  248 строк · 5 листов
                </span>
              </span>
            </div>

            <div className="mt-3 overflow-hidden rounded-(--radius-lg) border border-(--color-border-default)">
              <div className="flex border-b border-(--color-border-default) bg-(--color-surface-section) px-2 py-1.5 text-[9px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                <span className="w-[140px] shrink-0">Задача</span>
                <span className="w-[62px] shrink-0">Кто</span>
                <span>Срок</span>
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.task}
                  className={cn(
                    'flex border-b border-(--color-border-default) px-2 py-2 text-[10.5px] last:border-b-0',
                    i === 0 ? 'bg-(--color-action-primary-soft)/50' : 'opacity-70',
                  )}
                >
                  <span className="w-[140px] shrink-0 truncate pr-2 text-(--color-text-primary)">
                    {r.task}
                  </span>
                  <span className="w-[62px] shrink-0 text-(--color-text-secondary)">{r.who}</span>
                  <span className="text-(--color-text-secondary)">{r.due}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 space-y-1.5 text-[10px] text-(--color-text-secondary)">
              <div className="flex items-center gap-1.5">
                <Icon name="Check" className="h-3 w-3 text-green-700" strokeWidth={2.5} />
                Колонка «Кто» — ответственный
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Check" className="h-3 w-3 text-green-700" strokeWidth={2.5} />
                Колонка «Срок» — дата завершения
              </div>
              <div className="flex items-center gap-1.5">
                <Icon name="Check" className="h-3 w-3 text-green-700" strokeWidth={2.5} />
                Лист «Проекты» — доска
              </div>
            </div>

            {/* карточка, которая улетает на доску */}
            <div className="pointer-events-none absolute left-4 top-[268px] w-[268px]">
              <div className="fly">
                <BoardCard
                  title="Договор с подрядчиком"
                  who="ПТ"
                  due="8 сен"
                  className="shadow-[0_16px_34px_-12px_rgba(45,45,45,0.35)]"
                />
              </div>
            </div>
          </div>

          {/* стрелка */}
          <div className="flex w-[64px] shrink-0 flex-col items-center justify-center gap-2 bg-(--color-surface-section)">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--color-action-primary) text-white">
              <Icon name="ArrowRight" className="h-4 w-4" strokeWidth={2.5} />
            </span>
            <span className="text-center text-[9px] leading-tight text-(--color-text-secondary)">
              Импорт
              <br />
              XLS · CSV
            </span>
          </div>

          {/* доска */}
          <div className="min-w-0 flex-1 bg-(--color-surface-section) p-3">
            <div className="mb-2 flex items-center gap-1.5 px-1">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
                Очередь
              </span>
              <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-(--color-border-default) px-1 text-[10px] font-semibold text-(--color-text-secondary)">
                4
              </span>
            </div>
            <div className="space-y-2">
              {CARDS.map((c) => (
                <BoardCard key={c.title} title={c.title} who={c.who} due={c.due} />
              ))}
              <div className="relative h-[68px]">
                <div className="slot absolute inset-0 rounded-(--radius-lg) border border-dashed border-(--color-action-primary)/50 bg-(--color-action-primary-soft)/40" />
                <div className="landed absolute inset-0">
                  <BoardCard title="Договор с подрядчиком" who="ПТ" due="8 сен" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
