/**
 * harness wiki sync — регенерация derived-артефактов из design-system/kaiten-v01/tokens.json.
 *
 * Что синхронизируется:
 *   - packages/ui/src/tokens.css                          (полная перезапись)
 *   - wiki/design-system/{colors,typography,spacing,radius,grid,motion}.md
 *                                                         (только блок <!-- gen:tokens --> внутри)
 *   - wiki/design-system/components/button.md             (блок <!-- gen:tokens -->)
 *
 * Идемпотентен: повторный запуск без изменений в tokens.json не меняет файлы.
 */

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { loadTokens } from './load-tokens';
import { tokensToCss } from './tokens-to-css';
import { buildGenBlocks } from './tokens-to-md';
import { replaceGenBlock } from './frontmatter';

export interface SyncResult {
  written: string[];
  unchanged: string[];
  missingPages: string[];
}

export async function wikiSync(repoRoot: string): Promise<SyncResult> {
  const tokens = await loadTokens(repoRoot);
  const written: string[] = [];
  const unchanged: string[] = [];
  const missingPages: string[] = [];

  // 1. tokens.css
  const cssPath = resolve(repoRoot, 'packages', 'ui', 'src', 'tokens.css');
  const newCss = tokensToCss(tokens);
  const prevCss = await readFile(cssPath, 'utf-8').catch(() => '');
  if (prevCss !== newCss) {
    await mkdir(dirname(cssPath), { recursive: true });
    await writeFile(cssPath, newCss, 'utf-8');
    written.push(cssPath);
  } else {
    unchanged.push(cssPath);
  }

  // 2. wiki/design-system/*.md gen-blocks
  for (const block of buildGenBlocks(tokens)) {
    const pagePath = resolve(repoRoot, 'wiki', 'design-system', block.page);
    const prevContent = await readFile(pagePath, 'utf-8').catch(() => null);
    if (prevContent === null) {
      missingPages.push(pagePath);
      continue;
    }
    const newContent = replaceGenBlock(prevContent, block.tag, block.content);
    if (prevContent !== newContent) {
      await writeFile(pagePath, newContent, 'utf-8');
      written.push(pagePath);
    } else {
      unchanged.push(pagePath);
    }
  }

  return { written, unchanged, missingPages };
}
