import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Field {
  label: string;
  value: string;
  /** Поле-выпадающий список (со стрелкой) или обычный ввод. */
  select?: boolean;
}

const EVENT: Field[] = [{ label: 'Событие', value: 'Карточка перемещена или создана', select: true }];

const CONDITION: Field[] = [
  { label: 'Условие', value: 'Новое местоположение карточки', select: true },
  { label: 'Доска *', value: 'Текущие задачи', select: true },
  { label: 'Колонка', value: 'Любая', select: true },
  { label: 'Дорожка', value: 'Основные', select: true },
];

/** Поле конструктора с «плавающей» подписью в вырезе рамки. */
function RuleField({ label, value, select }: Field) {
  return (
    <div className="relative rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-card) px-3 py-3">
      {/* Подпись «в вырезе» рамки — фон совпадает с подложкой мока (белой). */}
      <span className="absolute -top-1.5 left-2.5 bg-(--color-surface-card) px-1 text-[10px] leading-none text-(--color-text-secondary)">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className="flex-1 truncate text-[13px] text-(--color-text-primary)">{value}</span>
        {select ? (
          <Icon
            name="ChevronDown"
            aria-hidden
            className="h-3.5 w-3.5 shrink-0 text-(--color-text-secondary)"
            strokeWidth={2}
          />
        ) : null}
      </div>
    </div>
  );
}

function RuleCard({ children }: { children: React.ReactNode }) {
  return (
    /* Группа полей без заливки и рамки — разделяет их только отбивка «и». */
    <div className="space-y-3">{children}</div>
  );
}

function OutlineButton({ icon, children }: { icon: string; children: React.ReactNode }) {
  return (
    <span className="inline-flex h-7 items-center gap-1.5 rounded-(--radius-md) border border-(--color-action-primary) px-2.5 text-[10.5px] font-semibold uppercase leading-none tracking-wide text-(--color-text-accent)">
      <Icon name={icon} aria-hidden className="h-3.5 w-3.5" strokeWidth={2.5} />
      <span className="translate-y-px">{children}</span>
    </span>
  );
}

/**
 * Конструктор правила автоматизации Kaiten — половина «Когда»: событие-триггер
 * и условие, при котором правило срабатывает. Первый из двух шагов сборки
 * правила «если — то» на лендинге модуля «Автоматизации».
 * Пара — WindowRuleActionMock (`window-rule-action`, половина «Выполнить»).
 */
export function WindowRuleTriggerMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative w-[520px] overflow-hidden rounded-(--radius-xl) lg:rounded-(--radius-2xl)',
        'bg-(--color-surface-card) p-5',
        'shadow-[0_0_40px_-12px_rgba(24,24,27,0.25)]',
      )}
    >
      <div className="mb-3.5 text-center text-[15px] font-semibold text-(--color-text-accent)">Когда</div>

      <RuleCard>
        {EVENT.map((f) => (
          <RuleField key={f.label} {...f} />
        ))}
      </RuleCard>

      <div className="py-2.5 text-center text-[14px] font-semibold text-(--color-text-accent)">и</div>

      <RuleCard>
        {CONDITION.map((f) => (
          <RuleField key={f.label} {...f} />
        ))}
      </RuleCard>

      {/* Обе кнопки в одной строке под условием: сначала «Удалить», затем «+ И ЕСЛИ». */}
      <div className="flex items-center gap-2 pt-3">
        <span className="inline-flex h-7 items-center rounded-(--radius-md) border border-(--color-border-default) px-2.5 text-[10.5px] font-semibold uppercase leading-none tracking-wide text-(--color-text-secondary)">
          <span className="translate-y-px">Удалить</span>
        </span>
        <OutlineButton icon="Plus">И если</OutlineButton>
      </div>
    </div>
  );
}
