import { db } from "@/db";
import { communities, communityMembers, learningGoals } from "@/db/schema";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";
import { and, eq } from "drizzle-orm";
import { Context, Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import z, { json, ZodType } from "zod";

type Variables = {
  userId: string;
};

const validateBody = async <T>(c: Context, schema: ZodType<T>): Promise<T> => {
  const body = await c.req.json(); // ✅ Await the promise
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors = parsed.error.issues.map((issue) => ({
      field: issue.path.join("."),
      message: issue.message,
    }));
    throw new HTTPException(400, {
      message:
        errors.length === 1
          ? errors[0].message
          : `Validation failed: ${errors.map((error) => error.message).join(", ")}`,
    });
  }
  return parsed.data;
};
const createGoalSchema = z.object({
  title: z.string().min(1, "Title is Required"),
  description: z.string().optional(),
  tags: z.array(z.string()).optional().default([]),
});

const learningGoalApp = new Hono<{ Variables: Variables }>()
  .get("/:communityId/goals", async (c) => {
    const clerkId = c.get("userId") as string;

    const communityId = c.req.param("communityId");

    const user = await getOrCreateUserByClerkId(clerkId);
    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const goals = await db
      .select()
      .from(learningGoals)
      .where(
        and(
          eq(learningGoals.communityId, communityId),
          eq(learningGoals.userId, user.id),
        ),
      );

    return c.json(goals);
  })
  .post("/:communityId/goals", async (c) => {
    const clerkId = c.get("userId") as string;
    const user = await getOrCreateUserByClerkId(clerkId);

    if (!user) {
      throw new HTTPException(404, { message: "User not found" });
    }

    const body = await validateBody(c, createGoalSchema);

    const [goals] = await db
      .insert(learningGoals)
      .values({
        userId: user.id,
        communityId: c.req.param("communityId"),
        title: body.title,
        description: body.description,
        tags: body.tags || [],
      })
      .returning();

    return c.json(goals);
  });

export default learningGoalApp;
