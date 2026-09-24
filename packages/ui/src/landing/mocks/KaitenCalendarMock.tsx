import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

/**
 * KaitenCalendarMock — вид «Календарь» пространства Кайтена один в один с
 * продуктом (hq.kaiten.ru → пространство → Календарь, режим «Месяц»):
 *  - шапка приложения: логотип, хлебные крошки, поиск;
 *  - тулбар видов (активен «Календарь»), «Отчёты», «Архив», «+ Добавить», «Фильтры»;
 *  - навигация ‹ › «Сегодня» «Срок», заголовок месяца, переключатель Месяц/Неделя/День;
 *  - сетка месяца: дни недели строчными по центру, номер дня справа, соседние
 *    месяцы бледные, сегодняшний день — желтая заливка;
 *  - карточки — сплошные цветные плашки во всю ширину дня: название, статус
 *    (✓ готово, ▶ в работе), аватар ответственного и «+N» участников.
 *
 * Темы карточек те же, что в WorkspaceViewMock (пространство «Маркетинг»),
 * чтобы лендинг показывал одни и те же задачи в разных видах.
 * Дизайн-ширина 760px, в узких слотах масштабируется ScaleToFit.
 */

type Tone = 'violet' | 'pink' | 'teal' | 'green';
type Status = 'done' | 'progress' | 'queue';

const TONE: Record<Tone, string> = {
  violet: 'bg-[#9c27b0] text-white',
  pink: 'bg-[#f48fb1] text-[#2d2d2d]',
  teal: 'bg-[#26c6da] text-[#2d2d2d]',
  green: 'bg-[#66bb6a] text-white',
};

interface CalEvent {
  /** День сентября 2026 (срок карточки); > 30 — октябрь. */
  day: number;
  title: string;
  tone: Tone;
  status: Status;
  who: string;
  more?: number;
  time?: string;
}

const EVENTS: CalEvent[] = [
  { day: 11, title: 'Рассылка клиентам', tone: 'green', status: 'done', who: 'ПС', more: 1 },
  { day: 14, title: 'Отчет по охвату', tone: 'teal', status: 'done', who: 'ЕГ', more: 2 },
  { day: 17, title: 'Баннеры для соцсетей', tone: 'pink', status: 'progress', who: 'АК', more: 1 },
  { day: 17, title: 'Согласование макетов', tone: 'violet', status: 'queue', who: 'АМ', time: '12:00' },
  { day: 18, title: 'Промостраница новой функции', tone: 'violet', status: 'progress', who: 'АМ', more: 2 },
  { day: 22, title: 'Статья в блог', tone: 'teal', status: 'queue', who: 'ЕГ', more: 1 },
  { day: 24, title: 'Запуск рекламной кампании', tone: 'violet', status: 'queue', who: 'АМ', more: 2 },
  { day: 25, title: 'Вебинар для партнеров', tone: 'pink', status: 'queue', who: 'АК', time: '16:00', more: 3 },
];

/** Сегодня в календаре — желтая ячейка, как в продукте. */
const TODAY = 22;

const AVATAR: Record<string, string> = {
  ПС: '#8d6e63',
  ЕГ: '#546e7a',
  АК: '#6d4c41',
  АМ: '#455a64',
};

const TOOLBAR_VIEWS = ['LayoutDashboard', 'Newspaper', 'SquareKanban', 'Kanban', 'Table2', 'ListFilter'];

function Avatar({ who }: { who: string }) {
  return (
    <span
      className="inline-flex h-[13px] w-[13px] shrink-0 items-center justify-center rounded-full text-[6px] font-semibold leading-none text-white ring-1 ring-white/70"
      style={{ background: AVATAR[who] ?? '#607d8b' }}
    >
      {who}
    </span>
  );
}

function Bar({ e }: { e: CalEvent }) {
  return (
    <div className={cn('flex h-[15px] items-center gap-1 rounded-[3px] px-1 text-[8.5px] font-bold leading-none', TONE[e.tone])}>
      <span className="min-w-0 flex-1 truncate">
        {e.time ? `${e.time} ` : ''}
        {e.title}
      </span>
      {e.status === 'done' && <Icon name="Check" className="h-[9px] w-[9px] shrink-0" strokeWidth={3} />}
      {e.status === 'progress' && <Icon name="Play" className="h-[8px] w-[8px] shrink-0 fill-current" strokeWidth={2} />}
      <Avatar who={e.who} />
      {e.more ? <span className="shrink-0">+{e.more}</span> : null}
    </div>
  );
}

