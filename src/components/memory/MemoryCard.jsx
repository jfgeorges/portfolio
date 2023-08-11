import clsx from "clsx";
import styles from "./MemoryCard.module.css";
import { CARD_STATUS } from "../../lib/memory";

export const MemoryCard = ({ children, card, onClick }) => {
  const isReturned =
    card.status === CARD_STATUS.RETURNED || card.status === CARD_STATUS.FOUND;

  return (
    <div className="relative" onClick={() => onClick?.()}>
      <button
        className={clsx(
          styles.transition,
          "rounded border-primary bg-secondary p-0.5",
          {
            [clsx("!bg-red-400", styles.rotate)]: !isReturned,
            [clsx("!bg-green-400", styles.bounce)]:
              card.status === CARD_STATUS.FOUND,
          }
        )}
      >
        <span className="block rounded bg-paper p-2 text-3xl">{children}</span>
      </button>
      <button
        style={{ backfaceVisibility: "hidden" }}
        className={clsx(
          styles.transition,
          "absolute inset-0 flex rounded border-2 border-primary bg-paper p-3",
          {
            [styles.rotate]: isReturned,
          }
        )}
      >
        ❓{/* Memory Game - Exercise */}
      </button>
    </div>
  );
};
