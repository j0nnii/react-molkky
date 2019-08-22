const INITIAL_STATE = {
  currentRound: 1,
  currentPlayer: 0,
  players: [],
  winners: [],
  dismissed: []
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
      const { playerIndex, name } = action.payload;
      const changedPlayers = [...state.players];
      changedPlayers[playerIndex].name = name;
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

      // Get current players gamedata index based on round
      const changedRoundIndex = state.players[
        state.currentPlayer
      ].gameData.findIndex(item => item.round === state.currentRound);

      // Get current round turns for current player
      const currentRoundPlayerTurns = changedScore[state.currentPlayer].gameData[changedRoundIndex].turns;

      // Get current round points
      const currentRoundPoints = currentRoundPlayerTurns.reduce((a, b) => a + b);

      // Change round? 
      const changeRound =
        state.currentPlayer + 1 === state.players.length ? true : false;
      
      // Who is the next player?
      const nextPlayer = changeRound ? 0 : state.currentPlayer + 1;

      // Check if player should be dismissed
      let playerDismissed = false;
      if (currentRoundPlayerTurns.length >= 3 && currentRoundPlayerTurns[currentRoundPlayerTurns.length-1] === 0 && currentRoundPlayerTurns[currentRoundPlayerTurns.length-2] === 0 && currentRoundPlayerTurns[currentRoundPlayerTurns.length-3] === 0) {
        playerDismissed = true;
      }

      // Throw user back to score 25 if his total goes over 50
      if (currentRoundPoints > 50) {
        changedScore[state.currentPlayer].gameData[changedRoundIndex].turns = [25];
      }

      return {
        ...state,
        winners:
          // if we have a winner then mark him, also lets not change currentPlayer then
          currentRoundPoints === 50
            ? [
                ...state.winners,
                {
                  round: state.currentRound,
                  winner: state.currentPlayer,
                  name: state.players[state.currentPlayer].name
                }
              ]
            : state.winners,
        dismissed:
          // if we have 3 consequtive 0s for player, then throw him out
          playerDismissed
            ? [
                ...state.dismissed,
                {
                  round: state.currentRound,
                  player: state.currentPlayer,
                  name: state.players[state.currentPlayer].name
                }
              ]
            : state.winners,
         
        currentPlayer:
          currentRoundPoints === 50 ? state.currentPlayer : nextPlayer,
        players: changedScore
      };

    default:
      return state;
  }
};
