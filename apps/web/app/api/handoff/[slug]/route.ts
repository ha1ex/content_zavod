import { buildHandoff } from '@kaiten/harness/handoff';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function findRepoRoot(): string {
  return resolve(process.cwd(), '..', '..');
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ slug: string }> },
): Promise<Response> {
  const { slug } = await ctx.params;

  if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
    return new Response(JSON.stringify({ error: 'invalid slug' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  try {
    const root = findRepoRoot();
    const manifest = await buildHandoff(slug, { root });
    const buffer = await readFile(manifest.zipPath);
    return new Response(new Uint8Array(buffer), {
      status: 200,
      headers: {
        'content-type': 'application/zip',
        'content-disposition': `attachment; filename="landing-${slug}.zip"`,
        'content-length': String(buffer.byteLength),
        'x-handoff-files': String(manifest.files.length),
        'x-handoff-components': manifest.components.join(','),
        'cache-control': 'no-store',
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'unknown error';
    const status = /not found/i.test(message) ? 404 : 500;
    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { 'content-type': 'application/json' },
    });
  }
}
