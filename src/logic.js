let game = {
  name: 'Testi',
  players: [
    {
      name: 'Jonni',
      gameData: [
        { round: 1, turns: [{ turn: 1, points: 5 }, { turn: 2, points: 5 }] },
        { round: 2, turns: [{ turn: 1, points: 6 }, { turn: 2, points: 7 }] }
      ]
    },
    {
      name: 'Sonja',
      gameData: [
        { round: 1, turns: [{ turn: 1, points: 6 }, { turn: 2, points: 7 }] },
        { round: 2, turns: [{ turn: 1, points: 6 }, { turn: 2, points: 7 }] }
      ]
    }
  ]
};

//console.log(game.players[0].name);
//const result = game.players.filter(player => player.name === 'Jonni');
//console.log(result);

let currentRoundTurns = game.players[0].gameData.filter(
  gameData => gameData.round === 1
);
console.log(currentRoundTurns);

const currentRoundPoints = currentRoundTurns[0].turns.reduce(
  (a, b) => a.points + b.points
);
console.log(currentRoundPoints);
