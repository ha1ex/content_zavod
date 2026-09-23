import { cn } from '../../primitives/cn';
import { ScaleToFit } from './ScaleToFit';

interface Comment {
  author: string;
  time: string;
  text: React.ReactNode;
  tone: 'amber' | 'gray';
}

const COMMENTS: Comment[] = [
  {
    author: 'Алексей',
    time: '13 февр. 2026 г., 12:53',
    tone: 'amber',
    text: (
      <>
        <Mention>@e_lebedeva</Mention> Зафиксировал, забираю в работу
      </>
    ),
  },
  {
    author: 'Екатерина',
    time: '13 февр. 2026 г., 12:46',
    tone: 'amber',
    text: (
      <>
        <Mention>@a_savin</Mention> Обрати внимание, что изображения формата GIF имеют проблемы с
        загрузкой. Нужно сделать предупреждение об этом в форме.
      </>
    ),
  },
  {
    author: 'Екатерина',
    time: '12 февр. 2026 г., 10:24',
    tone: 'gray',
    text: 'Анна, проблема по вашей заявке «Не могу загрузить изображение» решена. Вы можете проверить, все ли у вас работает, и поставить оценку нашей службе поддержки прямо в письме или на портале Service Desk.',
  },
];

/**
 * Window: модальное окно карточки обращения Service Desk со сплит-видом —
 * слева карточка (техподдержка, описание, файлы, связи), справа панель
 * комментариев с перепиской команды. Экран «Не могу загрузить изображение».
 */