function ToolButton({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-[20px] items-center gap-1 rounded-[4px] px-1.5 text-[9.5px] text-[#424242]',
        active && 'bg-[#dfe3e3]',
      )}
    >
      {children}
    </span>
  );
}

export function KaitenCalendarMock() {
  // Сентябрь 2026: 1-е — вторник. Сетка начинается с понедельника 31 августа, 6 недель.
  // Ячейка 0 — 31 августа, 1…30 — сентябрь, 31…41 — 1…11 октября.
  const cells = Array.from({ length: 42 }, (_, i) => i);
  const label = (n: number) => (n <= 0 ? 31 : n > 30 ? n - 30 : n);
  const outside = (n: number) => n <= 0 || n > 30;

  return (
    <div
      aria-hidden
      className="w-[760px] overflow-hidden rounded-[12px] border border-[#e0e0e0] bg-white font-[Roboto,system-ui,sans-serif] text-[rgba(0,0,0,0.87)] shadow-[0_8px_24px_-12px_rgba(45,45,45,0.25)]"
    >
      {/* Шапка приложения */}
      <div className="flex h-[24px] items-center gap-1.5 bg-[#ebefef] pl-[7px] pr-2">
        {/* Фирменный знак Кайтена — пути из apps/web/public/brand/kaiten-logo-dark.svg */}
        <svg width="11" height="11" viewBox="0 0 80 80" fill="none" aria-hidden>
          <path
            d="M59.0856 0H20.9144C9.36367 0 0 9.35857 0 20.903V59.097C0 70.6414 9.36367 80 20.9144 80H59.0856C70.6363 80 80 70.6414 80 59.097V20.903C80 9.35857 70.6363 0 59.0856 0Z"
            fill="#F11F24"
          />
          <path
            d="M31.8576 8.72032L8.72032 31.8576C4.27271 36.3052 4.27271 43.5162 8.72032 47.9638L31.8576 71.101C36.3052 75.5486 43.5162 75.5486 47.9638 71.101L71.101 47.9638C75.5486 43.5162 75.5486 36.3052 71.101 31.8576L47.9638 8.72032C43.5162 4.27271 36.3052 4.27271 31.8576 8.72032Z"
            fill="#78FFC7"
          />
          <path
            d="M39.7808 59.559C50.7054 59.559 59.5615 50.7034 59.5615 39.7795C59.5615 28.8556 50.7054 20 39.7808 20C28.8562 20 20 28.8556 20 39.7795C20 50.7034 28.8562 59.559 39.7808 59.559Z"
            fill="#7D4CCF"
          />
        </svg>
        <span className="text-[10.5px] font-medium">Kaiten</span>
        <span className="text-[8.5px] text-[#757575]">Запуск продукта /</span>
        <Icon name="LayoutDashboard" className="h-[9px] w-[9px] text-[#616161]" strokeWidth={2} />
        <span className="text-[8.5px] font-medium">Маркетинг</span>
        <Icon name="ChevronDown" className="h-[8px] w-[8px] text-[#616161]" strokeWidth={2} />
        <span className="mx-auto flex h-[15px] w-[150px] items-center justify-between rounded-[3px] bg-[#e1e4e4] px-2 text-[8px] text-[#757575]">
          Найти
          <Icon name="Search" className="h-[8px] w-[8px]" strokeWidth={2} />
        </span>
        <span className="rounded-[3px] bg-gradient-to-r from-[#b04fe0] to-[#3ec3e6] px-1.5 py-[2px] text-[7.5px] font-medium text-white">
          Kaiten - AI
        </span>
        <span className="h-[13px] w-[13px] rounded-full bg-[#455a64]" />
      </div>

      <div className="flex">
        {/* Левая панель приложения */}
        <div className="flex w-[26px] shrink-0 flex-col items-center gap-3 bg-[#ebefef] pt-[10px] text-[#616161]">
          {['Mail', 'FolderKanban', 'Star', 'Network', 'LayoutPanelLeft', 'Send'].map((n) => (
            <Icon key={n} name={n} className="h-[11px] w-[11px]" strokeWidth={2} />
          ))}
        </div>

        <div className="min-w-0 flex-1">
          {/* Тулбар видов */}
          <div className="flex h-[30px] items-center gap-1.5 bg-[#ebefef] pl-0.5 pr-1.5">
            <span className="flex items-center gap-0.5 rounded-[5px] border border-[#d6dada] bg-[#f3f5f5] p-[2px]">
              {TOOLBAR_VIEWS.map((n) => (
                <ToolButton key={n}>
                  <Icon name={n} className="h-[10px] w-[10px]" strokeWidth={2} />
                </ToolButton>
              ))}
              <ToolButton active>
                <Icon name="Calendar" className="h-[10px] w-[10px]" strokeWidth={2} />
                Календарь
              </ToolButton>
              <ToolButton>
                <Icon name="RefreshCw" className="h-[10px] w-[10px]" strokeWidth={2} />
              </ToolButton>
              <ToolButton>
                <Icon name="Folder" className="h-[10px] w-[10px]" strokeWidth={2} />
              </ToolButton>
            </span>
            <span className="inline-flex h-[20px] items-center gap-1 rounded-[4px] bg-[#dfe3e3] px-1.5 text-[9.5px] text-[#424242]">
              <Icon name="ChartSpline" className="h-[10px] w-[10px]" strokeWidth={2} />
              Отчёты
            </span>
            <span className="inline-flex h-[20px] items-center gap-1 rounded-[4px] bg-[#dfe3e3] px-1.5 text-[9.5px] text-[#424242]">
              <Icon name="Archive" className="h-[10px] w-[10px]" strokeWidth={2} />
              Архив
            </span>
            <span className="inline-flex h-[20px] items-center gap-0.5 rounded-[4px] bg-[#9c27b0] px-1.5 text-[9.5px] font-medium text-white">
              <Icon name="Plus" className="h-[10px] w-[10px]" strokeWidth={2.4} />
              Добавить
            </span>
            <span className="ml-auto inline-flex h-[20px] items-center gap-1 rounded-[4px] bg-[#dfe3e3] px-1.5 text-[9.5px] text-[#424242]">
              <Icon name="ListFilter" className="h-[10px] w-[10px]" strokeWidth={2} />
              Фильтры
            </span>
          </div>

          {/* Навигация по месяцу */}
          <div className="relative flex h-[32px] items-center gap-1.5 px-2">
            <span className="flex overflow-hidden rounded-[3px] border border-[#e0e0e0]">
              <span className="flex h-[16px] w-[18px] items-center justify-center border-r border-[#e0e0e0]">
                <Icon name="ChevronLeft" className="h-[9px] w-[9px]" strokeWidth={2} />
              </span>
              <span className="flex h-[16px] w-[18px] items-center justify-center">
                <Icon name="ChevronRight" className="h-[9px] w-[9px]" strokeWidth={2} />
              </span>
            </span>
            <span className="flex h-[16px] items-center rounded-[3px] border border-[#e0e0e0] px-1.5 text-[7.5px] font-medium">
              СЕГОДНЯ
            </span>
            <span className="flex h-[16px] items-center rounded-[3px] border border-[#e0e0e0] px-1.5 text-[7.5px] font-medium">
              СРОК
            </span>
            <span className="absolute left-1/2 -translate-x-1/2 text-[13px] font-medium">сентябрь 2026 г.</span>
            <span className="ml-auto flex overflow-hidden rounded-[3px] border border-[#e0e0e0] text-[7.5px] font-medium">
              <span className="bg-[#f3eef9] px-1.5 py-[3px]">МЕСЯЦ</span>
              <span className="border-l border-[#e0e0e0] px-1.5 py-[3px]">НЕДЕЛЯ</span>
              <span className="border-l border-[#e0e0e0] px-1.5 py-[3px]">ДЕНЬ</span>
            </span>
          </div>

          {/* Сетка месяца */}
          <div className="grid grid-cols-7 border-y border-[rgba(0,0,0,0.12)]">
            {['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'].map((d, i) => (
              <div
                key={d}
                className={cn('py-[3px] text-center text-[8.5px] font-medium', i > 0 && 'border-l border-[rgba(0,0,0,0.12)]')}
              >
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7">
            {cells.map((n, i) => (
              <div
                key={i}
                className={cn(
                  'flex h-[57px] flex-col gap-[2px] border-b border-[rgba(0,0,0,0.12)] px-[2px] pt-[2px]',
                  i % 7 > 0 && 'border-l',
                  n === TODAY && 'bg-[#fff8e1]',
                )}
              >
                <span
                  className={cn(
                    'self-end pr-[2px] text-[8.5px] leading-[12px]',
                    outside(n) ? 'text-[rgba(0,0,0,0.38)]' : 'text-[rgba(0,0,0,0.87)]',
                  )}
                >
                  {label(n)}
                </span>
                {EVENTS.filter((e) => e.day === n).map((e) => (
                  <Bar key={e.title} e={e} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default KaitenCalendarMock;
