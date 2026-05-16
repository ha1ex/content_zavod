import { cn } from '../../primitives/cn';

interface Deal {
  bar: 'violet' | 'orange' | 'blue' | 'green';
  company: string;
  amount: string;
  contact: string;
  nextStep: string;
  warm?: boolean;
  lifted?: boolean;
}

interface Stage {
  name: string;
  count: number;
  total: string;
  deals: Deal[];
}

const STAGES: Stage[] = [
  {
    name: 'Новый лид',
    count: 18,
    total: '4,2 млн ₽',
    deals: [
      {
        bar: 'blue',
        company: 'ООО «Северный ветер»',
        amount: '320 000 ₽',
        contact: 'Анна Соколова · CFO',
        nextStep: 'Звонок · сегодня 15:00',
      },
      {
        bar: 'blue',
        company: 'Pixel Studio',
        amount: '180 000 ₽',
        contact: 'Дмитрий Орлов',
        nextStep: 'Письмо отправлено',
        warm: true,
      },
    ],
  },
  {
    name: 'Квалификация',
    count: 11,
    total: '6,8 млн ₽',
    deals: [
      {
        bar: 'violet',
        company: 'ГК «Энергомост»',
        amount: '1 250 000 ₽',
        contact: 'Игорь Лебедев · COO',
        nextStep: 'Демо · 18 мая 11:00',
        lifted: true,
      },
      {
        bar: 'orange',
        company: 'Меркурий-Логистика',
        amount: '480 000 ₽',
        contact: 'Елена Шарова',
        nextStep: 'КП на согласовании',
      },
    ],
  },
  {
    name: 'Договор',
    count: 6,
    total: '5,1 млн ₽',
    deals: [
      {
        bar: 'orange',
        company: 'Атлант-Девелопмент',
        amount: '2 400 000 ₽',
        contact: 'Сергей Громов',
        nextStep: 'Юристы согласовали',
      },
    ],
  },
  {
    name: 'Оплата',
    count: 9,
    total: '3,3 млн ₽',
    deals: [
      {
        bar: 'green',
        company: 'Bright Coffee',
        amount: '95 000 ₽',
        contact: 'Мария Зайцева',
        nextStep: 'Счёт оплачен · 14 мая',
      },
    ],
  },
];

const BAR_CLASS: Record<Deal['bar'], string> = {
  violet: 'bg-(--color-action-primary)',
  orange: 'bg-(--color-orange-100)',
  blue: 'bg-(--color-blue-100)',
  green: 'bg-(--color-green-100)',
};

/**
 * Mock воронки продаж CRM: 4 стадии Новый лид → Квалификация → Договор → Оплата,
 * у каждой стадии — счётчик сделок и общая сумма pipeline. Карточка сделки —
 * компания, сумма в рублях, контактное лицо, следующий шаг с датой.
 * Подсвеченная карточка — «горячая сделка в работе».
 */
export function SalesFunnelMock() {
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
          <span className="font-medium text-(--color-text-primary)">Воронка · Продажи Q2</span>
          <span>44 сделки</span>
          <span>19,4 млн ₽ в работе</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">
            Канбан · Список · Отчёт
          </span>
        </div>
      </div>

      {/* board */}
      <div className="grid grid-cols-4 gap-2.5 p-4 md:gap-3 md:p-5">
        {STAGES.map((stage) => (
          <div key={stage.name} className="space-y-2.5">
            <div className="space-y-0.5">
              <div className="flex items-center justify-between text-[11px] font-semibold text-(--color-text-primary)">
                <span className="truncate">{stage.name}</span>
                <span className="rounded-full bg-(--color-neutral-200) px-1.5 py-0.5 text-[10px]">
                  {stage.count}
                </span>
              </div>
              <div className="text-[10px] text-(--color-text-secondary)">{stage.total}</div>
            </div>
            {stage.deals.map((d, i) => (
              <div
                key={i}
                className={cn(
                  'relative rounded-(--radius-lg) border bg-(--color-surface-page) p-2.5',
                  d.warm
                    ? 'border-(--color-orange-100)/40 shadow-sm'
                    : 'border-(--color-border-default) shadow-sm',
                  d.lifted && 'translate-y-[-2px] shadow-md',
                )}
              >
                <div className={cn('mb-1.5 h-1 w-8 rounded-full', BAR_CLASS[d.bar])} />
                <div className="text-[11.5px] font-semibold leading-tight text-(--color-text-primary)">
                  {d.company}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-(--color-text-accent)">
                  {d.amount}
                </div>
                <div className="mt-1 truncate text-[10px] text-(--color-text-secondary)">
                  {d.contact}
                </div>
                <div className="mt-1.5 truncate text-[10px] text-(--color-text-primary)">
                  {d.nextStep}
                </div>
                {d.warm && (
                  <span className="absolute top-2 right-2 inline-flex h-4 items-center rounded-full bg-(--color-orange-100)/20 px-1.5 text-[9px] font-medium text-amber-800">
                    Горячий
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
