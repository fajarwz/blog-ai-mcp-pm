import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { addTaskTool } from "./addTask.js";
import { getTasksTool } from "./getTasks.js";

export function registerTools(server: McpServer) {
  server.tool(addTaskTool.name, addTaskTool.description, addTaskTool.schema, addTaskTool.execute);
  server.tool(getTasksTool.name, getTasksTool.description, getTasksTool.schema, getTasksTool.execute);
}
