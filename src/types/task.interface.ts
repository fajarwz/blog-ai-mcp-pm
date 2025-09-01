import type { TASK_STATUSES } from "../config/constants.js";

export type TaskStatus =  typeof TASK_STATUSES[number];

export interface Task {
  task: string;
  assignee?: string;
  status: TaskStatus;
  createdDate?: string;
  dueDate?: string;
}
