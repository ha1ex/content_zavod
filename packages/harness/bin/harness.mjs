#!/usr/bin/env node
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const entry = resolve(here, '../src/cli.ts');
const tsx = resolve(here, '../node_modules/.bin/tsx');

const result = spawnSync(tsx, [entry, ...process.argv.slice(2)], { stdio: 'inherit' });
process.exit(result.status ?? 1);