export function WindowTicketModalMock({
  bare = false,
  grayShadow = false,
  card = 'ticket',
}: {
  /** Без собственного ScaleToFit: окно 800px, ужимает внешний MockFit. */
  bare?: boolean;
  /** Серая тень вместо фиолетовой. */
  grayShadow?: boolean;
  /**
   * Содержимое окна. 'ticket' (дефолт) — обращение Service Desk «Не могу загрузить
   * изображение». 'presentation' — карточка «Подготовить презентацию для клиента»
   * с доски «Задачи команды» (параметры, описание, файл, чек-лист, дочерняя карточка).
   */
  card?: 'ticket' | 'presentation';
} = {}) {
  const modal = (
    <div
      aria-hidden
      className={cn(
        'grid w-[800px] grid-cols-[1.35fr_1fr] overflow-hidden rounded-(--radius-3xl)',
        card === 'presentation' ? 'bg-(--color-surface-card)' : 'border border-(--color-border-default) bg-(--color-surface-card)',
        grayShadow ? 'shadow-[0_0_40px_rgba(45,45,45,0.12)]' : 'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.25)]',
      )}
    >
      {card === 'presentation' ? (
        <>
          <PresentationColumn />
          <PresentationComments />
        </>
      ) : (
        <>
      {/* — card column — */}
      <div className="border-r border-(--color-border-default) p-5">
        <h3 className="text-xl font-semibold text-(--color-text-primary)">
          Не могу загрузить изображение
        </h3>
        <div className="mt-1.5 text-sm text-(--color-text-accent) underline underline-offset-2">
          #54670184
        </div>

        {/* toolbar */}
        <div className="mt-3 flex items-center gap-2">
          <TBtn primary>
            <PlusIcon />
          </TBtn>
          <span className="mx-2 h-px flex-1 bg-(--color-border-default)" />
          <TBtn>
            <PlayIcon />
          </TBtn>
          <TPill>ГОТОВО</TPill>
          <TBtn>
            <b className="text-base leading-none">!</b>
          </TBtn>
          <TBtn>
            <ShareIcon />
          </TBtn>
          <TBtn>⋮</TBtn>
        </div>

        {/* support panel */}
        <div className="mt-4 rounded-(--radius-2xl) bg-(--color-blue-12) p-3.5 text-xs">
          <div className="flex items-center gap-2 text-sm font-semibold text-(--color-text-primary)">
            <HeadsetIcon /> Техподдержка
          </div>
          <div className="mt-2 text-(--color-text-primary)">
            Автор: Анна (anna@mail.ru){' '}
            <span className="text-(--color-text-accent) underline underline-offset-2">изменить</span>
          </div>
          <div className="mt-1 text-(--color-text-primary)">
            SLA:{' '}
            <span className="text-(--color-text-accent) underline underline-offset-2">выбрать sla</span>
          </div>
          <div className="mt-2 inline-flex items-center gap-1.5 text-(--color-text-accent)">
            <span className="underline underline-offset-2">
              Добавить дополнительных адресатов для получения уведомлений
            </span>
            <HelpIcon />
          </div>
          <div className="my-2.5 h-px bg-(--color-blue-100)/20" />
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 font-medium text-(--color-blue-100)">
              <ChatIcon /> Новые комментарии в заявке
            </span>
            <span className="font-medium text-(--color-blue-100)">ОТМЕТИТЬ КАК ПРОЧИТАННОЕ</span>
          </div>
        </div>

        {/* params */}
        <dl className="mt-4 space-y-2.5">
          <Row label="Расположение">
            <span className="inline-flex items-center gap-2">
              <span className="text-(--color-text-accent) underline underline-offset-2">
                Спринт / В работе (Срочно)
              </span>
              <SearchIcon />
            </span>
          </Row>
          <Row label="Тип">
            <span className="inline-flex items-center gap-2 rounded-full bg-(--color-surface-section) px-2.5 py-1 text-xs text-(--color-text-primary)">
              <span className="text-(--color-red-100)">✳</span> Card
            </span>
          </Row>
          <Row label="Участники">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-surface-section) py-0.5 pl-0.5 pr-2.5 text-xs">
                <span className="h-5 w-5 rounded-full bg-(--color-action-primary)/70" /> Ответственный
              </span>
              <span className="h-5 w-5 rounded-full bg-(--color-neutral-300)" />
              <span className="text-lg text-(--color-text-secondary)">+</span>
            </span>
          </Row>
          <Row label="Срок">
            <span className="text-(--color-text-primary) underline underline-offset-2">22 февр.</span>
          </Row>
        </dl>

        {/* description */}
        <Section icon={<LinesIcon />} title="Описание" />
        <p className="mt-2 text-[13px] text-(--color-text-primary)">
          Не могу загрузить изображение в статью. Пишет, что файл не подходит под стандарты.
        </p>

        {/* files */}
        <Section icon={<ClipIcon />} title="Файлы" />
        <div className="mt-3 flex items-center gap-3">
          <span className="h-12 w-16 overflow-hidden rounded-md border border-(--color-border-default)">
            <svg width="64" height="48" viewBox="0 0 64 48" aria-hidden>
              <rect width="64" height="48" fill="white" />
              <polygon points="2,44 2,40 16,38 31,36 46,34 62,32 62,44" fill="var(--color-green-100)" />
              <polygon points="2,34 16,30 31,27 46,24 62,21 62,32 46,34 31,36 16,38 2,40" fill="var(--color-blue-100)" />
              <polygon points="2,28 16,23 31,18 46,14 62,10 62,21 46,24 31,27 16,30 2,34" fill="var(--color-action-primary)" />
            </svg>
          </span>
          <div>
            <div className="text-sm text-(--color-text-accent) underline underline-offset-2">
              накопительная диаграмма
            </div>
            <div className="text-xs text-(--color-text-secondary)">Добавлен 3 минуты назад</div>
          </div>
        </div>

        {/* relations */}
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 text-sm font-medium text-(--color-text-primary)">
            <RelationIcon /> Связи
          </span>
          <RelationToggle />
        </div>
        <div className="mt-3 flex items-center justify-between text-[13px] text-(--color-text-secondary)">
          Дочерние карточки
          <span className="inline-flex items-center gap-1 rounded-(--radius-lg) border border-(--color-border-default) px-2 py-1 text-xs">
            Список <CaretIcon />
          </span>
        </div>
        <ChildCard title="Исправить баг при добавлении GIF" />
      </div>

      {/* — comments column — */}
      <CommentsColumn withTemplate />
        </>
      )}
    </div>
  );
  if (bare) return modal;
  return (
    <ScaleToFit designWidth={800} className="mx-auto w-full max-w-[800px]">
      {modal}
    </ScaleToFit>
  );
}

/* ——— карточка «Подготовить презентацию для клиента» ——— */
const PRESENTATION_CHECKLIST: [string, boolean][] = [
  ['Изучить бриф и задачи клиента', true],
  ['Собрать структуру презентации', true],
  ['Согласовать содержание с руководителем', false],
  ['Прикрепить финальный PDF и исходник', false],
];

