// Версии логотипов для темной темы: фирменные цвета остаются, а нейтральная
// темная краска (черный и серый текст) становится белой — иначе ее не видно
// на темном полотне. Цветные пиксели не трогаем: насыщенность держит их.
const sharp = require('sharp');
const SRC = '.context/logos-t/';
const OUT = '.context/logos-t/on-dark/';
const files = ['rostelecom', 'tele2', 'nornikel-color', 'x5tech-color', 's7-color'];
(async () => {
  for (const f of files) {
    const { data, info } = await sharp(SRC + f + '.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    let n = 0;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] === 0) continue;
      const r = data[i], g = data[i + 1], b = data[i + 2];
      const mx = Math.max(r, g, b), mn = Math.min(r, g, b);
      const sat = mx === 0 ? 0 : (mx - mn) / mx;
      // нейтральный и не светлый, либо почти черный (у «Ростелекома» текст темно-синий
      // #102030 — насыщенный формально, но по сути черная краска)
      if ((sat < 0.22 && mx < 190) || mx < 80) { data[i] = data[i + 1] = data[i + 2] = 255; n++; }
    }
    await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(OUT + f + '.png');
    console.log(f.padEnd(16), 'перекрашено пикселей', n);
  }
})();
