import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Tpl {
  icon: string;
  title: string;
  description: string;
  meta: string;
  tone: 'violet' | 'blue' | 'green' | 'orange';
  recommended?: boolean;
}

const TPLS: Tpl[] = [
  {
    icon: 'Scale',
    title: 'Регламент процесса',
    description: 'Зоны ответственности, шаги и контрольные точки для повторяющейся работы',
    meta: '8 разделов',
    tone: 'violet',
    recommended: true,
  },
  {
    icon: 'Mic',
    title: 'Протокол встречи',
    description: 'Повестка, решения, ответственные и сроки следующих шагов',
    meta: '5 разделов',
    tone: 'blue',
  },
  {
    icon: 'ClipboardList',
    title: 'Техническое задание',
    description: 'Цели, требования, критерии приёмки и риски проекта',
    meta: '12 разделов',
    tone: 'orange',
  },
  {
    icon: 'Target',
    title: 'OKR на квартал',
    description: 'Цели команды, ключевые результаты и метрики прогресса',
    meta: '4 раздела',
    tone: 'green',
  },
  {
    icon: 'Sparkles',
    title: 'Онбординг сотрудника',
    description: 'Доступы, знакомство с командой и план первых двух недель',
    meta: '7 разделов',
    tone: 'violet',
  },
  {
    icon: 'HelpCircle',
    title: 'FAQ для клиентов',
    description: 'Частые вопросы, типовые ответы и ссылки на подробные инструкции',
    meta: '15 разделов',
    tone: 'blue',
  },
];

const TONE_BG: Record<Tpl['tone'], string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-green-700',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

/**
 * Mock галереи шаблонов документов: 6 типовых шаблонов с иконкой, описанием и
 * счётчиком разделов. Тон: «не начинай с пустого листа — возьми шаблон и
 * адаптируй под команду».
 */
export function TemplateGalleryMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      {/* window chrome */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Шаблоны документов</span>
          <span>42 готовых шаблона</span>
        </div>
      </div>

      {/* filters */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-page) px-3 py-2">
        {[
          { label: 'Все', active: true, count: 42 },
          { label: 'Команда', count: 14 },
          { label: 'HR', count: 9 },
          { label: 'Продукт', count: 11 },
          { label: 'Поддержка', count: 6 },
          { label: 'Клиенты', count: 2 },
        ].map((f) => (
          <span
            key={f.label}
            className={cn(
              'inline-flex h-6 items-center gap-1 rounded-full px-2 text-[10px]',
              f.active
                ? 'bg-(--color-action-primary-soft) font-medium text-(--color-text-accent)'
                : 'text-(--color-text-secondary)',
            )}
          >
            {f.label}
            <span className="rounded-full bg-(--color-neutral-200) px-1 text-[9px] text-(--color-text-primary)">
              {f.count}
            </span>
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-4 md:grid-cols-3 md:gap-3 md:p-5">
        {TPLS.map((t, i) => (
          <div
            key={i}
            className={cn(
              'group flex flex-col gap-2 rounded-(--radius-xl) border bg-(--color-surface-page) p-3',
              t.recommended
                ? 'border-(--color-action-primary)/40 shadow-sm'
                : 'border-(--color-border-default)',
            )}
          >
            <div className="flex items-start gap-2">
              <span
                className={cn(
                  'inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-(--radius-xl)',
                  TONE_BG[t.tone],
                )}
              >
                <Icon name={t.icon} className="h-4 w-4" strokeWidth={2} />
              </span>
              {t.recommended && (
                <span className="ml-auto inline-flex h-4 shrink-0 items-center rounded-full bg-(--color-action-primary) px-1.5 text-[9px] font-medium text-white">
                  Популярный
                </span>
              )}
            </div>
            <div className="text-[11.5px] font-semibold leading-tight text-(--color-text-primary)">
              {t.title}
            </div>
            <div className="text-[10.5px] leading-snug text-(--color-text-secondary)">
              {t.description}
            </div>
            <div className="mt-auto flex items-center justify-between text-[10px] text-(--color-text-secondary)">
              <span className="inline-flex items-center gap-1">
                <Icon name="LayoutTemplate" className="h-3 w-3" strokeWidth={2} />
                {t.meta}
              </span>
              <span className="inline-flex items-center gap-0.5 font-medium text-(--color-text-accent)">
                Использовать
                <Icon name="ArrowUpRight" className="h-3 w-3" strokeWidth={2.5} />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
