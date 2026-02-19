import { db } from "@/db";
import { communities, communityMembers } from "@/db/schema";
import { getOrCreateUserByClerkId } from "@/lib/user-utils";
import { eq } from "drizzle-orm";
import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

type Variables = {
  userId: string;
};

const communitiesApp = new Hono<{ Variables: Variables }>()
  .get("/all", async (c) => {
    const allCommunities = await db.select().from(communities);
    return c.json({ allCommunities });
  })
  .get("/", async (c) => {
    const clerkId = c.get("userId") as string;

    const user = await getOrCreateUserByClerkId(clerkId);

    if (!user) {
      return c.json([]);
    }

    const userCommunities = await db
      .select({
        id: communityMembers.id,
        userId: communityMembers.userId,
        communityId: communityMembers.communityId,
        joinedAt: communityMembers.joinedAt,
        community: communities,
      })
      .from(communityMembers)
      .innerJoin(communities, eq(communityMembers.communityId, communities.id))
      .where(eq(communityMembers.userId, user.id));
    return c.json(userCommunities);
  })
  .post("/:communityId/join", async (c) => {
    const clerkId = c.get("userId") as string;

    const communityId = c.req.param("communityId");

    const [community] = await db
      .select()
      .from(communities)
      .where(eq(communities.id, communityId));

    if (!community) {
      throw new HTTPException(404, { message: "Community not found" });
    }
    await db.insert(communityMembers).values({
      userId: clerkId,
      communityId,
    });

    return c.json({ message: "Joined community successfully" });
  });
export { communitiesApp };
