/* Рендер HelpCenterPortalMock в статику. Компонент принимает compact:
   в этом режиме он тянется по ширине контейнера, а кегль внутри не меняется —
   значит в узком кадре пропорция становится вертикальнее, а интерфейс крупнее. */
import { renderToStaticMarkup } from 'react-dom/server';
import { writeFileSync, readFileSync } from 'node:fs';
import { HelpCenterPortalMock } from '../packages/ui/src/landing/mocks/HelpCenterPortalMock';

const html = renderToStaticMarkup(<HelpCenterPortalMock compact />);
writeFileSync('tools/mock-export/out/help-center.html', html, 'utf8');

const all = readFileSync('tools/mock-export/out/all.html', 'utf8');
if (!all.includes('data-mock="help-center"')) {
  writeFileSync(
    'tools/mock-export/out/all.html',
    all + `\n<section data-mock="help-center">${html}</section>`,
    'utf8',
  );
}
console.log('help-center ->', html.length, 'символов');
