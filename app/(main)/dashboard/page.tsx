"use client";
import StatsCard from "@/components/dashboard/stats-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCommunities } from "@/hooks/use-communties";
import { useUser } from "@clerk/nextjs";
import { MessageCircleIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

const page = () => {
  const { user } = useUser();
  const {
    data: userCommunities,
    isLoading: isCommunitiesLoading,
    error: communitiesError,
  } = useCommunities();

  if (isCommunitiesLoading) {
    return <div>Loading...</div>;
  }

  if (communitiesError) {
    return <div>Error:{communitiesError.message}</div>;
  }

  const pendingMatches: number = 6;

  return (
    <div className="page-wrapper">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome Back,{user?.firstName || "User"} !
        </p>
      </div>

      <Card className="border-primary">
        <CardHeader>
          <CardTitle>
            🚀 You have {pendingMatches} new{" "}
            {pendingMatches === 1 ? "match" : "matches"}
          </CardTitle>
          <CardDescription>
            Review and accept ypur matches to start chatting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/chat">
            <Button>Review Matches</Button>
          </Link>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Total Communities"
          value={userCommunities?.length || 0}
        />
        <StatsCard title="Learning Goals" value={6} />
        <StatsCard title="Active Matches" value={6} />
        <StatsCard title="Pending Matches" value={pendingMatches} />
      </div>
      <div className="grid gap-6  lg:grid-cols-2 ">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center ">
                <MessageCircleIcon className="size-4 text-primary mr-2" />{" "}
                Recent chats
              </CardTitle>
              <Link href={"/communities"}>
                <Button variant={"outline"} size={"sm"}>
                  <UsersIcon className="size-4 text-primary" />
                  View all
                </Button>
              </Link>
            </div>

            <CardDescription>Communities you&apos;re part of</CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center ">
                <UsersIcon className="size-4 text-primary mr-2" /> Communities
              </CardTitle>
              <Link href={"/communities"}>
                <Button variant={"outline"} size={"sm"}>
                  <UsersIcon className="size-4 text-primary" />
                  Manage
                </Button>
              </Link>
            </div>

            <CardDescription>Communities you&apos;re part of</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-x-3">
              {userCommunities?.map((community: any) => (
                <Link key={community.id} href={`/communities/${community.id}`}>
                  <Card className="shadow-none">
                    <CardHeader>
                      <CardTitle className="text-sm">
                        {community.community.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {community.community.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default page;
