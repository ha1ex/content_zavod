import { Icon } from '../../primitives/Icon';
import { cn } from '../../primitives/cn';

interface Goal {
  title: string;
  weight: string;
  progress: string;
  share: string;
  status: 'done' | 'in-progress';
}

interface Review {
  initials: string;
  name: string;
  role: string;
  tag: 'strength' | 'growth';
  text: string;
}

const GOALS: Goal[] = [
  { title: 'Перевести 3 сервиса на новую очередь', weight: '25%', progress: 'Закрыта · все 3 в проде', share: 'w-full', status: 'done' },
  { title: 'Снизить p95 latency API до 180 мс', weight: '25%', progress: 'Закрыта · 162 мс по метрикам', share: 'w-full', status: 'done' },
  { title: 'Менторство 2 джунов', weight: '20%', progress: 'Закрыта · 2 джуна закрыли испыт. срок', share: 'w-full', status: 'done' },
  { title: 'Подготовить ADR по биллингу', weight: '30%', progress: 'В работе · черновик согласован, ждёт ревью CTO', share: 'w-[65%]', status: 'in-progress' },
];

const REVIEWS: Review[] = [
  { initials: 'ДО', name: 'Дмитрий Орлов', role: 'Backend Lead · manager', tag: 'strength', text: 'Системно мыслит, проектирует решения с расчётом на нагрузку. Команда тянется за уровнем код-ревью.' },
  { initials: 'РК', name: 'Роман Климов', role: 'Senior Go · peer', tag: 'strength', text: 'Спокойно объясняет сложное, разгружает тимлида на архитектурных дискуссиях.' },
  { initials: 'ВТ', name: 'Виктор Тарасов', role: 'Middle Go · peer', tag: 'growth', text: 'Иногда уходит в технические детали, теряя бизнес-контекст задачи.' },
  { initials: 'АН', name: 'Анна Никитина', role: 'Middle Python · peer', tag: 'growth', text: 'Не всегда поднимает риски сразу — обнаруживает их при сдаче.' },
];

const TAG_CLASS: Record<Review['tag'], string> = {
  strength: 'bg-(--color-green-12) text-green-700',
  growth: 'bg-(--color-orange-12) text-amber-800',
};

const TAG_LABEL: Record<Review['tag'], string> = {
  strength: 'Сильная сторона',
  growth: 'Зона роста',
};

/**
 * Mock карточки performance review HR-домена: цели с прогресс-баром,
 * 360° обратная связь, финальный рейтинг.
 */
export function PerformanceReviewMock() {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-(--radius-3xl)',
        'border border-(--color-border-default) bg-(--color-surface-card)',
        'shadow-[0_30px_80px_-30px_rgba(125,76,207,0.30)]',
      )}
    >
      <div className="flex flex-wrap items-center gap-1.5 border-b border-(--color-border-default) bg-(--color-surface-section) px-3 py-2.5">
        <span className="h-2 w-2 rounded-full bg-red-300" />
        <span className="h-2 w-2 rounded-full bg-yellow-300" />
        <span className="h-2 w-2 rounded-full bg-green-300" />
        <div className="ml-2 flex flex-wrap items-center gap-3 text-[11px] text-(--color-text-secondary)">
          <span className="font-medium text-(--color-text-primary)">Performance Review · H1 2026</span>
          <span>Светлана Власова · Senior Backend</span>
          <span className="rounded-md border border-(--color-border-default) bg-(--color-surface-page) px-1.5 py-0.5">Готово к калибровке</span>
        </div>
      </div>
      <div className="grid gap-3 p-4 md:gap-4 md:p-5">
        <div className="flex items-center justify-between rounded-(--radius-xl) border border-(--color-action-primary)/30 bg-(--color-action-primary-soft)/30 p-3">
          <div>
            <div className="text-[10px] uppercase tracking-wide text-(--color-text-secondary)">Итоговая оценка · H1 2026</div>
            <div className="mt-0.5 text-[14px] font-semibold text-(--color-text-primary)">Exceeds expectations</div>
            <div className="mt-0.5 text-[10.5px] text-(--color-text-secondary)">3 из 4 целей выполнены, 1 в финале · 4 оценки коллег учтены</div>
          </div>
          <span className="inline-flex h-7 items-center gap-1 rounded-full bg-(--color-action-primary) px-3 text-[11px] font-medium text-white">
            <Icon name="Star" className="h-3.5 w-3.5" strokeWidth={2.5} />
            4,6 / 5
          </span>
        </div>
        <div className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) p-3">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
            <span>Цели на полугодие · 4 из 4</span>
            <span>прогресс 91%</span>
          </div>
          <div className="space-y-2">
            {GOALS.map((g) => (
              <div key={g.title} className="space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[11px] font-medium text-(--color-text-primary)">{g.title}</span>
                  <span className="shrink-0 text-[9px] uppercase tracking-wide text-(--color-text-secondary)">вес {g.weight}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-(--color-neutral-200)">
                    <div className={cn('h-full rounded-full', g.share, g.status === 'done' ? 'bg-(--color-green-100)' : 'bg-(--color-action-primary)')} />
                  </div>
                  <span className={cn('shrink-0 text-[10px]', g.status === 'done' ? 'text-green-700' : 'text-(--color-text-accent)')}>{g.status === 'done' ? '100%' : '65%'}</span>
                </div>
                <div className={cn('text-[10px]', g.status === 'done' ? 'text-(--color-text-secondary)' : 'text-(--color-text-primary)')}>{g.progress}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-(--radius-xl) border border-(--color-border-default) bg-(--color-surface-page) p-3">
          <div className="mb-2 flex items-center justify-between text-[10px] uppercase tracking-wide text-(--color-text-secondary)">
            <span>Обратная связь · manager + 3 peers</span>
            <span>360°</span>
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <div key={r.name} className="rounded-(--radius-lg) border border-(--color-border-default) bg-(--color-surface-page) p-2.5">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-action-primary-soft) text-[10px] font-semibold text-(--color-text-accent)">{r.initials}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[11px] font-semibold text-(--color-text-primary)">{r.name}</div>
                    <div className="truncate text-[9px] text-(--color-text-secondary)">{r.role}</div>
                  </div>
                  <span className={cn('inline-flex h-4 shrink-0 items-center rounded-full px-1.5 text-[9px] font-medium', TAG_CLASS[r.tag])}>{TAG_LABEL[r.tag]}</span>
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
