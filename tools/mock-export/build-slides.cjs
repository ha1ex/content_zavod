/* Вставляет в дек слайды с мокапами модулей.
   Разметка берется из tools/mock-export/out/*.html — это результат рендера
   компонентов packages/ui/src/landing/mocks через render.tsx. */
const fs = require('fs');
const DECK = 'design-system/presentation-v02/examples/kaiten-content-factory.html';
const OUT = 'tools/mock-export/out';

const LOGO = '<img class="mark" src="../assets/kaiten-logo.svg" alt="Кайтен" />';
const shot = (key) =>
  `<div class="mm-shot mm-${key}"><div class="mkp">${fs.readFileSync(`${OUT}/${key}.html`, 'utf8')}</div></div>`;

// Широкий мокап на всю полосу, под заголовком — одна поясняющая строка.
const wide = (id, key, title, lead, width) => `
    <section class="slide" id="${id}">
      <div class="s-head">
        <h2 class="s-title">${title}</h2>
        ${LOGO}
      </div>

      <div class="s-body" style="display:flex; flex-direction:column; gap:var(--gap); min-height:0">
        <p class="body muted" style="max-width:60cqw">${lead}</p>
        <div style="flex:1; display:flex; align-items:center; justify-content:center; min-height:0">
          <div style="width:${width}">${shot(key)}</div>
        </div>
      </div>
    </section>
`;

// Высокий или узкий мокап: текст слева, иллюстрация справа.
const split = (id, key, title, h3, paras, col) => `
    <section class="slide" id="${id}">
      <div class="s-head">
        <h2 class="s-title">${title}</h2>
        ${LOGO}
      </div>

      <div class="s-body" style="display:grid; grid-template-columns:${col}; gap:var(--gap); align-items:center; min-height:0">
        <div style="display:flex; flex-direction:column; min-height:0">
          <h3 class="h2">${h3}</h3>
${paras.map((p, i) => `          <p class="body muted"${i ? ' style="margin-top:1.25cqw"' : ''}>${p}</p>`).join('\n')}
        </div>

        ${shot(key)}
      </div>
    </section>
`;

const slides = [
  split('s32', 'gantt', 'Сроки видно на одном полотне',
    'Диаграмма Ганта', [
      'Этапы, подзадачи и связи между ними лежат на общей шкале. Сдвинули один срок — видно, что поедет следом, и не нужно сверять это по переписке.',
      'Ответственные подписаны прямо на полосах, поэтому вопрос «кто это тянет» снимается без открытия карточки.',
    ], '38% 1fr'),

  wide('s33', 'table', 'Таблица: все задачи одним списком',
    'Тот же набор карточек, но в виде плотного списка с колонками. Удобно, когда нужно сравнить приоритеты, подрядчиков и даты, а не следить за движением по доске.',
    '100%'),

  wide('s34', 'scrum', 'Спринт целиком помещается на доску',
    'Колонки по стадиям, дорожки по спринтам, оценка и время на карточках. Планерка идет по доске, а не по выгрузке в таблицу.',
    '100%'),

  wide('s35', 'crm', 'Воронка продаж живет рядом с задачами',
    'Сделки движутся по тем же колонкам, что и работа команды. Менеджер не переключается между CRM и трекером, а производство видит, что придет следующим.',
    '100%'),

  wide('s36', 'portfolio', 'Портфель проектов сверху',
    'Каждая строка — проект со своими досками и карточками. Руководитель видит загрузку и стадии всех направлений, не открывая их по одному.',
    '100%'),

  split('s37', 'flow', 'Маршрут задачи описан правилами',
    'Автоматизация переходов', [
      'Карточка идет по маршруту сама: согласовали — уехала к правкам, приняли — ушла на дизайн. Правила описаны один раз и работают на всех задачах.',
      'Ручные переносы остаются там, где нужно решение человека, а рутинные переходы конвейер делает без напоминаний.',
    ], '38% 1fr'),

  split('s38', 'knowledge', 'База знаний рядом с работой',
    'Документы в том же пространстве', [
      'Регламенты, инструкции и шаблоны лежат в дереве рядом с проектами. Ссылка на документ ведет в тот же интерфейс, а не в отдельный сервис.',
      'Комментарии к тексту обсуждаются на месте — договоренность остается в документе, а не растворяется в чате.',
    ], '34% 1fr'),

  wide('s39', 'usm', 'User story map: продукт целиком',
    'Верхняя строка — путь пользователя, ниже — релизы. Видно, что входит в ближайший срез, а что подождет, и почему.',
    '88%'),
];

let html = fs.readFileSync(DECK, 'utf8');
if (html.includes('id="s32"')) throw new Error('слайды уже вставлены');

const anchor = html.indexOf('<section class="slide" id="s30">');
if (anchor < 0) throw new Error('точка вставки не найдена');
html = html.slice(0, anchor) + slides.join('\n').trim() + '\n\n    ' + html.slice(anchor);

if (!html.includes('assets/module-mocks.css')) {
  html = html.replace('</head>', '  <link rel="stylesheet" href="../assets/module-mocks.css" />\n</head>');
}

fs.writeFileSync(DECK, html, 'utf8');
const ids = [...html.matchAll(/<section class="slide[^"]*" id="(s\d+)"/g)].map((m) => m[1]);
console.log('слайдов:', ids.length);
console.log(ids.join(' '));
