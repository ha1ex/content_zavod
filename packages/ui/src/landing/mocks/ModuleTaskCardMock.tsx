import { HsiBoard, type HsiBoardData } from '../HeroScreenInterface';

/** Данные доски «Маркетинг» — те же, что на первом экране лендинга «Задачи». */
const BOARD: Pick<HsiBoardData, 'columns' | 'lanes'> = {
  columns: [
    { label: 'Очередь', count: 3 },
    { label: 'В работе', count: 2 },
    { label: 'Проверка', count: 2 },
    { label: 'Согласование', count: 2 },
    { label: 'Готово', count: 2, done: true },
  ],
  lanes: [
    {
      name: 'Запуск продукта',
      count: 6,
      columns: [
        [
          { title: 'Статья в блог про рабочее пространство', tags: [{ label: 'Блог', variant: 'blue' }], assignees: ['#8aa8c9'], assigneeInitials: ['ЕГ'], due: '22 сен' },
          { title: 'Вебинар для партнеров', tags: [{ label: 'События', variant: 'big' }], assignees: ['#d9a3a3'], assigneeInitials: ['АМ'], due: '25 сен' },
        ],
        [
          { title: 'Баннеры для соцсетей', tags: [{ label: 'Дизайн', variant: 'urg' }], assignees: ['#8ac9a0'], assigneeInitials: ['ПС'], due: '19 сен' },
        ],
        [
          { title: 'Промостраница новой функции', tags: [{ label: 'Сайт', variant: 'ok' }], checklist: { label: 'Чек-лист', done: 3, total: 5 }, counters: { attachments: 3, comments: 4, children: 2 }, assignees: ['#b88ac9'], assigneeInitials: ['АК'], active: true, due: '18 сен' },
        ],
        [
          { title: 'Пресс-релиз о запуске', tags: [{ label: 'Пресса', variant: 'cx' }], assignees: ['#d9a3a3'], assigneeInitials: ['АМ'], due: '20 сен' },
        ],
        [
          { title: 'Рассылка клиентам', tags: [{ label: 'Рассылка', variant: 'prod' }], assignees: ['#8aa8c9'], assigneeInitials: ['ЕГ'], due: '11 сен' },
        ],
      ],
    },
    {
      name: 'Разработка',
      count: 5,
      columns: [
        [
          { title: 'Настроить права доступа для отделов', tags: [{ label: 'Платформа', variant: 'cx' }], assignees: ['#b88ac9'], assigneeInitials: ['АК'], due: '23 сен' },
        ],
        [
          { title: 'Отчеты по пространству', tags: [{ label: 'Аналитика', variant: 'blue' }], assignees: ['#8ac9a0'], assigneeInitials: ['ПС'], due: '24 сен' },
        ],
        [
          { title: 'Импорт задач из таблиц', tags: [{ label: 'Миграция', variant: 'prod' }], assignees: ['#d9a3a3'], assigneeInitials: ['АМ'], due: '17 сен' },
        ],
        [
          { title: 'Доступы для подрядчиков', tags: [{ label: 'Платформа', variant: 'big' }], assignees: ['#8ac9a0'], assigneeInitials: ['ПС'], due: '21 сен' },
        ],
        [
          { title: 'Мобильное приложение: карточка задачи', tags: [{ label: 'Мобильное', variant: 'ok' }], assignees: ['#8aa8c9'], assigneeInitials: ['ЕГ'], due: '12 сен' },
        ],
      ],
    },
  ],
};

/**
 * Доска «Маркетинг» с открытым окном карточки «Промостраница новой функции»
 * справа: параметры, чек-лист 3/5, описание, дочерние карточки и комментарий.
 * Курсор наводится на карточку, щелкает, окно выезжает — анимация один раз,
 * на мобилке и при prefers-reduced-motion сразу финальный кадр. 1360px.
 */
export function ModuleTaskCardMock() {
  return <HsiBoard boardTitle="Маркетинг" cardWindow {...BOARD} />;
}
