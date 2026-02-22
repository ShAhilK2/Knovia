"use client";
import { client } from "../lib/app-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateLeaningMutationGoal = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (goal: {
      communityId: string;
      title: string;
      description: string;
      tags: string[];
    }) => {
      // TODO: Implement goal creation mutation
      const res = await client.api.communities[":communityId"].goals.$post({
        param: {
          communityId: goal.communityId,
        },
        json: {
          title: goal.title,
          description: goal.description,
          tags: goal.tags,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to create goal");
      }

      return res.json();
    },
    onSuccess: (_, variables) => {
      // TODO: Invalidate goals query
      queryClient.invalidateQueries({
        queryKey: ["communityGoals", variables.communityId],
      });
    },
    onError: (error) => {
      console.error("Failed to create goal:", error);
    },
  });
};
