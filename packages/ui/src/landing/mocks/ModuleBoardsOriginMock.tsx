import { HsiApp } from '../HeroScreenApp';
import type { HsiColumnHeader, HsiLane } from '../HeroScreenInterface';

/** Данные доски «Задачи команды» — те же, что на первом экране лендинга «Единое рабочее пространство». */
const BOARD: { boardTitle: string; spaceTitle: string; columns: HsiColumnHeader[]; lanes: HsiLane[] } = {
  "boardTitle": "Задачи команды",
  "spaceTitle": "Работа команды — из Excel в Кайтен",
  "columns": [
    {
      "label": "Запланировано",
      "count": 4
    },
    {
      "label": "В работе",
      "count": 3
    },
    {
      "label": "На согласовании",
      "count": 3
    },
    {
      "label": "Готово",
      "count": 3,
      "done": true
    }
  ],
  "lanes": [
    {
      "name": "",
      "columns": [
        [
          {
            "title": "Собрать план работ на октябрь",
            "accent": "#66bb6a",
            "icon": "dot",
            "tags": [
              {
                "label": "Планирование",
                "variant": "peach"
              }
            ],
            "assignees": [
              "#a5d4d9"
            ],
            "due": "25 сент."
          },
          {
            "title": "Обновить инструкции для новых сотрудников",
            "accent": "#1976d2",
            "icon": "doc",
            "tags": [
              {
                "label": "Документы",
                "variant": "lime"
              }
            ],
            "assignees": [
              "#f6c453",
              "#9fd3cf"
            ],
            "due": "24 сент."
          },
          {
            "title": "Подготовить отчет по проектам",
            "accent": "#ffca28",
            "icon": "chart",
            "tags": [
              {
                "label": "Аналитика",
                "variant": "peach"
              }
            ],
            "assignees": [
              "#a5d4d9"
            ],
            "due": "23 сент."
          },
          {
            "title": "Подготовить дизайн слайдов",
            "parent": "Подготовить презентацию для клиента",
            "accent": "#ffcdd2",
            "icon": "folder",
            "counters": {
              "children": 0
            },
            "tags": [
              {
                "label": "Маркетинг",
                "variant": "pink"
              }
            ],
            "assignees": [
              "#f6c453"
            ],
            "due": "20 сент.",
            "dueTone": "red"
          }
        ],
        [
          {
            "title": "Подготовить презентацию для клиента",
            "accent": "#ffcdd2",
            "icon": "folder",
            "counters": {
              "children": 1,
              "childrenDone": 0,
              "attachments": 1
            },
            "tags": [
              {
                "label": "Маркетинг",
                "variant": "pink"
              }
            ],
            "checklist": {
              "label": "Подготовка презентации",
              "done": 3,
              "total": 6
            },
            "assignees": [
              "#c5cae9",
              "#f6c453"
            ],
            "extraAssignee": "+1",
            "due": "21 сент.",
            "dueTone": "red"
          },
          {
            "title": "Обновить прайс-лист",
            "accent": "#1976d2",
            "icon": "doc",
            "tags": [
              {
                "label": "Продажи",
                "variant": "sky"
              }
            ],
            "assignees": [
              "#f6c453",
              "#9fd3cf"
            ],
            "due": "16 сент.",
            "dueTone": "red"
          },
          {
            "title": "Собрать обратную связь клиентов",
            "accent": "#ffca28",
            "icon": "chart",
            "tags": [
              {
                "label": "Аналитика",
                "variant": "peach"
              }
            ],
            "assignees": [
              "#a5d4d9"
            ],
            "due": "Сегодня",
            "dueTone": "orange"
          }
        ],
        [
          {
            "title": "Согласовать договор с подрядчиком",
            "blocker": "Ждем реквизиты и финальную смету от подрядчика",
            "accent": "#1976d2",
            "icon": "doc",
            "tags": [
              {
                "label": "Документы",
                "variant": "lime"
              }
            ],
            "assignees": [
              "#a5d4d9"
            ],
            "due": "18 сент.",
            "dueTone": "red"
          },
          {
            "title": "Утвердить макеты для рассылки",
            "accent": "#ffcdd2",
            "icon": "folder",
            "tags": [
              {
                "label": "Маркетинг",
                "variant": "pink"
              }
            ],
            "assignees": [
              "#c5cae9",
              "#9fd3cf"
            ],
            "due": "18 сент.",
            "dueTone": "red",
            "urgent": true
          },
          {
            "title": "Согласовать план обучения команды",
            "accent": "#66bb6a",
            "icon": "dot",
            "tags": [
              {
                "label": "Планирование",
                "variant": "peach"
              }
            ],
            "assignees": [
              "#cfd8dc",
              "#9fd3cf"
            ],
            "due": "Сегодня",
            "dueTone": "orange"
          }
        ],
        [
          {
            "title": "Собрать требования к проекту",
            "accent": "#66bb6a",
            "icon": "dot",
            "tags": [
              {
                "label": "Планирование",
                "variant": "peach"
              }
            ],
            "assignees": [
              "#a5d4d9"
            ],
            "due": "14 сент."
          },
          {
            "title": "Подготовить шаблон отчета",
            "accent": "#ffca28",
            "icon": "chart",
            "tags": [
              {
                "label": "Аналитика",
                "variant": "peach"
              }
            ],
            "assignees": [
              "#a5d4d9"
            ],
            "due": "15 сент."
          },
          {
            "title": "Обновить базу контактов",
            "accent": "#66bb6a",
            "icon": "dot",
            "tags": [
              {
                "label": "Продажи",
                "variant": "sky"
              }
            ],
            "assignees": [
              "#f6c453",
              "#9fd3cf"
            ],
            "due": "15 сент."
          }
        ]
      ]
    }
  ]
};

/**
 * Module: интерфейс Кайтена целиком, как в продукте (эталон — пространство
 * «Работа команды», экран 1920×1000). Шапка, колонка разделов, «Дерево» с
 * открытой доской, панель видов, доска «Задачи команды» на 4 колонки и колонка
 * инструментов справа. Тот же интерфейс, что на первом экране лендинга
 * «Единое рабочее пространство» (HeroScreenInterface, appShell).
 * Дизайн-ширина 1920px, в слотах масштабируется ScaleToFit.
 */
export function ModuleBoardsOriginMock() {
  return (
    // .hsi .app — область стилей HsiApp; свой zoom сброшен, масштаб задает обертка
    <div className="hsi hsi--app" aria-hidden="true" style={{ zoom: 1 }}>
      <HsiApp {...BOARD} />
    </div>
  );
}
