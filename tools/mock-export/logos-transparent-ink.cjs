// Логотипы из одной-двух красок: прозрачность считаем от светлоты пикселя,
// так уходит весь белый — и подложка, и просветы внутри букв. Логотипы со
// своей плашкой (METRO, S7) снимаем заливкой от краев, внутреннее белое остается.
const sharp = require('sharp');
const SRC = '.context/preview-banks/design-system/presentation-v02/assets/clients/';
const OUT = '.context/logos-t/';
const ink = ['alfabank-color','atol','nornikel-color','rosgosstrah','rostelecom','rzd','samolet','sberbank','tele2','x5tech-color'];
(async () => {
  for (const f of ink) {
    const { data, info } = await sharp(SRC + f + '.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    for (let i = 0; i < data.length; i += 4) {
      const a0 = data[i + 3] / 255;
      const m = Math.min(data[i], data[i + 1], data[i + 2]);
      // белый 245+ — полностью прозрачно, от 200 и темнее — полностью плотно
      let a = m >= 245 ? 0 : m <= 200 ? 1 : (245 - m) / 45;
      // у tele2 исходник полупрозрачный (альфа 128) — поднимаем плотность
      const boost = f === 'tele2' ? Math.min(1, a0 * 2) : a0;
      data[i + 3] = Math.round(255 * a * boost);
    }
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(OUT + f + '.png');
    console.log('готово', f);
  }
})();
