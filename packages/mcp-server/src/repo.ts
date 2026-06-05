import { dirname, resolve } from 'node:path';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

/**
 * Резолвит путь к корню Контент-завод Кайтен monorepo. Стратегия:
 * 1. Если задана KAITEN_REPO_ROOT — используем её.
 * 2. Идём вверх от текущего файла, ищем pnpm-workspace.yaml.
 * 3. Идём вверх от cwd, ищем pnpm-workspace.yaml.
 *
 * Это нужно, потому что MCP-сервер запускается клиентом
 * (Claude Desktop / VS Code) с произвольным cwd.
 */
export async function resolveRepoRoot(): Promise<string> {
  const fromEnv = process.env.KAITEN_REPO_ROOT;
  if (fromEnv) return resolve(fromEnv);

  const here = dirname(fileURLToPath(import.meta.url));
  const fromHere = await findUp(here);
  if (fromHere) return fromHere;

  const fromCwd = await findUp(process.cwd());
  if (fromCwd) return fromCwd;

  throw new Error(
    'Не удалось найти Контент-завод Кайтен repo root. Задайте KAITEN_REPO_ROOT в env для MCP-сервера.',
  );
}

async function findUp(start: string): Promise<string | null> {
  let dir = start;
  for (let i = 0; i < 12; i++) {
    try {
      await readFile(resolve(dir, 'pnpm-workspace.yaml'));
      return dir;
    } catch {
      // not here
    }
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  return null;
}
