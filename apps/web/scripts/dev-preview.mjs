#!/usr/bin/env node
/**
 * Обёртка над `next dev` для превью-сервера.
 *
 * Зачем: harness при перезапуске превью убивает процесс `npm`, но дочерние
 * `next` / turbopack-воркеры осиротевают и продолжают держать порт. Тогда новый
 * сервер цепляется к зависшему инстансу — «превью залипло». Здесь мы перед
 * стартом освобождаем порт от таких процессов, поэтому каждый запуск чистый.
 *
 * Порт берётся из env PORT (его выставляет harness по launch.json), дефолт 3001.
 */
import { execSync, spawn } from 'node:child_process';
import { createRequire } from 'node:module';

const port = process.env.PORT || '3001';

// Резолвим бинарник next явно, а не полагаемся на PATH: скрипт запускается и
// через `npm run` (PATH содержит .bin), и напрямую `node` (не содержит).
const require = createRequire(import.meta.url);
const nextBin = require.resolve('next/dist/bin/next');

/** Убить всех, кто слушает порт (осиротевшие процессы прошлого запуска). */
function freePort(p) {
  try {
    // -sTCP:LISTEN — только слушатели, чтобы не задеть случайные соединения.
    const out = execSync(`lsof -ti tcp:${p} -sTCP:LISTEN`, {
      stdio: ['ignore', 'pipe', 'ignore'],
    }).toString();
    const pids = out.split('\n').map((s) => s.trim()).filter(Boolean);
    for (const pid of pids) {
      try {
        process.kill(Number(pid), 'SIGKILL');
        console.log(`[dev:preview] порт ${p} освобождён — снят осиротевший PID ${pid}`);
      } catch {
        /* уже мёртв */
      }
    }
  } catch {
    /* lsof вернул ненулевой код — порт свободен (или lsof недоступен на платформе) */
  }
}

// Освобождаем и переданный порт, и канонический 3001. Второе обязательно:
// Next 16 держит глобальный next-dev lock и падает с «another server already
// running», даже если сам сел на другой порт из-за autoPort, — пока осиротевший
// процесс на 3001 жив. Чистим оба, чтобы такого не было.
freePort(port);
if (port !== '3001') freePort('3001');

const child = spawn(process.execPath, [nextBin, 'dev', '--turbopack'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_DIST_DIR: '.next-preview' },
});

// Чистое завершение: пробрасываем сигналы дочернему next, чтобы он не осиротел
// при штатной остановке (в дополнение к освобождению порта на старте).
for (const sig of ['SIGINT', 'SIGTERM', 'SIGHUP']) {
  process.on(sig, () => child.kill(sig));
}
child.on('exit', (code) => process.exit(code ?? 0));