function PresentationColumn() {
  return (
    <div className="border-r border-(--color-border-default) py-5 pl-7 pr-5">
      <h3 className="text-xl font-normal leading-snug text-(--color-text-primary)">
        Подготовить презентацию для клиента
      </h3>
      <div className="mt-1.5 text-sm text-(--color-text-secondary)">
        <span className="text-(--color-text-accent) underline underline-offset-2">#70692833</span> Заказчик{' '}
        <span className="text-(--color-text-primary) underline underline-offset-2">Teamlead</span>
      </div>
      {/* когда карточку завели и когда последний раз двигали — как в шапке карточки продукта */}
      <div className="mt-1.5 flex items-center gap-4 text-[13px] text-(--color-text-secondary)">
        <span className="inline-flex items-center gap-1.5">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7.5V12l3 2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Создана 7 дней назад
        </span>
      </div>

      {/* toolbar */}
      <div className="relative mt-3 flex items-center gap-2 [&>span:not(:first-child)]:relative">
        {/* серая линия по центру за кнопками, как в продукте */}
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-(--color-border-default)" />
        <TBtn primary>
          <PlusIcon />
        </TBtn>
        <span className="mx-2 flex-1" />
        <TBtn>
          <PlayIcon />
        </TBtn>
        <TPill>НА СОГЛАСОВАНИИ</TPill>
        <TBtn>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="10.4" y="3.3" width="3.2" height="11.4" rx="1.6" /><circle cx="12" cy="18.9" r="1.85" /></svg>
        </TBtn>
        <TBtn>
          <ShareIcon />
        </TBtn>
        <TBtn>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5.5" r="1.9" /><circle cx="12" cy="12" r="1.9" /><circle cx="12" cy="18.5" r="1.9" /></svg>
        </TBtn>
      </div>

      {/* params */}
      <dl className="mt-4 space-y-2.5">
        <Row label="Расположение">
          <span className="inline-flex items-center gap-2">
            <span className="text-(--color-text-primary) underline underline-offset-2">Задачи команды / В работе</span>
            <SearchIcon />
          </span>
        </Row>
        <Row label="Тип">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-surface-section) px-2.5 py-1 text-xs text-(--color-text-primary)">
            <FolderIcon /> Материал
          </span>
        </Row>
        <Row label="Участники">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-(--color-surface-section) py-0.5 pl-0.5 pr-2.5 text-xs">
              <img src="/brand/avatars/woman-blonde.png" alt="" className="h-5 w-5 rounded-full object-cover" /> Ответственный
            </span>
            <img src="/brand/avatars/man-orange.png" alt="" className="h-5 w-5 rounded-full object-cover" />
            <img src="/brand/avatars/woman-teal.png" alt="" className="h-5 w-5 rounded-full object-cover" />
            <span className="text-lg text-(--color-text-secondary)">+</span>
          </span>
        </Row>
        <Row label="Срок">
          <span className="text-(--color-text-primary) underline underline-offset-2">сегодня</span>
        </Row>
        <Row label="Метки">
          <span className="inline-flex items-center rounded-full bg-[#f8bbd0] px-2.5 py-0.5 text-xs text-[#424242]">Маркетинг</span>
        </Row>
      </dl>

      {/* description */}
      <Section icon={<LinesIcon />} title="Описание" chevron />
      <p className="mt-2 text-[13px] leading-snug text-(--color-text-primary)">
        Подготовить презентацию услуг для встречи с новым клиентом: как команда организует работу
        и контролирует сроки
      </p>

      {/* files */}
      <Section icon={<ClipIcon />} title="Файлы" chevron />
      <div className="mt-2.5 flex items-center gap-3">
        <span className="inline-flex h-10 w-12 shrink-0 items-center justify-center rounded-md bg-(--color-surface-section) text-xs font-semibold text-(--color-text-secondary)">
          MD
        </span>
        <div className="min-w-0">
          <div className="text-[13px] text-(--color-text-primary) underline underline-offset-2">
            Бриф — презентация для клиента.md (872 B)
          </div>
          <div className="text-[11px] text-(--color-text-secondary)">Добавлен 17 сент. 2026 г., 11:48, Teamlead</div>
        </div>
      </div>

      {/* checklist */}
      <Section icon={<CheckListIcon />} title="Подготовка презентации" chevron />
      <div className="mt-2 flex items-center gap-2.5">
        <span className="text-[10px] text-[#616161]">50%</span>
        <span className="relative h-1 flex-1 rounded-full bg-[#e1bee7]">
          <span className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[#9c27b0]" />
        </span>
        <span className="text-[10px] text-[#616161]">
          <span className="text-[#43a047]">2</span>/4
        </span>
        <span className="inline-flex h-6 items-center rounded-[4px] border border-[#bdbdbd] px-2 text-[10px] font-medium uppercase tracking-[0.02em] text-[#212121]">
          Скрыть отмеченные
        </span>
      </div>
      <ul className="mt-2 space-y-1.5">
        {PRESENTATION_CHECKLIST.map(([text, done]) => (
          <li key={text} className="flex items-center gap-2 text-[12.5px] text-(--color-text-primary)">
            <span
              className={cn(
                'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-[4px]',
                done ? 'bg-(--color-action-primary) text-white' : 'border border-(--color-neutral-400)',
              )}
            >
              {done && <TickIcon />}
            </span>
            {text}
          </li>
        ))}
      </ul>

      {/* relations — как в продукте: шеврон, иконка связей, фильтр и фиолетовая группа кнопок */}
      <div className="-ml-[13px] mt-4 flex items-center gap-2">
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#424242" strokeWidth="2.5" style={{ marginRight: -5 }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#212121">
          <circle cx="12" cy="5" r="2.6" />
          <circle cx="5" cy="19" r="2.6" />
          <circle cx="19" cy="19" r="2.6" />
          <path d="M11 7h2v4l5.5 5.5-1.4 1.4L12 12.8l-5.1 5.1-1.4-1.4L11 11z" />
        </svg>
        <span className="text-[13px] font-medium text-(--color-text-primary)">Связи</span>
        <span className="ml-auto flex items-center gap-3">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#616161">
            <path d="M3 6h18v2H3zM6 11h12v2H6zM10 16h4v2h-4z" />
          </svg>
          <span className="flex h-6 overflow-hidden rounded-[4px] bg-[#9c27b0] shadow-[0_2px_4px_rgba(0,0,0,0.2)]">
            <span className="flex w-8 items-center justify-center text-white">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" strokeLinecap="round" />
              </svg>
            </span>
            <span className="flex w-8 items-center justify-center border-l border-white/25">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
                <path d="M4 6l8 6-8 6zM12 6l8 6-8 6z" />
              </svg>
            </span>
            <span className="flex w-8 items-center justify-center border-l border-white/25">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
        </span>
      </div>
      <div className="mt-2.5 flex items-center justify-between">
        <span className="text-[13px] text-(--color-text-secondary)">Дочерние карточки</span>
        <span className="inline-flex h-6 items-center gap-2 rounded-[4px] border border-[#bdbdbd] px-2.5 text-xs text-[#212121]">
          Список
          <svg width="8" height="5" viewBox="0 0 10 6"><path d="M0 0h10L5 6z" fill="#616161" /></svg>
        </span>
      </div>
      {/* дочерняя карточка — как строка в продукте: метки, связи, срок, исполнитель, тип и время */}
      <div className="relative mt-2 flex h-8 items-center rounded-[4px] border border-[#e0e0e0] px-2.5">
        <span className="text-xs text-(--color-text-primary)">Подготовить дизайн слайдов</span>
        <span className="ml-auto flex items-center gap-2 text-[11px] text-[#9e9e9e]">
          <span className="inline-flex items-center gap-0.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#9e9e9e"><path d="M3 7a2 2 0 012-2h10l6 7-6 7H5a2 2 0 01-2-2z" /></svg> 1
          </span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#9e9e9e">
            <circle cx="12" cy="5" r="2.6" /><circle cx="5" cy="19" r="2.6" /><circle cx="19" cy="19" r="2.6" />
            <path d="M11 7h2v4l5.5 5.5-1.4 1.4L12 12.8l-5.1 5.1-1.4-1.4L11 11z" />
          </svg>
          <span className="inline-flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#9e9e9e"><path d="M7 2h2v2h6V2h2v2h2a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h2zM5 10v10h14V10zm2 2h5v5H7z" /></svg> 24 сент.
          </span>
          <img src="/brand/avatars/man-orange.png" alt="" className="h-[18px] w-[18px] rounded-full object-cover" />
          <svg width="15" height="15" viewBox="0 0 24 24"><path d="M3 6.5A1.5 1.5 0 014.5 5h4.2l2 2h8.8A1.5 1.5 0 0121 8.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z" fill="#42a5f5" /></svg>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#757575" strokeWidth="2"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" strokeLinecap="round" /></svg>
        </span>
      </div>
    </div>
  );
}

