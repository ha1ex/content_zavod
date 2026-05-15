import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const nextConfig: NextConfig = {
  transpilePackages: ['@buffalo/harness', '@buffalo/ui'],
  typedRoutes: true,
  turbopack: {
    root: resolve(process.cwd(), '..', '..'),
  },
};

export default nextConfig;
