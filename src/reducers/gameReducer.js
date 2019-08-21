const INITIAL_STATE = {
  /*name: "Mölkkygame",
  currentRound: 1,
  currentPlayer: 0,
  players: []*/
  //name: "Mölkkygame",

  currentRound: 1,
  currentPlayer: 0,
  players: [
    {
      name: "Jonni",
      gameData: [{ round: 1, turns: [5, 3, 2] }, { round: 2, turns: [2, 5, 2] }]
    },
    {
      name: "Sonja",
      gameData: [{ round: 1, turns: [5, 1, 2] }, { round: 2, turns: [2, 5, 5] }]
    }
  ]
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
      /*const changedTurnScore = [...state.players];

      const currentRoundTurns = state.players[
        state.currentPlayer
      ].gameData.filter(gameData => gameData.round === state.currentRound);

      if (!currentRoundTurns) {
        changedTurnScore[state.currentPlayer].gamedata.push({
          round: state.currentRound,
          turns: [{ turn: 1, points: action.payload }]
        });
      }

      changedTurnScore[state.currentPlayer].gamedata = action.payload;
      return {
        ...state,
        players: changedTurnScore
      };*/

      //will return index if has current round already
      const gameDataRoundIndex = state.players[
        state.currentPlayer
      ].gameData.findIndex(item => item.round === state.currentRound);
      const changedScore = [...state.players];

      console.log(gameDataRoundIndex);
      console.log(changedScore);

      if (gameDataRoundIndex < 0) {
        changedScore[state.currentPlayer].gameData.push({
          round: state.currentRound,
          turns: [...action.payload]
        });
      } else {
        changedScore[state.currentPlayer].gameData[
          gameDataRoundIndex
        ].turns.push(action.payload);
      }

      const changeRound =
        state.currentPlayer++ === state.players.length - 1 ? true : false;
      const nextPlayer = changeRound ? 0 : state.currentPlayer++;
      return { ...state, currentPlayer: nextPlayer, players: changedScore };

    default:
      return state;
  }
};
