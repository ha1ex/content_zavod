/**
 * CardChecklistRelationsMock (`card-checklist-relations`) — фрагмент карточки Кайтена
 * один в один с продукта: чек-лист «Подготовка презентации» (3 из 6) и блок «Связи»
 * с дочерней карточкой «Подготовить дизайн слайдов». Ширина 620px, ужимает MockFit.
 */

const PURPLE = '#9c27b0';

const ITEMS: [string, boolean][] = [
  ['Изучить бриф и задачи клиента', true],
  ['Собрать структуру презентации', true],
  ['Согласовать содержание с руководителем', false],
  ['Прикрепить финальный PDF и исходник', false],
];

export function CardChecklistRelationsMock() {
  return (
    <div
      aria-hidden
      className="w-[620px] rounded-(--radius-3xl) bg-white px-6 pb-6 pt-5 text-[#212121] shadow-[0_0_40px_rgba(45,45,45,0.12)]"
      style={{ fontFamily: 'Roboto, system-ui, -apple-system, "Segoe UI", sans-serif' }}
    >
      {/* чек-лист */}
      <div className="flex items-center gap-3">
        <Chevron />
        <DoubleCheck />
        <span className="text-[15px] font-medium">Подготовка презентации</span>
      </div>

      <div className="mt-4 flex items-center gap-3 pl-6">
        <span className="text-[12px] text-[#616161]">50%</span>
        <span className="relative h-1 flex-1 rounded-full bg-[#e1bee7]">
          <span className="absolute inset-y-0 left-0 w-1/2 rounded-full" style={{ background: PURPLE }} />
        </span>
        <span className="text-[12px] text-[#616161]">
          <span className="text-[#43a047]">2</span>/4
        </span>
        <OutlineButton>Скрыть отмеченные</OutlineButton>
      </div>

      <ul className="mt-3 space-y-3 pl-6">
        {ITEMS.map(([text, done]) => (
          <li key={text} className="flex items-center gap-4 text-[15px]">
            <span
              className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[2px]"
              style={done ? { background: PURPLE } : { border: '2px solid #424242' }}
            >
              {done && <Tick />}
            </span>
            <span className={done ? 'text-[#757575]' : 'text-[#212121]'}>{text}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pl-6">
        <OutlineButton>Добавить пункт</OutlineButton>
      </div>

      {/* связи */}
      <div className="mt-4 flex items-center gap-3">
        <Chevron />
        <RelationIcon />
        <span className="text-[15px] font-medium">Связи</span>
        <span className="ml-auto flex items-center gap-4">
          <FilterIcon />
          <span className="flex h-7 overflow-hidden rounded-[4px] shadow-[0_2px_4px_rgba(0,0,0,0.2)]" style={{ background: PURPLE }}>
            {[<Clock key="c" />, <Forward key="f" />, <Tick key="t" size={16} />].map((icon, i) => (
              <span key={i} className="flex w-[39px] items-center justify-center border-l border-white/25 text-white first:border-l-0">
                {icon}
              </span>
            ))}
          </span>
        </span>
      </div>
      <div className="ml-6 mt-3 h-px bg-[#e0e0e0]" />


      <div className="mt-4 flex items-center justify-between pl-6">
        <span className="text-[15px] font-medium">Дочерние карточки</span>
        <span className="inline-flex h-9 items-center gap-3 rounded-[4px] border border-[#bdbdbd] px-3.5 text-[15px]">
          Список
          <svg width="10" height="6" viewBox="0 0 10 6">
            <path d="M0 0h10L5 6z" fill="#616161" />
          </svg>
        </span>
      </div>

      <div className="relative ml-6 mt-2.5 flex h-11 items-center rounded-[4px] border border-[#e0e0e0] px-2.5">
        <span className="absolute left-2 top-0 h-[3px] w-12 rounded-b-full bg-[#f8bbd0]" />
        <span className="text-[15px]">Подготовить дизайн слайдов</span>
        <span className="ml-auto flex items-center gap-2.5 text-[#9e9e9e]">
          <span className="inline-flex items-center gap-1 text-[13px]">
            <TagIcon /> 1
          </span>
          <RelationIcon size={16} color="#9e9e9e" />
          <span className="inline-flex h-6 items-center gap-1 rounded-[6px] bg-[#e57373] px-1.5 text-[13px] font-semibold text-white">
            <CalendarIcon /> 20 сент.
          </span>
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#efe9f9] text-[11px] font-semibold leading-none text-[#7d4ccf]">А</span>
          <FolderIcon />
          <Clock color="#757575" />
        </span>
      </div>
      <div className="mt-4 pl-6">
        <OutlineButton>Добавить дочернюю карточку</OutlineButton>
      </div>
    </div>
  );
}

function OutlineButton({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-8 items-center rounded-[4px] border border-[#bdbdbd] px-2.5 text-[13px] font-medium uppercase tracking-[0.02em] text-[#212121]">
      {children}
    </span>
  );
}

function Chevron() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#424242" strokeWidth="2.5">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function DoubleCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#212121" strokeWidth="2">
      <path d="M2 13l4 4L16 7M10 16l1 1L22 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function Tick({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
      <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function RelationIcon({ size = 18, color = '#212121' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <circle cx="12" cy="5" r="2.6" />
      <circle cx="5" cy="19" r="2.6" />
      <circle cx="19" cy="19" r="2.6" />
      <path d="M11 7h2v4l5.5 5.5-1.4 1.4L12 12.8l-5.1 5.1-1.4-1.4L11 11z" />
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="#616161">
      <path d="M3 6h18v2H3zM6 11h12v2H6zM10 16h4v2h-4z" />
    </svg>
  );
}
function Clock({ color = '#fff' }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" strokeLinecap="round" />
    </svg>
  );
}
function Forward() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#fff">
      <path d="M4 6l8 6-8 6zM12 6l8 6-8 6z" />
    </svg>
  );
}
function TagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#9e9e9e">
      <path d="M3 7a2 2 0 012-2h10l6 7-6 7H5a2 2 0 01-2-2z" />
    </svg>
  );
}
function CalendarIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
      <path d="M7 2h2v2h6V2h2v2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2zM5 10v10h14V10zm2 2h5v5H7z" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24">
      <path d="M3 6.5A1.5 1.5 0 014.5 5h4.2l2 2h8.8A1.5 1.5 0 0121 8.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z" fill="#42a5f5" />
    </svg>
  );
}
