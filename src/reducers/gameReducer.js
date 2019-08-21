const INITIAL_STATE = {
  /*name: "Mölkkygame",
  currentRound: 1,
  currentPlayer: 0,
  players: []*/
  //name: "Mölkkygame",

  currentRound: 1,
  currentPlayer: 0,
  players: []
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_PLAYER":
      return { ...state, currentPlayer: action.payload };
    case "SET_GAME_ROUND":
      return { ...state, currentRound: action.payload };
    case "ADD_GAME_PLAYER":
      const newPlayer = {
        name: "",
        gameData: []
      };
      return {
        ...state,
        players: [...state.players, newPlayer]
      };
    case "SET_PLAYER_NAME":
      const changedPlayers = [...state.players];
      changedPlayers[state.currentPlayer].name = action.payload;
      return {
        ...state,
        players: changedPlayers
      };
    case "ADD_TURN_SCORE":
      // Will return index if has current round already
      const gameDataRoundIndex = state.players[
        state.currentPlayer
      ].gameData.findIndex(item => item.round === state.currentRound);

      // Create new constant with copy of existing player state
      const changedScore = [...state.players];

      // If round is not found in player state, create it
      if (gameDataRoundIndex < 0) {
        changedScore[state.currentPlayer].gameData.push({
          round: state.currentRound,
          turns: [action.payload]
        });

        // Else just add score to turns
      } else {
        changedScore[state.currentPlayer].gameData[
          gameDataRoundIndex
        ].turns.push(action.payload);
      }

      //console.log(changedScore[state.currentPlayer].gameData[]);

      const changeRound =
        state.currentPlayer++ === state.players.length - 1 ? true : false;
      const nextPlayer = changeRound ? 0 : state.currentPlayer++;
      return { ...state, currentPlayer: nextPlayer, players: changedScore };

    default:
      return state;
  }
};
