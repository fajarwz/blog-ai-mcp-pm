import express from "express";
import tasksRouter from "./routes/tasks.js";
import { config } from "./config/config.js";

const app = express();
app.use(express.json());

app.use("/api/tasks", tasksRouter);

app.listen(config.port, () => console.log(`Server running on http://localhost:${config.port}`));
