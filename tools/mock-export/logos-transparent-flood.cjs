// Убирает белую подложку у логотипов клиентов: заливка от краев кадра,
// внутренние белые детали (просветы в буквах, фон внутри плашек) не трогаем.
const sharp = require('sharp');
const fs = require('fs');
const SRC = '.context/preview-banks/design-system/presentation-v02/assets/clients/';
const OUT = '.context/logos-t/';
const files = ['alfabank-color','atol','metro','nornikel-color','rosgosstrah','rostelecom','rzd','s7-color','samolet','sberbank','tele2','x5tech-color'];
(async () => {
  for (const f of files) {
    const { data, info } = await sharp(SRC + f + '.png').ensureAlpha().raw().toBuffer({ resolveWithObject: true });
    const W = info.width, H = info.height, N = W * H;
    const white = (i) => { const o = i * 4; return data[o + 3] > 0 && Math.min(data[o], data[o + 1], data[o + 2]) >= 232; };
    const seen = new Uint8Array(N); const stack = [];
    for (let x = 0; x < W; x++) { stack.push(x, (H - 1) * W + x); }
    for (let y = 0; y < H; y++) { stack.push(y * W, y * W + W - 1); }
    while (stack.length) {
      const i = stack.pop(); if (seen[i]) continue; seen[i] = 1;
      const o = i * 4; if (data[o + 3] === 0) { /* уже прозрачно */ } else if (!white(i)) continue;
      data[o + 3] = 0;
      const x = i % W, y = (i / W) | 0;
      if (x > 0) stack.push(i - 1); if (x < W - 1) stack.push(i + 1);
      if (y > 0) stack.push(i - W); if (y < H - 1) stack.push(i + W);
    }
    // мягкий край: пиксели рядом с вырезанным фоном теряют прозрачность по степени белизны
    for (let i = 0; i < N; i++) {
      const o = i * 4; if (data[o + 3] === 0) continue;
      const x = i % W, y = (i / W) | 0;
      const nb = [x > 0 && i - 1, x < W - 1 && i + 1, y > 0 && i - W, y < H - 1 && i + W].filter((v) => v !== false);
      if (nb.some((j) => data[j * 4 + 3] === 0)) {
        const m = Math.min(data[o], data[o + 1], data[o + 2]);
        if (m > 180) data[o + 3] = Math.round(255 * (255 - m) / 75);
      }
    }
    await sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toFile(OUT + f + '.png');
    const cleared = [...seen].filter(Boolean).length;
    console.log(f.padEnd(16), W + 'x' + H, 'фон снят', Math.round(cleared / N * 100) + '%');
  }
})();
