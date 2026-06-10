#!/usr/bin/env node
/**
 * Запускает дашборд-справочник «Как устроен конвейер»: поднимает dev-сервер
 * (если ещё не запущен) и открывает http://localhost:3000/pipeline в браузере.
 *
 * Идемпотентен: если dev-сервер уже работает на :3000 — просто открывает
 * страницу, второй сервер не стартует. Ctrl+C завершает dev-сервер.
 *
 * Usage:
 *   pnpm run pipeline:docs
 */

import { spawn } from 'node:child_process';

const BASE_URL = 'http://localhost:3000';
const PAGE_URL = `${BASE_URL}/pipeline`;
// Как webServer.timeout в apps/web/playwright.config.ts — холодный старт next dev.
const WAIT_TIMEOUT_MS = 120_000;

async function isUp() {
  try {
    await fetch(BASE_URL, { signal: AbortSignal.timeout(1000) });
    return true;
  } catch {
    return false;
  }
}

function openBrowser(url) {
  if (process.platform === 'darwin') {
    spawn('open', [url], { stdio: 'ignore', detached: true }).unref();
  } else {
    console.log(`Откройте в браузере: ${url}`);
  }
}

if (await isUp()) {
  console.log(`Dev-сервер уже работает — открываю ${PAGE_URL}`);
  openBrowser(PAGE_URL);
  process.exit(0);
}

console.log('Поднимаю dev-сервер (@kaiten/web), это может занять до пары минут…');
const child = spawn('pnpm', ['--filter', '@kaiten/web', 'dev'], { stdio: 'inherit' });
child.on('exit', (code) => process.exit(code ?? 0));

const deadline = Date.now() + WAIT_TIMEOUT_MS;
let opened = false;
while (!opened && Date.now() < deadline) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (await isUp()) {
    console.log(`Готово — открываю ${PAGE_URL}`);
    openBrowser(PAGE_URL);
    opened = true;
  }
}
if (!opened) {
  console.warn(`Сервер не ответил за ${WAIT_TIMEOUT_MS / 1000} с — откройте вручную: ${PAGE_URL}`);
}
// Дальше скрипт живёт вместе с dev-сервером (stdio inherit), Ctrl+C гасит оба.
