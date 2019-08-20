const INITIAL_STATE = {
    name: 'Mölkkygame',
    currentRound: 1,
    currentPlayer: 0,
    players: []
  };
  
  export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
    case 'CHANGE_CURRENT_PLAYER':
        return { ...state, currentPlayer: action.payload };
    case 'CHANGE_GAME_NAME':
        return { ...state, name: action.payload };
    case 'CHANGE_GAME_ROUND':
        return { ...state, currentRound: action.payload };
    case 'ADD_GAME_PLAYER':
        const newPlayer = {
            name: '',
            gameData: [
            ]
        };
        return {
            ...state,
            players: [...state.players, newPlayer]
        };
    case 'CHANGE_PLAYER_NAME':
        const { playerIndex, name } = action.payload;
        let changedPlayers = state.players;
        changedPlayers[playerIndex].name = name;
        return {
            ...state,
            players: changedPlayers
        };
    default:
        return state;
    }
  };