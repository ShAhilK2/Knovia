"use client";
import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { useCreateLeaningMutationGoal } from "@/hooks/use-goals";

const AddLearningGoal = ({
  selectedCommunityId,
}: {
  selectedCommunityId: string;
}) => {
  console.log("selectedCommunityId", selectedCommunityId);
  const [showlearningform, setShowLearningForm] = useState(false);

  const [goalText, setGoalText] = useState("");

  const createGoalMutation = useCreateLeaningMutationGoal();

  const handleCreateGoal = async () => {
    try {
      // mutation
      await createGoalMutation.mutateAsync({
        communityId: selectedCommunityId,
        title: goalText.slice(0, 100),
        description: goalText,
        tags: [],
      });

      console.log("Creating goal:", goalText);
    } catch (error) {
      console.error("Error creating goal:", error);
    } finally {
      setShowLearningForm(false);
      setGoalText("");
    }
  };

  return (
    <div>
      {showlearningform ? (
        <div className="space-y-3 pt-3 border-t">
          <Textarea
            placeholder="What do you want to learn ?"
            value={goalText}
            onChange={(e) => setGoalText(e.target.value)}
            rows={4}
            className="resize-none"
          />

          <div className="flex gap-2">
            <Button
              size={"sm"}
              disabled={createGoalMutation.isPending || goalText.length === 0}
              onClick={() => handleCreateGoal()}
            >
              Add Goal
            </Button>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setShowLearningForm(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          className="w-full"
          variant={"outline"}
          onClick={() => setShowLearningForm(true)}
        >
          <PlusIcon className="size-3" />
          Add Learning Goal
        </Button>
      )}
    </div>
  );
};

export default AddLearningGoal;
