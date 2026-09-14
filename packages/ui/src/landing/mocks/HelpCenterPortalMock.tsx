import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Section {
  /** Эмодзи раздела — так разделы помечены в самом портале. */
  emoji: string;
  label: string;
  active?: boolean;
}

const SECTIONS: Section[] = [
  { emoji: '🏠', label: 'Главная страница', active: true },
  { emoji: '📝', label: 'Инструкции' },
  { emoji: '❓', label: 'Ответы на частые вопросы' },
  { emoji: '🔖', label: 'Новости компании' },
  { emoji: '📋', label: 'Регламенты компании' },
];

const MATERIALS: Array<{ icon: string; title: string; description: string; muted?: boolean }> = [
  {
    icon: 'Bell',
    title: 'Настройка уведомлений',
    description: 'Как настроить оповещения на почту и в мессенджеры',
  },
  {
    icon: 'ChartLine',
    title: 'Отчеты\nи аналитика',
    description: 'Обзор встроенных отчетов и что они показывают',
  },
  {
    icon: 'Users',
    title: 'Группы пользователей',
    description: 'Управление доступами и правами через группы',
  },
];

interface HelpCenterPortalMockProps {
  /**
   * 'full' (дефолт) — карточки материалов с описаниями и плашка «Не нашли ответ».
   * 'compact' — та же главная портала, но вполовину ниже: у карточек только
   * иконка и название, плашки нет. Для узких слотов (правая колонка CTA),
   * где полный мок вытягивается по высоте из-за переноса текста в колонках.
   */
  variant?: 'full' | 'compact';
}

/**
 * Главная страница Справочного центра компании: шапка портала с логотипом,
 * поисковой строкой и кнопкой «Создать заявку», слева структура разделов,
 * справа подборка важных материалов. Сигнатурный визуал первого экрана —
 * «портал помощи вашей компании, собранный в Кайтене».
 */
export function HelpCenterPortalMock({ variant = 'full' }: HelpCenterPortalMockProps = {}) {
  const compact = variant === 'compact';
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
        // Полный вариант оборачивается снаружи в `w-max` и масштабируется под
        // колонку: без фиксированной ширины сетка растягивается по max-content
        // и мок ужимается вдвое. Компактный остаётся текучим — он стоит
        // в узком слоте градиентного CTA без масштабирования.
        compact ? 'w-full' : 'w-[576px]',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_0_40px_rgba(45,45,45,0.12)]',
      )}
    >
      {/* window-chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Справочный центр</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            help.company.ru
          </span>
        </div>
      </div>

      {/*
        Шапка повторяет колонки тела портала, поэтому левый край поисковой
        строки встаёт ровно на вертикальный разделитель под ней: логотип
        занимает колонку разделов, поиск открывает колонку контента.
      */}
      <div className="grid grid-cols-[160px_1fr] items-center border-b border-(--color-border-default) bg-(--color-surface-page) py-3 md:grid-cols-[136px_1fr]">
        <div className="px-3">
          <span className="inline-flex h-7 items-center rounded-(--radius-lg) bg-(--color-action-primary-soft) px-2 text-[9px] font-semibold text-(--color-text-accent)">
            ВАШ ЛОГОТИП
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-2 pr-3">
          <div className="flex w-72 min-w-0 shrink items-center gap-1.5 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-section) px-2.5 py-1.5">
            <Icon name="Search" className="h-3.5 w-3.5 text-(--color-text-secondary)" strokeWidth={2} />
            <span className="truncate text-[11px] text-(--color-text-secondary)">
              Введите поисковый запрос
            </span>
          </div>
          <span className="ml-auto hidden shrink-0 rounded-(--radius-lg) bg-(--color-action-primary) px-2.5 py-1.5 text-[10px] font-semibold text-(--color-text-inverse) sm:inline-block">
            Создать заявку
          </span>
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-neutral-200) text-[10px] font-medium text-(--color-text-secondary)">
            АП
          </span>
        </div>
      </div>

      {/*
        На мобилке колонка разделов шире: мок целиком масштабируется вниз,
        и в 120px названия обрезались до «Инс…» / «Отв…».
      */}
      <div className="grid grid-cols-[160px_1fr] md:grid-cols-[136px_1fr]">
        {/* структура разделов */}
        <div className="space-y-0.5 border-r border-(--color-border-default) bg-(--color-surface-section) p-3">
          <div className="mb-2 px-2 text-[9px] font-semibold uppercase tracking-wide text-(--color-text-secondary)">
            Разделы
          </div>
          {SECTIONS.map((s) => (
            <div
              key={s.label}
              className={cn(
                'flex items-center gap-1.5 rounded-(--radius-lg) px-2 py-1.5 text-[11px]',
                s.active
                  ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                  : 'text-(--color-text-primary)',
              )}
            >
              <span className="w-3.5 shrink-0 text-[11px] leading-none">{s.emoji}</span>
              <span className="truncate">{s.label}</span>
            </div>
          ))}
        </div>

        {/* подборка материалов */}
        <div className={cn('bg-(--color-surface-page)', compact ? 'p-4' : 'p-4 md:p-5')}>
          <div className="text-[15px] font-semibold text-(--color-text-primary)">Главная страница</div>
          <p
            className={cn(
              'mt-1 text-(--color-text-secondary)',
              compact ? 'text-[10px]' : 'text-[11.5px]',
            )}
          >
            {compact
              ? 'Подборка важных материалов'
              : 'Подборка важных материалов для тех, кто только начинает работать с сервисом'}
          </p>

          <div className={cn('grid gap-2.5 sm:grid-cols-3', compact ? 'mt-2.5' : 'mt-3.5')}>
            {MATERIALS.map((m) => (
              <div
                key={m.title}
                className={cn(
                  'rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-card)',
                  compact ? 'p-2.5' : 'p-3',
                  m.muted && 'opacity-60',
                )}
              >
                <span
                  className={cn(
                    'inline-flex items-center justify-center rounded-(--radius-lg) bg-(--color-action-primary-soft) text-(--color-text-accent)',
                    compact ? 'h-7 w-7' : 'h-8 w-8',
                  )}
                >
                  <Icon name={m.icon} className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} strokeWidth={2} />
                </span>
                <div
                  className={cn(
                    // whitespace-pre-line: перенос строки в title задаётся 

                    'whitespace-pre-line font-semibold leading-tight text-(--color-text-primary)',
                    compact ? 'mt-1.5 text-[10px]' : 'mt-2 text-[11.5px]',
                  )}
                >
                  {m.title}
                </div>
                {!compact && (
                  <div className="mt-1 text-[10px] leading-snug text-(--color-text-secondary)">
                    {m.description}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* плашка «не нашли ответ» */}
          <div
            className={cn(
              'mt-3.5 flex items-center gap-3 rounded-(--radius-xl) bg-(--color-action-primary-soft) px-3.5 py-3',
              compact && 'hidden',
            )}
          >
            <div className="min-w-0">
              <div className="text-[11.5px] font-semibold text-(--color-text-primary)">
                Не нашли ответ на свой вопрос?
              </div>
              <div className="text-[10px] text-(--color-text-secondary)">
                Создайте заявку — поможем разобраться
              </div>
            </div>
            <span className="ml-auto shrink-0 rounded-(--radius-lg) bg-(--color-action-primary) px-2.5 py-1.5 text-[10px] font-semibold text-(--color-text-inverse)">
              Создать заявку
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
