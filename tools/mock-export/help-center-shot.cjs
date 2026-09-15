/* Пересобирает мокап справочного центра в узкой рамке.

   У HelpCenterPortalMock ширина зашита классом w-[576px], поэтому кадр
   всегда выходит в пропорции 1.95 и по высоте на слайде не растет.
   Сам компонент не трогаем — он общий с лендингами: ширину переопределяем
   инъекцией стиля перед съемкой, как и в остальных мокапах дека.
   Кегль внутри при этом не меняется, содержимое переносится — кадр
   становится вертикальнее, а интерфейс крупнее. */
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const CSS = fs.readFileSync('tools/mock-export/out/mocks.css', 'utf8');
const MOCK = fs.readFileSync('tools/mock-export/out/help-center.html', 'utf8');

const W = Number(process.argv[2] || 470);
const OUT = process.argv[3] || '.context/help-center.png';

const html = `<!doctype html><html><head><meta charset="utf-8" />
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;600&display=swap" rel="stylesheet" />
<style>${CSS}
html,body{margin:0;padding:0;background:transparent}
body{font-family:"Roboto",system-ui,sans-serif}
#shot{display:inline-block;padding:4px}
/* Ширину задаем здесь, а не в компоненте */
#shot .mkp > div{width:${W}px !important;box-shadow:none !important}
</style></head><body><div id="shot"><div class="mkp">${MOCK}</div></div></body></html>`;
fs.writeFileSync('.context/help-shot.html', html, 'utf8');

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1400, height: 1400 }, deviceScaleFactor: 3 });
  await p.goto('file:///' + path.resolve('.context/help-shot.html').split(path.sep).join('/'), { waitUntil: 'networkidle' });
  await p.waitForTimeout(600);
  const box = await p.locator('#shot').boundingBox();
  await p.locator('#shot').screenshot({ path: OUT, omitBackground: true });
  await b.close();
  console.log('снято:', OUT, '· рамка', W + 'px · пропорция', (box.width / box.height).toFixed(2));
})();
