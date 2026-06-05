#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerTools } from './tools/index.js';

async function main() {
  const server = new McpServer({
    name: 'kaiten',
    version: '0.1.0',
  });

  registerTools(server);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  // Server listens via stdio until parent process closes
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('[kaiten-mcp] fatal:', err);
  process.exit(1);
});
