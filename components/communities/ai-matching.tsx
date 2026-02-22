import { Button } from "../ui/button";

const AIMatching = ({ totalGoals }: { totalGoals: number }) => {
  return (
    <div className={`text-center py-8`}>
      <div className="mb-4">
        <h3 className="text-lg  font-semibold mb-2">AI-Powered Matching</h3>
        <p>
          Our AI will analyze your learning goal and automatically match you
          with the most compatible community learnibg partners in this
          community.
        </p>
      </div>
      <Button size={"lg"} className="mb-4" disabled={totalGoals === 0}>
        🤖 Find Partners with AI
      </Button>

      {totalGoals === 0 && (
        <p className="text-sm text-muted-foreground">
          Add learning goals first to enalbe AI matching
        </p>
      )}

      {totalGoals > 0 && (
        <p className="text-sm text-muted-foreground">
          You have {totalGoals} learning goal{totalGoals !== 1 ? "s" : ""} set
        </p>
      )}
    </div>
  );
};

export default AIMatching;
