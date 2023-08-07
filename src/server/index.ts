import { publicProcedure, router } from "./trpc";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { Configuration, OpenAIApi } from "openai";

const prisma = new PrismaClient();

export const appRouter = router({
  userList: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),
  tagList: publicProcedure.query(async () => {
    return await prisma.tag.findMany();
  }),
  projectList: publicProcedure.query(async () => {
    return await prisma.project.findMany();
  }),
  taskCreate: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
        status: z.enum([
          "BACKLOG",
          "TODO",
          "IN_PROGRESS",
          "IN_REVIEW",
          "DONE",
          "CANCELED",
        ]),
        assigneeId: z.number(),
        priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
        projectId: z.number(),
        tagsOnTasks: z.array(z.number()),
      })
    )
    .mutation(async (opts) => {
      const { input } = opts;
      const tags = input.tagsOnTasks.map((tag) => ({
        tag: { connect: { id: tag } },
      }));
      try {
        return await prisma.task.create({
          data: {
            ...input,
            // @ts-ignore
            tagsOnTasks: tags,
          },
        });
      } catch (e) {
        console.log(e);
      }
    }),
  openAI: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async (props) => {
      const { title, description } = props.input;
      const projects = await prisma.tag.findMany();
      const tags = await prisma.project.findMany();

      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
      const openAi = new OpenAIApi(configuration);

      const systemPrompt = `You are a helpful project manager`;

      const prompt = `I want to create a task on a project management tool with name "${title}" and description "${description}"
The project management tool has next tags: "${tags
        .map((tag) => tag.name)
        .join(",")}" and next projects: "${projects
        .map((project) => project.name)
        .join(",")}"
I want you to suggest me a project name and a tags to apply to this task.
If there are no relevant project - return null as the value for the 'projectName'.
If there are no relevant tags - return empty array as the value for the 'tags'.
Do not include any explanations, only provide a  RFC8259 compliant JSON response  following this format without deviation.
{
  "projectName": "project name",
  "tags": ["tag1", "tag2"]
}
The JSON response:`;
      try {
        const completion = await openAi.createChatCompletion({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt },
          ],
        });
        return JSON.parse(completion.data.choices[0]?.message?.content ?? "{}");
      } catch (e) {
        console.log("in catch");
      }
    }),
});

export type AppRouter = typeof appRouter;
