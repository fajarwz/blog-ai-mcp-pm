import { z } from "zod";
import { TASK_STATUSES } from "../config/constants.js";
import { sheets } from "../services/googleSheetsService.js";
import { toolResponse } from "../utils/formatters.js";
import { formatDate } from "../utils/helpers.js";
import { config } from "../config/config.js";

const addTaskToolSchema = {
  task: z.string().max(1000).describe("The task to assign"),
  assignee: z.string().max(100).describe("The name of the person that should be assigned to"),
  status: z.enum(TASK_STATUSES).describe("Status of the task"),
  dueDate: z.string().max(100).describe("Due date of the task with toLocaleDateString format (DD/MM/YYYY)"),
};

const zAddTaskToolSchema = z.object(addTaskToolSchema);

type AddTaskToolProps = z.infer<typeof zAddTaskToolSchema>;

export const addTaskTool = {
  name: "add_task",
  description: "Add task to the spreadsheet",
  schema: addTaskToolSchema,
  async execute({ task, assignee, status, dueDate }: AddTaskToolProps): Promise<any> {
    try {
      if (!config.spreadsheet.id) {
        return toolResponse("Spreadsheet ID is missng");
      }

      const createdDate = formatDate(new Date);
      const values = [[task, assignee, status, createdDate, dueDate]];
      await sheets.spreadsheets.values.append({
        spreadsheetId: config.spreadsheet.id,
        range: "Tasks!A:E",
        valueInputOption: "USER_ENTERED",
        requestBody: { values },
      });

      const message = `✅ Task added:\n- Task: ${task}\n- Assignee: ${assignee}\n- Status: ${status}\n- Created: ${createdDate}\n- Due: ${dueDate}`;

      return toolResponse(message);
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },
};
