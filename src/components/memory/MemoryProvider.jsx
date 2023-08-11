import { createContext, useCallback, useContext, useReducer } from "react";
import {
  CARD_ACTION,
  CARD_STATUS,
  GAME_ACTION,
  GAME_STATUS,
  getInitialMemory,
  isPairCards,
} from "../../lib/memory";

// {
//   cards,
//   tryCount,
//   updateCard
// }
const MemoryContext = createContext(null);

const cardsInitialState = {
  cards: getInitialMemory(),
};

const gameInitialState = {
  tryCount: 0,
  gameStatus: GAME_STATUS.PLAYING,
};

const cardReducer = ({ cards }, action) => {
  switch (action.type) {
    case CARD_ACTION.UPDATE:
      return {
        cards: cards.map((card) => {
          if (card.id === action.id) {
            // Create a *new* object with changes
            return { ...card, status: action.status };
          } else {
            // No changes
            return card;
          }
        }),
      };

    case "reset":
      return cardsInitialState;
  }
};

const gameReducer = (state, action) => {
  const { gameStatus, tryCount } = state;
  switch (action.type) {
    case GAME_ACTION.RETURN_CARD:
      return {
        gameStatus:
          gameStatus === GAME_STATUS.PLAYING
            ? GAME_STATUS.WAITING_FOR_SECOND_CARD
            : GAME_STATUS.WAIT_FOR_CLEAR,
        tryCount,
      };
    case GAME_ACTION.CLEAR:
      return { gameStatus: GAME_STATUS.PLAYING, tryCount: tryCount + 1 };
    case GAME_ACTION.RESET:
      return gameInitialState;
  }
};

export const MemoryContextProvider = ({ children }) => {
  const [{ cards }, cardDispatch] = useReducer(cardReducer, cardsInitialState);
  const [{ gameStatus, tryCount }, gameDispatch] = useReducer(
    gameReducer,
    gameInitialState
  );

  console.log("gameStatus:", gameStatus);

  const updateCard = useCallback(
    (id) => {
      if (gameStatus === GAME_STATUS.PLAYING) {
        cardDispatch({
          type: CARD_ACTION.UPDATE,
          id,
          status: CARD_STATUS.RETURNED,
        });
        gameDispatch({ type: GAME_ACTION.RETURN_CARD });
      } else if (gameStatus === GAME_STATUS.WAITING_FOR_SECOND_CARD) {
        cardDispatch({
          type: CARD_ACTION.UPDATE,
          id,
          status: CARD_STATUS.RETURNED,
        });
        gameDispatch({ type: GAME_ACTION.RETURN_CARD });
      } else if (gameStatus === GAME_STATUS.WAIT_FOR_CLEAR) {
      }
    },
    [gameStatus]
  );

  return (
    <MemoryContext.Provider value={{ cards, updateCard, gameStatus, tryCount }}>
      {children}
    </MemoryContext.Provider>
  );
};

export const useMemoryContext = () => {
  const memoryContext = useContext(MemoryContext);
  if (!memoryContext) throw new Error("No memoryContext found");
  return memoryContext;
};
