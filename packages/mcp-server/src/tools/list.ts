import { readdir, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { resolveRepoRoot } from '../repo.js';

export function registerListLandingsTool(server: McpServer) {
  server.registerTool(
    'list_landings',
    {
      description:
        'Список всех сгенерированных лендингов в content/landings/. Возвращает slug, путь к JSON, размер, mtime.',
      inputSchema: {},
    },
    async () => {
      const root = await resolveRepoRoot();
      const dir = resolve(root, 'content', 'landings');
      let files: string[] = [];
      try {
        files = await readdir(dir);
      } catch (err) {
        if (
          err &&
          typeof err === 'object' &&
          'code' in err &&
          (err as { code: string }).code === 'ENOENT'
        ) {
          return {
            content: [
              { type: 'text', text: 'Пока нет лендингов. Создайте brief и запустите harness agent build.' },
            ],
          };
        }
        throw err;
      }
      const entries: Array<{ slug: string; bytes: number; mtime: string }> = [];
      for (const file of files) {
        if (!file.endsWith('.json')) continue;
        const fullPath = resolve(dir, file);
        const info = await stat(fullPath);
        entries.push({
          slug: file.replace(/\.json$/, ''),
          bytes: info.size,
          mtime: info.mtime.toISOString(),
        });
      }
      entries.sort((a, b) => a.slug.localeCompare(b.slug));

      const summary = entries.length
        ? entries
            .map((e) => `- ${e.slug} (${(e.bytes / 1024).toFixed(1)} KB, обновлён ${e.mtime})`)
            .join('\n')
        : 'Пока нет лендингов.';

      return {
        content: [
          { type: 'text', text: `Найдено лендингов: ${entries.length}\n\n${summary}` },
        ],
        structuredContent: { landings: entries },
      };
    },
  );
}
