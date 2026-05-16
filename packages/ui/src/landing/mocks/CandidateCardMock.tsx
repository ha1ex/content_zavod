import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

const TABS = [
  { label: 'Профиль' },
  { label: 'Резюме' },
  { label: 'Интервью', active: true, count: 3 },
  { label: 'Тестовое', count: 1 },
  { label: 'Оффер' },
];

const HISTORY = [
  { icon: 'Mail', tone: 'blue' as const, title: 'Отклик на вакансию Senior Backend', meta: 'hh.ru · 28 апр' },
  { icon: 'PhoneIncoming', tone: 'violet' as const, title: 'Скрининг-звонок · 22 мин', meta: 'Анна Соколова · 3 мая' },
  { icon: 'Video', tone: 'orange' as const, title: 'Тех-интервью · zoom', meta: 'Дмитрий Орлов · 9 мая' },
];

const REVIEWS = [
  { initials: 'ДО', name: 'Дмитрий Орлов', role: 'Backend Lead', rating: 'Сильный плюс', tone: 'green' as const, text: 'Хорошо разбирается в Go, спокойно собрала систему очередей на whiteboard.' },
  { initials: 'ИЛ', name: 'Игорь Лебедев', role: 'CTO', rating: 'Плюс', tone: 'violet' as const, text: 'Аккуратное мышление, есть опыт онбординга джунов. Слабее на распределённых системах.' },
  { initials: 'АС', name: 'Анна Соколова', role: 'HR · скрининг', rating: 'Плюс', tone: 'blue' as const, text: 'Чёткие ожидания по уровню и формату работы. Готова выйти через 2 недели.' },
];

const TONE_CLASS: Record<'violet' | 'blue' | 'green' | 'orange', string> = {
  violet: 'bg-(--color-action-primary-soft) text-(--color-text-accent)',
  blue: 'bg-(--color-blue-12) text-(--color-blue-100)',
  green: 'bg-(--color-green-12) text-green-700',
  orange: 'bg-(--color-orange-12) text-amber-800',
};

/**
 * Mock карточки кандидата HR-домена: sidebar + табы + история контактов +
 * оценки 3 интервьюеров.
 */
export function CandidateCardMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="grid grid-cols-[160px_1fr] gap-4 p-4 md:grid-cols-[200px_1fr] md:gap-5 md:p-5">
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-(--color-action-primary) text-base font-semibold text-white">СВ</span>
            <div className="min-w-0">
              <div className="truncate text-[12.5px] font-semibold text-(--color-text-primary)">Светлана Власова</div>
              <div className="truncate text-[10px] text-(--color-text-secondary)">Senior Backend · Go</div>
            </div>
          </div>
          <div className="space-y-1.5 text-[11px]">
            <div>
              <div className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">Ожидания</div>
              <div className="font-semibold text-(--color-text-accent)">320 000 ₽ · на руки</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">Опыт</div>
              <div className="font-medium text-(--color-text-primary)">7 лет · Avito, Тинькофф</div>
            </div>
            <div>
              <div className="text-[9px] uppercase tracking-wide text-(--color-text-secondary)">Готова выйти</div>
              <div className="font-medium text-(--color-text-primary)">Через 2 недели</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 pt-1">
            <span className="inline-flex h-4 items-center rounded-full bg-(--color-action-primary-soft) px-1.5 text-[9px] font-medium text-(--color-text-accent)">Senior</span>
            <span className="inline-flex h-4 items-center rounded-full bg-(--color-blue-12) px-1.5 text-[9px] font-medium text-(--color-blue-100)">Go · Postgres</span>
            <span className="inline-flex h-4 items-center rounded-full bg-(--color-orange-12) px-1.5 text-[9px] font-medium text-amber-800">Реферал</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1 border-b border-(--color-border-default) pb-2">
            {TABS.map((t) => (
              <span key={t.label} className={cn('inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium', t.active ? 'bg-(--color-action-primary-soft) text-(--color-text-accent)' : 'text-(--color-text-secondary)')}>
                {t.label}
                {t.count && <span className="rounded-full bg-(--color-neutral-200) px-1 text-[9px] text-(--color-text-primary)">{t.count}</span>}
              </span>
            ))}
          </div>
          <div className="rounded-(--radius-xl) border border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/30 p-3">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">Стадия</div>
                <div className="mt-0.5 text-[12.5px] font-semibold text-(--color-text-primary)">Готова к офферу · вакансия Senior Backend</div>
              </div>
              <span className="inline-flex h-6 items-center gap-1 rounded-full bg-(--color-action-primary) px-2 text-[10px] font-medium text-white">
                <Icon name="ThumbsUp" className="h-3 w-3" strokeWidth={2.5} />
                Решение принято
              </span>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">История контактов</div>
            {HISTORY.map((h, i) => (
              <div key={i} className="flex items-start gap-2 rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2">
                <span className={cn('inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-(--radius-lg)', TONE_CLASS[h.tone])}>
                  <Icon name={h.icon} className="h-3.5 w-3.5" strokeWidth={2} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[11px] font-medium text-(--color-text-primary)">{h.title}</div>
                  <div className="truncate text-[10px] text-(--color-text-secondary)">{h.meta}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="space-y-1.5">
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">Оценки интервьюеров · 3 из 3</div>
            {REVIEWS.map((r, i) => (
              <div key={i} className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[9px] font-semibold text-(--color-text-accent)">{r.initials}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] font-semibold text-(--color-text-primary)">{r.name}</div>
                    <div className="truncate text-[9px] text-(--color-text-secondary)">{r.role}</div>
                  </div>
                  <span className={cn('inline-flex h-4 shrink-0 items-center rounded-full px-1.5 text-[9px] font-medium', TONE_CLASS[r.tone])}>{r.rating}</span>
                </div>
                <div className="mt-1.5 text-[10.5px] leading-snug text-(--color-text-secondary)">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
