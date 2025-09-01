import { z } from "zod";
import { sheets } from "../services/googleSheetsService.js";
import type { Task } from "../types/task.interface.js";
import { toolResponse } from "../utils/formatters.js";
import { config } from "../config/config.js";

export const getTasksTool = {
  name: "get_tasks",
  description: "Get all tasks",
  schema: {},
  async execute(): Promise<any> {
    try {
      if (!config.spreadsheet.id) {
        return toolResponse("Spreadsheet ID is missng");
      }

      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: config.spreadsheet.id,
        range: "Tasks!A:E",
      });

      const rows = response.data.values || [];
      if (rows.length <= 1) {
        return toolResponse("📭 No tasks found.");
      }

      // skip header row
      const tasks: Task[] = rows.slice(1).map((row) => ({
        task: row[0] || "",
        assignee: row[1] || "",
        status: (row[2] as Task["status"]) || "Todo",
        createdDate: row[3] || "",
        dueDate: row[4] || "",
      }));

      // Format tasks as text
      const formattedTasks = tasks
        .map(
          (t, i) =>
            `${i + 1}. ${t.task} — ${t.assignee} [${t.status}] (Created: ${t.createdDate}, Due: ${t.dueDate})`
        )
        .join("\n");

      return toolResponse(`📋 Task list:\n\n${formattedTasks}`);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw new Error("Failed to fetch tasks");
    }
  },
};
