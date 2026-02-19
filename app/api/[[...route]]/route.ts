import { db } from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";
import { eq } from "drizzle-orm";
import { communitiesApp } from "@/server/route";

type Variables = {
  userId: string;
};
const app = new Hono<{ Variables: Variables }>().basePath("/api");

// Error handles

app.onError((err, c) => {
  console.log("API Error : ", err);

  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  //   database error
  if (err instanceof Error) {
    if (err.message.includes("contraint") || err.message.includes("violates")) {
      return c.json({ error: "Invalid Data Provided" }, 400);
    }

    //   not found error
    if (
      err.message.includes("not found") ||
      err.message.includes("Not found")
    ) {
      return c.json({ error: err.message }, 404);
    }

    return c.json({ error: "Internal Server Error" }, 500);
  }

  //
  return c.json({ error: "Internal Server Error" }, 500);
});

// middleware

app.use("/*", async (c, next) => {
  const publicRoutes = ["/api/communities/all"];

  if (publicRoutes.includes(c.req.path)) {
    return await next();
  }

  const session = await auth();

  if (!session.userId) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  c.set("userId", session.userId);

  return await next();
});

const route = app.route("/communities", communitiesApp);

export type AppType = typeof route;

export const GET = handle(app);
export const POST = handle(app);
export const PUT = handle(app);
export const DELETE = handle(app);
