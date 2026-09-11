import { existsSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface Deck {
  slug: string;
  title: string | null;
  slides: number;
  mtime: Date | null;
  pdf: boolean;
  script: boolean;
}

/**
 * Каталог презентаций независимо от cwd рантайма — тот же приём, что в
 * landingsDir() у /landings/[slug]: Turbopack при авторестарте иногда выставляет
 * process.cwd() в корень монорепо вместо apps/web.
 */
export function presentationsDir(): string | null {
  let dir = process.cwd();
  for (let i = 0; i < 6; i++) {
    const candidate = resolve(dir, 'design-system', 'presentation-v02');
    if (existsSync(candidate)) return candidate;
    const parent = resolve(dir, '..');
    if (parent === dir) break; // достигли корня ФС
    dir = parent;
  }
  return null;
}

async function mtimeOf(file: string): Promise<Date | null> {
  try {
    return (await stat(file)).mtime;
  } catch {
    return null;
  }
}

/** Деки из design-system/presentation-v02/examples: заголовок, число слайдов, экспорт и сценарий. */
export async function listDecks(): Promise<Deck[]> {
  const root = presentationsDir();
  if (!root) return [];
  const dir = resolve(root, 'examples');
  try {
    const files = (await readdir(dir)).filter((f) => f.endsWith('.html')).sort();
    return await Promise.all(
      files.map(async (file) => {
        const slug = file.replace(/\.html$/, '');
        const html = await readFile(resolve(dir, file), 'utf8').catch(() => '');
        return {
          slug,
          title: /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim() || null,
          slides: (html.match(/class="slide[ "]/g) ?? []).length,
          mtime: await mtimeOf(resolve(dir, file)),
          pdf: existsSync(resolve(dir, `${slug}.pdf`)),
          script: existsSync(resolve(dir, `${slug}.content.md`)),
        };
      }),
    );
  } catch {
    return [];
  }
}
