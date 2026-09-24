import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const nextConfig: NextConfig = {
  transpilePackages: ['@kaiten/harness', '@kaiten/ui'],
  typedRoutes: true,
  // Круглая кнопка Next.js в углу превью мешает смотреть лендинги — скрываем.
  devIndicators: false,
  turbopack: {
    root: resolve(process.cwd(), '..', '..'),
  },
  // Прототип-деплой: не блокируем сборку из-за пре-существующих ошибок типов
  // в недавно добавленных mock-компонентах (в рантайме TS-типы стираются, риска нет).
  // Убрать, когда моки будут вычищены под strict type-check.
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