function PresentationComments() {
  return (
    <div className="flex flex-col bg-(--color-surface-card) p-4">
      <div className="flex-1 py-4">
        {/* вкладки панели, как в продукте: «Комментарии» активна, рядом «Спросить ИИ» */}
        <div className="-mt-4 mb-3 grid grid-cols-2 border-b border-(--color-border-default) text-[11px] font-medium uppercase tracking-[0.02em]">
          <span className="relative flex h-10 items-center justify-center gap-1.5 text-[#9c27b0]">
            <CommentTabIcon /> Комментарии
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-[#9c27b0]" />
          </span>
          <span className="flex h-10 items-center justify-center gap-1.5 text-(--color-text-secondary)">
            <SparkleIcon /> Спросить ИИ
          </span>
        </div>
        <div className="mb-3 flex items-center justify-end gap-3 text-(--color-text-secondary)">
          <VideoIcon />
          <span className="inline-flex h-7 items-center gap-1.5 rounded-[4px] bg-[#eeeeee] px-2.5 text-xs text-(--color-text-primary)">
            Все
            <svg width="8" height="5" viewBox="0 0 10 6"><path d="M0 0h10L5 6z" fill="#424242" /></svg>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#efe9f9] text-[11px] font-semibold leading-none text-[#7d4ccf]">
            З
          </span>
          <div className="flex h-8 flex-1 items-center rounded-[6px] border border-(--color-border-default) px-3 text-sm text-(--color-text-secondary)">
          
          Напишите комментарий
        </div>
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border border-(--color-border-default) text-[#757575]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3zm5-3a5 5 0 01-10 0H5a7 7 0 006 6.9V21h2v-3.1A7 7 0 0019 11z" />
            </svg>
          </span>
        </div>
        <div className="mt-4 space-y-3.5">
          {PRESENTATION_COMMENTS.map((c, i) => (
            <PresentationComment key={i} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface PresentationCommentData {
  initials: string;
  color: string;
  author: string;
  time: string;
  text: React.ReactNode;
  tone?: 'amber' | 'gray';
  reaction?: string;
}

const PRESENTATION_COMMENTS: PresentationCommentData[] = [
  {
    initials: 'АМ',
    color: '#9fc3e8',
    author: 'Анна Морозова',
    time: '21 сент. 2026 г., 10:12',
    tone: 'amber',
    text: (
      <>
        <Mention>@teamlead</Mention> Структуру собрала, примеры проектов добавила. Посмотри перед согласованием?
      </>
    ),
  },
  {
    initials: 'АК',
    color: '#f4a37b',
    author: 'Артем Куликов',
    time: '20 сент. 2026 г., 16:40',
    text: 'Дизайн слайдов веду в дочерней карточке, черновик покажу сегодня',
    reaction: '👍',
  },
  {
    initials: 'TL',
    color: '#8fd3c7',
    author: 'Teamlead',
    time: '18 сент. 2026 г., 09:30',
    text: 'Клиент просил кейс с переездом из Excel — добавьте его в примеры',
  },
  {
    initials: 'TL',
    color: '#8fd3c7',
    author: 'Teamlead',
    time: '17 сент. 2026 г., 11:48',
    text: (
      <>
        Прикрепил(а) <span className="underline underline-offset-2">Бриф — презентация для клиента.md</span> (872 B)
      </>
    ),
  },
];

function PresentationComment({ initials, color, author, time, text, tone = 'gray', reaction }: PresentationCommentData) {
  return (
    <div className="flex gap-2.5">
      <span
        className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold leading-none text-(--color-text-primary)"
        style={{ background: color }}
      >
        {initials}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-[13px] font-semibold text-(--color-text-primary)">{author}</span>
          <span className="text-[10.5px] text-(--color-text-secondary)">{time}</span>
        </div>
        <div
          className={cn(
            'mt-1 rounded-(--radius-xl) px-3 py-2 text-xs leading-snug text-(--color-text-primary)',
            tone === 'amber' ? 'bg-(--color-orange-12)' : 'bg-(--color-surface-section)',
          )}
        >
          {text}
        </div>
        {reaction && (
          <span className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-(--color-surface-section) px-2 py-0.5 text-[11px] text-(--color-text-secondary)">
            {reaction} 2
          </span>
        )}
      </div>
    </div>
  );
}

function VideoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#616161" strokeWidth="2">
      <rect x="3" y="6" width="13" height="12" rx="1.5" />
      <path d="M16 10.5l5-3v9l-5-3z" strokeLinejoin="round" />
    </svg>
  );
}
function CommentTabIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 3h16a2 2 0 012 2v11a2 2 0 01-2 2H7l-4 4V5a2 2 0 011-2zm3 5v2h10V8zm0 4v2h7v-2z" />
    </svg>
  );
}
function SparkleIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#9c27b0">
      <path d="M10 3l1.8 5.2L17 10l-5.2 1.8L10 17l-1.8-5.2L3 10l5.2-1.8zM18 2l.9 2.1L21 5l-2.1.9L18 8l-.9-2.1L15 5l2.1-.9zM18 14l.7 1.6 1.6.7-1.6.7L18 19l-.7-1.6-1.6-.7 1.6-.7z" />
    </svg>
  );
}
function FolderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden>
      <path d="M3 6.5A1.5 1.5 0 014.5 5h4.2l2 2h8.8A1.5 1.5 0 0121 8.5v9a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 17.5z" fill="#42a5f5" />
    </svg>
  );
}
function CheckListIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 12l3 3 6-6M11 15l3 3 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function TickIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
      <path d="M5 12l5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ——— shared blocks ——— */
