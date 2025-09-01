import { Agent, MCPServerStdio } from "@openai/agents";
import OpenAI from "openai";
import { config } from "./config/config.js";

const client = new OpenAI({ apiKey: config.openAI.apiKey });

const mcpServer = new MCPServerStdio({
  name: "pmMcp",
  fullCommand: config.isProd ? "node ./dist/mcpServer.js" : "tsx ./src/mcpServer.ts",
});

mcpServer.connect();

export const agent = new Agent({
  name: "PMAgent",
  instructions: "You are a project management agent. Help the user with adding and getting all tasks.",
  mcpServers: [mcpServer],
});
