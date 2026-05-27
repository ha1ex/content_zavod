import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { registerListLandingsTool } from './list.js';
import { registerReadLandingTool } from './read.js';
import { registerValidateTool, registerBuildTool } from './run.js';

export function registerTools(server: McpServer): void {
  registerListLandingsTool(server);
  registerReadLandingTool(server);
  registerValidateTool(server);
  registerBuildTool(server);
}