function CommentsColumn({ withTemplate }: { withTemplate?: boolean }) {
  return (
    <div className="flex flex-col bg-(--color-surface-card) p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-lg font-semibold text-(--color-text-primary)">Комментарии</span>
        <span className="flex items-center gap-3 text-(--color-text-secondary)">
          <ExpandFullIcon />
          <CloseIcon />
        </span>
      </div>
      <div className="flex-1 rounded-(--radius-2xl) border border-(--color-border-default) p-4">
        <div className="mb-3 flex items-center justify-end gap-2 text-(--color-text-secondary)">
          <span className="inline-flex items-center gap-1 rounded-(--radius-lg) border border-(--color-border-default) px-2 py-1 text-xs">
            Все <CaretIcon />
          </span>
          <span className="h-4 w-5 rounded-sm border border-(--color-border-default)" />
          <span className="h-4 w-5 rounded-sm border border-(--color-border-default) bg-(--color-surface-section)" />
          <ExpandArrowsIcon />
        </div>
        <div className="flex items-center gap-2.5 rounded-(--radius-xl) border border-(--color-border-default) px-3 py-2.5 text-sm text-(--color-text-secondary)">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-(--color-surface-section) text-[11px]">
            A
          </span>
          Напишите комментарий
        </div>
        {withTemplate && (
          <div className="mt-2 flex items-center justify-between rounded-(--radius-xl) border border-(--color-border-default) px-3 py-2.5 text-sm text-(--color-text-secondary)">
            Выберите шаблонный ответ <CaretIcon />
          </div>
        )}
        <div className="mt-3 space-y-3">
          {COMMENTS.map((c, i) => (
            <CommentItem key={i} {...c} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentItem({
  author,
  time,
  text,
  tone,
  reactions,
}: Comment & { reactions?: string[] }) {
  return (
    <div className="flex gap-2.5">
      <span className="h-7 w-7 shrink-0 rounded-full bg-(--color-surface-section)" />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="text-sm font-semibold text-(--color-text-primary)">{author}</span>
          <span className="text-[11px] text-(--color-text-secondary)">{time}</span>
        </div>
        <div
          className={cn(
            'mt-1.5 rounded-(--radius-xl) px-3 py-2 text-xs leading-snug text-(--color-text-primary)',
            tone === 'amber' ? 'bg-(--color-orange-12)' : 'bg-(--color-surface-section)',
          )}
        >
          {text}
        </div>
        {reactions && (
          <div className="mt-1.5 flex gap-1.5">
            {reactions.map((r) => (
              <span
                key={r}
                className="inline-flex items-center gap-1 rounded-full bg-(--color-surface-section) px-2 py-0.5 text-xs text-(--color-text-secondary)"
              >
                {r} 1
              </span>
            ))}
          </div>
        )}
        <div className="mt-1.5 flex gap-2 text-xs text-(--color-text-secondary)">
          <span className="underline underline-offset-2">цитировать</span>
          или
          <span className="underline underline-offset-2">ответить</span>
        </div>
      </div>
    </div>
  );
}

function Mention({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-(--color-text-accent)">{children}</span>;
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[110px_1fr] items-center gap-3 text-[13px]">
      <dt className="text-(--color-text-secondary)">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Section({ icon, title, chevron }: { icon: React.ReactNode; title: string; chevron?: boolean }) {
  return (
    // шеврон висит слева от колонки, как в продукте: иконка раздела на линии текста
    <div className={`mt-4 flex items-center gap-2 text-[13px] font-medium text-(--color-text-primary)${chevron ? ' -ml-[13px]' : ''}`}>
      {chevron && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#424242" strokeWidth="2.5" style={{ marginRight: -5 }}>
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      {icon} {title}
    </div>
  );
}

function ChildCard({ title }: { title: string }) {
  return (
    <div className="relative mt-2 overflow-hidden rounded-(--radius-lg) border border-(--color-border-default) px-3 py-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs text-(--color-text-primary)">{title}</span>
        <span className="flex items-center gap-2 text-(--color-text-secondary)">
          <span className="inline-flex items-center gap-0.5 text-xs">
            <ClipIcon /> 1
          </span>
          <span className="inline-flex items-center gap-0.5 text-xs">
            <ChatIcon /> 1
          </span>
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-(--color-surface-section) text-[10px]">
            A
          </span>
          <span className="text-(--color-green-100)">
            <CalIcon />
          </span>
        </span>
      </div>
    </div>
  );
}

function RelationToggle() {
  return (
    <span className="flex items-center gap-2 text-(--color-text-secondary)">
      <FilterIcon />
      <span className="inline-flex overflow-hidden rounded-(--radius-lg)">
        {['◷', '»', '✓'].map((s, i) => (
          <span
            key={i}
            className="flex h-6 w-7 items-center justify-center bg-(--color-action-primary) text-xs text-white"
          >
            {s}
          </span>
        ))}
      </span>
    </span>
  );
}

function TBtn({ children, primary }: { children: React.ReactNode; primary?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-9 w-9 items-center justify-center rounded-full text-(--color-text-primary)',
        primary
          ? 'bg-(--color-action-primary) text-white'
          : 'border border-(--color-border-default) bg-(--color-surface-card)',
      )}
    >
      {children}
    </span>
  );
}
function TPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border border-(--color-border-default) bg-(--color-surface-card) px-4 text-xs font-medium text-(--color-text-primary)">
      <ArrowRightIcon />
      {children}
    </span>
  );
}

/* ——— icons ——— */
function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12h14" strokeLinecap="round" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function ShareIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="18" cy="5" r="2.5" />
      <circle cx="6" cy="12" r="2.5" />
      <circle cx="18" cy="19" r="2.5" />
      <path d="M8.2 10.8l7.6-4.6M8.2 13.2l7.6 4.6" />
    </svg>
  );
}
function HeadsetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-(--color-blue-100)">
      <path d="M4 13v-1a8 8 0 0116 0v1" strokeLinecap="round" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" />
      <rect x="17" y="13" width="4" height="6" rx="1.5" />
    </svg>
  );
}
function HelpIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9.5a2.5 2.5 0 113.5 2.3c-.8.4-1 .9-1 1.7M12 17h.01" strokeLinecap="round" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a8 8 0 01-11.5 7.2L4 20l1-4.5A8 8 0 1121 12z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-(--color-text-secondary)">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4-4" strokeLinecap="round" />
    </svg>
  );
}
function LinesIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h10" strokeLinecap="round" />
    </svg>
  );
}
function ClipIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 11l-8.5 8.5a4 4 0 01-6-6L14 5a2.7 2.7 0 014 4l-8.5 8.5a1.3 1.3 0 01-2-2L14 8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function RelationIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="6" cy="6" r="2" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="18" cy="12" r="2" />
      <path d="M8 6h4a4 4 0 014 4M8 18h4a4 4 0 004-4" strokeLinecap="round" />
    </svg>
  );
}
function FilterIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 5h18l-7 8v5l-4 2v-7z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CalIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}
function CaretIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ExpandFullIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}
function ExpandArrowsIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M8 7L4 12l4 5M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
