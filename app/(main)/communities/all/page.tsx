"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import {
  useAllCommunities,
  useCommunities,
  useJoinCommunity,
} from "@/hooks/use-communties";

import { toast } from "sonner";

const page = () => {
  const {
    data: allCommunications,
    isLoading: isLoadingAllCommunications,
    error: allCommunicationsError,
  } = useAllCommunities();

  const { data: userCommunities } = useCommunities();
  const joinCommunityMutation = useJoinCommunity();

  if (isLoadingAllCommunications) {
    return <div>Loading...</div>;
  }

  if (allCommunicationsError) {
    return <div>Error: {allCommunicationsError.message}</div>;
  }

  console.log("userCommunities", userCommunities);

  const isJoined = (communityId: string) => {
    return userCommunities?.some(
      (community) => community.community.id === communityId,
    );
  };

  const handleJoinCommunity = async (communityId: string) => {
    await joinCommunityMutation.mutateAsync(communityId);
    toast.success("Joined community successfully");
  };

  return (
    <div>
      <Link href="/communities">
        <Button variant="outline">
          <ArrowLeft className="size-4" />
          Back to Communities
        </Button>
      </Link>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Browse Communities</h2>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allCommunications?.allCommunities?.map((community) => (
            <Card key={community.id}>
              <CardHeader>
                <CardTitle>{community.name}</CardTitle>
                <CardDescription>{community.description}</CardDescription>
                <CardFooter className="p-0 mt-4">
                  <Button
                    className="w-full "
                    disabled={isJoined(community.id)}
                    onClick={() => handleJoinCommunity(community.id)}
                  >
                    {/* {isJoined(community.id) */}
                    {isJoined(community.id) ? (
                      <>
                        <CheckIcon className="size-4" />
                        Joined
                      </>
                    ) : (
                      "Join Community"
                    )}
                  </Button>
                </CardFooter>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
