#!/usr/bin/env node
/**
 * Синхронизирует logoSrc карточек каталога партнеров с реальными файлами в
 * apps/web/public/landings/partners/.
 *
 * Зачем: партнеры присылают логотипы вразнобой (svg, png, webp) и по одному.
 * Скрипт проходит по папке, проставляет в спеку фактический путь для каждого
 * найденного файла и печатает, по кому ассета еще нет.
 *
 * Запуск: node scripts/sync-partner-logos.mjs [--dry]
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SPEC = resolve(ROOT, 'content/landings/partners.json');
const ASSETS = resolve(ROOT, 'apps/web/public/landings/partners');
const ALLOWED = new Set(['.svg', '.png', '.webp']);
const dry = process.argv.includes('--dry');

const spec = JSON.parse(await readFile(SPEC, 'utf-8'));
const section = spec.sections.find((s) => s.id === 'partner_directory');
if (!section) {
  console.error('В спеке нет секции partner_directory');
  process.exit(1);
}

let files = [];
try {
  files = await readdir(ASSETS);
} catch {
  console.error(`Нет каталога ${ASSETS}`);
  process.exit(1);
}

// id → фактическое имя файла; при нескольких форматах приоритет у svg
const byId = new Map();
for (const f of files.sort()) {
  const ext = extname(f).toLowerCase();
  if (!ALLOWED.has(ext)) continue;
  const id = f.slice(0, -ext.length);
  if (!byId.has(id) || ext === '.svg') byId.set(id, f);
}

const missing = [];
let changed = 0;
for (const p of section.props.partners) {
  const file = byId.get(p.id);
  const next = file ? `/landings/partners/${file}` : `/landings/partners/${p.id}.svg`;
  if (!file) missing.push(`${p.name} → ${p.id}.svg`);
  if (p.logoSrc !== next) {
    p.logoSrc = next;
    changed += 1;
  }
}

const unmatched = [...byId.keys()].filter((id) => !section.props.partners.some((p) => p.id === id));

if (changed && !dry) await writeFile(SPEC, `${JSON.stringify(spec, null, 2)}\n`, 'utf-8');

console.log(`Логотипов на месте: ${byId.size - unmatched.length} из ${section.props.partners.length}`);
if (changed) console.log(`${dry ? 'Обновилось бы' : 'Обновлено'} путей: ${changed}`);
if (missing.length) console.log(`\nНет ассета (карточка покажет монограмму):\n  ${missing.join('\n  ')}`);
if (unmatched.length) console.log(`\nФайлы, которым не нашлось партнера:\n  ${unmatched.join('\n  ')}`);
