export const setGameRound = round => {
  return {
    type: "SET_GAME_ROUND",
    payload: round
  };
};

export const addGamePlayer = () => {
  return {
    type: "ADD_GAME_PLAYER"
  };
};

export const setPlayerName = (playerIndex, name) => {
  return {
    type: "SET_PLAYER_NAME",
    payload: { playerIndex, name }
  };
};

export const setCurrentPlayer = currentPlayer => {
  return {
    type: "SET_CURRENT_PLAYER",
    payload: currentPlayer
  };
};

export const addTurnScore = score => {
  return {
    type: "ADD_TURN_SCORE",
    payload: score
  };
};
