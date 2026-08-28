# Экспорт мокапов в презентации

Мокапы лендинга (`packages/ui/src/landing/mocks/`) написаны на JSX с классами
Tailwind — скопировать их разметку в дек нельзя. Здесь лежит конвейер, который
превращает компонент в статический HTML плюс ровно тот CSS, который ему нужен.

```bash
node_modules/.bin/esbuild tools/mock-export/render.tsx --bundle --platform=node \
  --format=cjs --jsx=automatic --outfile=tools/mock-export/out/render.cjs \
  --external:react --external:react-dom
node tools/mock-export/out/render.cjs   # → out/<имя>.html и out/all.html
node tools/mock-export/build-css.cjs    # → out/mocks.css
cp tools/mock-export/out/mocks.css design-system/presentation-v02/assets/module-mocks.css
```

Сборка идет через `--format=cjs`: `lucide-react` поставляется в CJS, и в ESM
бандле он падает на `Dynamic require of "react"`.

`build-css.cjs` собирает только утилиты и тему, без preflight — тот сбрасывает
`html`/`body` и сломал бы дек. Вместо него в файле свой минимальный сброс, а все
селекторы уведены под `.mkp`, чтобы утилиты Tailwind не пересекались с классами
презентации. Токены подкладываются целиком: синтаксис `bg-(--color-surface-card)`
Tailwind не считает использованием переменной и вычистил бы ее из темы.

Обертки и масштаб (`.mm-shot`, `.mm-<имя>`) описаны в `kaiten-slides.css`.
Правки вносить в исходные компоненты и пересобирать, а не в `module-mocks.css`.

`build-slides.cjs` — разовая вставка слайдов s32–s39, оставлена как история
происхождения разметки.
