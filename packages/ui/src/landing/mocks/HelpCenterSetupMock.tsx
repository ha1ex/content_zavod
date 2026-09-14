import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface SettingRow {
  icon: string;
  label: string;
  hint: string;
  active?: boolean;
}

const SETTINGS: SettingRow[] = [
  { icon: 'Settings', label: 'Общие настройки', hint: 'Название и участники' },
  {
    icon: 'LifeBuoy',
    label: 'Справочный центр',
    hint: 'Портал с материалами и заявками',
    active: true,
  },
  { icon: 'Users', label: 'Роли и доступы', hint: 'Кто что видит в пространстве' },
];

/**
 * Создание Справочного центра в настройках пространства Kaiten: список настроек
 * с выделенным пунктом «Справочный центр» и строкой модуля «Служба поддержки»
 * с тумблером и условием по тарифам. Иллюстрирует блок для действующих клиентов
 * «Уже работаете в Кайтен?».
 */
export function HelpCenterSetupMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative w-full overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-3xl)',
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
          <span className="font-medium text-(--color-text-primary)">Настройки пространства</span>
        </div>
      </div>

      <div className="bg-(--color-surface-page) p-4">
        <div className="space-y-1.5">
          {SETTINGS.map((s) => (
            <div
              key={s.label}
              className={cn(
                // Без обводок: активный пункт держится лиловой заливкой,
                // остальные — светло-серой.
                'flex items-center gap-2.5 rounded-(--radius-lg) px-3 py-2.5',
                s.active
                  ? 'bg-(--color-action-primary-soft)'
                  : 'bg-(--color-surface-section)',
              )}
            >
              <span
                className={cn(
                  'inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-(--radius-lg)',
                  s.active
                    ? 'bg-(--color-surface-card) text-(--color-text-accent)'
                    : 'bg-(--color-surface-section) text-(--color-text-secondary)',
                )}
              >
                <Icon name={s.icon} className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <div className="min-w-0">
                <div
                  className={cn(
                    'truncate text-[11.5px] font-semibold leading-tight',
                    s.active ? 'text-(--color-text-accent)' : 'text-(--color-text-primary)',
                  )}
                >
                  {s.label}
                </div>
                <div className="truncate text-[10px] text-(--color-text-secondary)">{s.hint}</div>
              </div>
              {s.active && (
                <span className="ml-auto shrink-0 rounded-(--radius-lg) bg-(--color-action-primary) px-2.5 py-1.5 text-[10px] font-semibold text-(--color-text-inverse)">
                  Создать
                </span>
              )}
            </div>
          ))}
        </div>

        {/* модуль Службы поддержки */}
        <div className="mt-3 rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-section) p-3">
          <div className="flex items-center gap-2.5">
            <span className="relative inline-flex h-4 w-7 shrink-0 rounded-full bg-(--color-action-primary)">
              <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-(--color-surface-card)" />
            </span>
            <span className="truncate text-[11.5px] font-semibold text-(--color-text-primary)">
              Модуль «Служба поддержки»
            </span>
          </div>
          <div className="mt-1.5 text-[10px] leading-snug text-(--color-text-secondary)">
            Нужен, чтобы принимать заявки из портала. На тарифах «Стандарт» и «Бизнес» — один из
            модулей на выбор, на «Корпорации» уже включен
          </div>
        </div>
      </div>
    </div>
  );
}
