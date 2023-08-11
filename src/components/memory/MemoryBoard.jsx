import { Typography } from "../atom/Typography";
import { MemoryCard } from "./MemoryCard";
import { useMemoryContext } from "./MemoryProvider";

export const MemoryBoard = () => {
  // Memory Game - Exercise
  const { cards, updateCard } = useMemoryContext();

  if (!cards?.length) {
    return (
      <Typography variant="body2">
        An error occurs, there is no board.
      </Typography>
    );
  }

  return (
    <div className="grid w-max grid-cols-6 grid-rows-6 gap-2">
      {cards.map((card) => (
        <MemoryCard
          key={card.id}
          card={card}
          onClick={() => updateCard(card.id)}
        >
          {card.emoji}
        </MemoryCard>
      ))}
    </div>
  );
};
