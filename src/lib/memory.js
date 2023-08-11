/**
 * Copied from https://bost.ocks.org/mike/shuffle/
 * @param array Array to be shuffled
 * @returns {*[]}
 */
export const shuffle = (array) => {
  const copy = [];
  let arrayLength = array.length;
  let i;

  // While there remain elements to shuffle…
  while (arrayLength) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * array.length);

    // If not already shuffled, move it to the new array.
    if (i in array) {
      copy.push(array[i]);
      delete array[i];
      arrayLength--;
    }
  }

  return copy;
};

const animals = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
];

export const CARD_STATUS = {
  HIDDEN: "hidden",
  FOUND: "found",
  RETURNED: "returned",
};

export const CARD_ACTION = {
  UPDATE: "update",
};

export const getInitialMemory = () => {
  return shuffle([...animals, ...animals]).map((v, i) => ({
    id: `card-${v}-${i}`,
    emoji: v,
    status: CARD_STATUS.HIDDEN,
  }));
};

export const GAME_STATUS = {
  PLAYING: "playing",
  FINISHED: "finished",
  WAITING_FOR_SECOND_CARD: "waitingForSecondCard",
  WAIT_FOR_CLEAR: "waitingForClear",
};

export const GAME_ACTION = {
  RETURN_CARD: "ReturnCard",
  CLEAR: "Clear",
  RESET: "Reset",
};

export const isPairCards = (card1, card2) => {
  return card1.emoji === card2.emoji;
};

export const isMemoryFinished = (cards) => {
  return cards.every((card) => card.status === CARD_STATUS.FOUND);
};
