/* Рендер мокапов Module* в статическую разметку.
   Компоненты написаны на JSX с классами Tailwind, поэтому просто скопировать
   их нельзя — сначала получаем HTML, отдельным шагом собираем нужный CSS. */
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync, mkdirSync } from 'node:fs';
import { GanttChartMock } from '../../packages/ui/src/landing/mocks/ModuleGanttChartMock';
import { ModuleTableMock } from '../../packages/ui/src/landing/mocks/ModuleTableMock';
import { ModuleScrumMock } from '../../packages/ui/src/landing/mocks/ModuleScrumMock';
import { ModuleCrmMock } from '../../packages/ui/src/landing/mocks/ModuleCrmMock';
import { ModulePortfolioMock } from '../../packages/ui/src/landing/mocks/ModulePortfolioMock';
import { ModuleFlowHorizontal } from '../../packages/ui/src/landing/mocks/ModuleFlowHorizontal';
import { ModuleKnowledgeBaseMock } from '../../packages/ui/src/landing/mocks/ModuleKnowledgeBaseMock1';
import { ModuleUsmMock } from '../../packages/ui/src/landing/mocks/ModuleUsmMock';

const items: [string, () => JSX.Element][] = [
  ['gantt', GanttChartMock as any],
  ['table', ModuleTableMock as any],
  ['scrum', ModuleScrumMock as any],
  ['crm', ModuleCrmMock as any],
  ['portfolio', ModulePortfolioMock as any],
  ['flow', ModuleFlowHorizontal as any],
  ['knowledge', ModuleKnowledgeBaseMock as any],
  ['usm', ModuleUsmMock as any],
];

mkdirSync('tools/mock-export/out', { recursive: true });
const parts: string[] = [];
for (const [name, Comp] of items) {
  try {
    const html = renderToStaticMarkup(<Comp />);
    writeFileSync(`tools/mock-export/out/${name}.html`, html, 'utf8');
    parts.push(`<section data-mock="${name}">${html}</section>`);
    console.log(name.padEnd(10), '->', html.length, 'символов');
  } catch (e) {
    console.log(name.padEnd(10), '-> ОШИБКА:', (e as Error).message.slice(0, 120));
  }
}
writeFileSync('tools/mock-export/out/all.html', parts.join('\n'), 'utf8');
console.log('всего собрано:', parts.length, 'из', items.length);
