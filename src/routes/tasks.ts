import { run } from "@openai/agents";
import express from "express";
import z from "zod";
import { agent } from "../agent.js";

const tasksRouter = express.Router();

tasksRouter.post("/chat", async (req, res) => {
  try {
    const chatSchema = z.object({
      query: z.string().min(1),
    });

    const parsed = chatSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        error: "Invalid request body",
      });
    }

    const { query } = parsed.data;

    const systemInstruction = `Always use the current date: ${new Date().toLocaleDateString("en-GB")}.`;
    const result = await run(agent, [
      {
        role: "system",
        content: systemInstruction,
      },
      {
        role: "user",
        content: query,
      },
    ]);

    return res.json({
      data: {
        answer: result.finalOutput,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default tasksRouter;
