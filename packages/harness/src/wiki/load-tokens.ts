import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { DesignTokens } from './tokens-types';

export async function loadTokens(repoRoot: string): Promise<DesignTokens> {
  const path = resolve(repoRoot, 'design-system', 'kaiten-v01', 'tokens.json');
  const raw = await readFile(path, 'utf-8');
  const parsed = JSON.parse(raw) as DesignTokens;
  return parsed;
}
