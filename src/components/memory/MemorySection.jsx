import { Button } from "../atom/Button";
import { SectionWrapper } from "../atom/SectionWrapper";
import { MemoryBoard } from "./MemoryBoard";
import { MemoryContextProvider, useMemoryContext } from "./MemoryProvider";

const MemoryScore = () => {
  const { tryCount } = useMemoryContext();

  return <p>You try {tryCount} times.</p>;
};

export const MemorySection = () => {
  return (
    <SectionWrapper title="You're boring ? Let's play a game !">
      <MemoryContextProvider>
        <div className="flex flex-col items-center gap-14">
          <div className="flex flex-col items-center gap-2">
            <MemoryScore />
            <MemoryBoard />
            <Button>Reset</Button>
          </div>
        </div>
      </MemoryContextProvider>
    </SectionWrapper>
  );
};
