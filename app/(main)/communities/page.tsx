"use client";
import AddLearningGoal from "@/components/communities/add-learning";
import AIMatching from "@/components/communities/ai-matching";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAllCommunities,
  useCommunities,
  useCommunityGoals,
} from "@/hooks/use-communties";
import { BotIcon } from "lucide-react";
import { startTransition, useEffect, useState } from "react";

const page = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(
    null,
  );

  const [activeTab, setActiveTab] = useState<"goal" | "matches">("goal");
  const {
    data: communities,
    isLoading: communitiesLoading,
    error: communitiesError,
  } = useCommunities();

  const {
    data: communityGoals,
    isLoading: communityGoalsLoading,
    error: communityGoalsError,
  } = useCommunityGoals(selectedCommunity);

  useEffect(() => {
    if (communities && communities.length > 0 && !selectedCommunity) {
      startTransition(() => {
        setSelectedCommunity(communities[0].community.id);
      });
    }
  }, [communities]);

  if (communitiesLoading) {
    return <div>Loading...</div>;
  }

  if (communitiesError) {
    return <div>Error: {communitiesError.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Community Name</CardTitle>
          <CardDescription>{communities?.length} joined</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {communities?.map((c) => (
            <Button
              key={c.id}
              className="justify-start w-full"
              variant={
                selectedCommunity === c.community.id ? "default" : "outline"
              }
              onClick={() => setSelectedCommunity(c.community.id)}
            >
              {c.community.name}
            </Button>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4 mb-4">
            <Button
              key="goal"
              variant={activeTab === "goal" ? "default" : "outline"}
              onClick={() => setActiveTab("goal")}
            >
              Goal
            </Button>
            <Button
              key="matches"
              variant={activeTab === "matches" ? "default" : "outline"}
              onClick={() => setActiveTab("matches")}
            >
              <BotIcon className="size-4" />
              Find Partners with AI
            </Button>
          </div>
          <CardTitle>
            {activeTab === "goal"
              ? "Learning Goals"
              : "Potential Learning Partners"}
          </CardTitle>

          <CardDescription>
            {activeTab === "goal"
              ? `${communityGoals?.length} ${communityGoals?.length === 1 ? "goal" : "goals"} in selected community`
              : "Members with similar learning goals"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {activeTab === "goal" ? (
            <div className="space-y-4">
              {communityGoals?.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader>
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <CardDescription>{goal.description}</CardDescription>
                  </CardHeader>
                </Card>
              ))}

              <AddLearningGoal selectedCommunityId={selectedCommunity!} />
            </div>
          ) : (
            <AIMatching totalGoals={communityGoals?.length || 0} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default page;
