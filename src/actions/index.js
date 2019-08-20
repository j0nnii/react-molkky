export const changeGameName = (name) => {
    return {
      type: 'CHANGE_GAME_NAME',
      payload: name
    };
  }

  export const changeGameRound = (round) => {
    return {
      type: 'CHANGE_GAME_ROUND',
      payload: round
    };
  }

  export const addGamePlayer = () => {
    return {
      type: 'ADD_GAME_PLAYER'
    };
  }

  export const changePlayerName = (playerIndex, name) => {
    return {
      type: 'CHANGE_PLAYER_NAME',
      payload: { playerIndex, name }
    }
  }

  export const changeCurrentPlayer = (currentPlayer) => {
    return {
      type: 'CHANGE_CURRENT_PLAYER',
      payload: currentPlayer
    }
  }