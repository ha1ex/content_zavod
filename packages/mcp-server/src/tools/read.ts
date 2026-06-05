import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LandingSpecSchema } from '@kaiten/harness/schemas';
import { resolveRepoRoot } from '../repo.js';

export function registerReadLandingTool(server: McpServer) {
  server.registerTool(
    'read_landing',
    {
      description:
        'Прочитать LandingSpec JSON по slug. Валидирует через LandingSpecSchema перед возвратом. Используется, чтобы посмотреть структуру лендинга перед редактированием.',
      inputSchema: {
        slug: z.string().min(1).max(64).describe('slug лендинга (название файла без .json)'),
      },
    },
    async ({ slug }) => {
      if (!/^[a-zA-Z0-9_-]+$/.test(slug)) {
        return {
          isError: true,
          content: [{ type: 'text', text: `Недопустимый slug: ${slug}` }],
        };
      }
      const root = await resolveRepoRoot();
      const path = resolve(root, 'content', 'landings', `${slug}.json`);
      let raw: string;
      try {
        raw = await readFile(path, 'utf-8');
      } catch (err) {
        if (
          err &&
          typeof err === 'object' &&
          'code' in err &&
          (err as { code: string }).code === 'ENOENT'
        ) {
          return {
            isError: true,
            content: [{ type: 'text', text: `Лендинг ${slug} не найден (${path}).` }],
          };
        }
        throw err;
      }
      const parsed = LandingSpecSchema.safeParse(JSON.parse(raw));
      if (!parsed.success) {
        return {
          isError: true,
          content: [
            {
              type: 'text',
              text: `Spec для ${slug} не прошёл Zod-валидацию:\n${JSON.stringify(parsed.error.flatten(), null, 2)}`,
            },
          ],
        };
      }
      return {
        content: [
          {
            type: 'text',
            text: `Лендинг ${slug}: ${parsed.data.sections.length} секций. Layout: ${
              (parsed.data.meta as { layout?: string } | undefined)?.layout ?? '—'
            }. Domain: ${
              (parsed.data.meta as { domain?: string } | undefined)?.domain ?? '—'
            }.`,
          },
          {
            type: 'text',
            text: '```json\n' + JSON.stringify(parsed.data, null, 2) + '\n```',
          },
        ],
        structuredContent: { spec: parsed.data },
      };
    },
  );
}
