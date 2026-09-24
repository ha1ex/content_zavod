import { HsiBoard, type HeroScreenInterfaceProps } from '../HeroScreenInterface';

type BoardData = Pick<HeroScreenInterfaceProps, 'boardTitle' | 'columns' | 'lanes' | 'animatedCard'>;

/** Данные доски «Запуск продукта» — те же, что на первом экране лендинга «Единое рабочее пространство». */
const BOARD: BoardData = {
  "boardTitle": "Запуск продукта",
  "columns": [
    {
      "label": "Очередь",
      "count": 3
    },
    {
      "label": "В работе",
      "count": 2
    },
    {
      "label": "Проверка",
      "count": 2
    },
    {
      "label": "Готово",
      "count": 2,
      "done": true
    }
  ],
  "lanes": [
    {
      "name": "Маркетинг",
      "count": 5,
      "columns": [
        [
          {
            "title": "Статья в блог про рабочее пространство",
            "tags": [
              {
                "label": "Блог",
                "variant": "blue"
              }
            ],
            "assignees": [
              "#8aa8c9"
            ],
            "assigneeInitials": [
              "АМ"
            ],
            "due": "22 сен"
          },
          {
            "title": "Вебинар для партнеров",
            "tags": [
              {
                "label": "События",
                "variant": "big"
              }
            ],
            "assignees": [
              "#d9a3a3"
            ],
            "assigneeInitials": [
              "ЕГ"
            ],
            "due": "25 сен"
          }
        ],
        [
          {
            "title": "Промостраница новой функции",
            "tags": [
              {
                "label": "Сайт",
                "variant": "ok"
              }
            ],
            "checklist": {
              "label": "Чек-лист",
              "done": 3,
              "total": 5
            },
            "assignees": [
              "#b88ac9"
            ],
            "assigneeInitials": [
              "АК"
            ],
            "due": "18 сен"
          }
        ],
        [
          {
            "title": "Баннеры для соцсетей",
            "tags": [
              {
                "label": "Дизайн",
                "variant": "urg"
              }
            ],
            "assignees": [
              "#8ac9a0"
            ],
            "assigneeInitials": [
              "ПС"
            ],
            "due": "19 сен"
          }
        ],
        [
          {
            "title": "Рассылка клиентам",
            "tags": [
              {
                "label": "Рассылка",
                "variant": "prod"
              }
            ],
            "assignees": [
              "#8aa8c9"
            ],
            "assigneeInitials": [
              "ИЛ"
            ],
            "due": "11 сен"
          }
        ]
      ]
    },
    {
      "name": "Разработка",
      "count": 4,
      "columns": [
        [
          {
            "title": "Настроить права доступа для отделов",
            "tags": [
              {
                "label": "Платформа",
                "variant": "cx"
              }
            ],
            "assignees": [
              "#b88ac9"
            ],
            "assigneeInitials": [
              "МС"
            ],
            "due": "23 сен"
          }
        ],
        [
          {
            "title": "Отчеты по пространству",
            "tags": [
              {
                "label": "Аналитика",
                "variant": "blue"
              }
            ],
            "assignees": [
              "#8ac9a0"
            ],
            "assigneeInitials": [
              "ДВ"
            ],
            "due": "24 сен"
          }
        ],
        [
          {
            "title": "Импорт задач из таблиц",
            "tags": [
              {
                "label": "Миграция",
                "variant": "prod"
              }
            ],
            "assignees": [
              "#d9a3a3"
            ],
            "assigneeInitials": [
              "ОК"
            ],
            "due": "17 сен"
          }
        ],
        [
          {
            "title": "Мобильное приложение: карточка задачи",
            "tags": [
              {
                "label": "Мобильное",
                "variant": "ok"
              }
            ],
            "assignees": [
              "#8aa8c9"
            ],
            "assigneeInitials": [
              "АМ"
            ],
            "due": "12 сен"
          }
        ]
      ]
    }
  ],
  "animatedCard": {
    "card": {
      "title": "Промостраница новой функции",
      "tags": [
        {
          "label": "Сайт",
          "variant": "ok"
        }
      ],
      "assignees": [
        "#b88ac9"
      ],
      "assigneeInitials": [
        "АК"
      ],
      "due": "18 сен"
    },
    "fromColumn": 1
  }
};

/**
 * Module: пространство Kaiten с меню слева и доской «Запуск продукта» —
 * дорожки «Маркетинг» и «Разработка», колонки Очередь → В работе → Проверка → Готово,
 * анимация переноса карточки в «Проверку» со светло-фиолетовой плашкой-приемником.
 * Дизайн-ширина 1360px, в слотах масштабируется ScaleToFit.
 */
export function ModuleWorkspaceBoardMock({ animate = true }: { animate?: boolean }) {
  return <HsiBoard {...BOARD} animate={animate} sidebar />;
}
