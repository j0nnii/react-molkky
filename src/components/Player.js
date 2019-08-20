import React, { useState } from 'react';

const Player = ({ isCurrentPlayer, playerIndex, score, onNameChange }) => {
  const [playerName, setPlayerName] = useState('');
  return (
    <div className="item" style={ !isCurrentPlayer ? { opacity: '0.5', pointerEvents: 'none' } : null }>
      <div className="left floated content">
        <div>{score}</div>
      </div>

      <div className="right floated content ui action input">
        <input
          type="number"
          min="0"
          style={{ width: '7rem', height: '2rem' }}
        />
        <button className="ui button" onClick={() => console.log('addToUserScore()')}>+</button>
      </div>

      <div className="content">
        <div className="header"><input type="text" placeholder="Name" onBlur={() => onNameChange(playerIndex, playerName)} value={playerName} onChange={(e) => setPlayerName(e.target.value)} style={{ border: '0' }} /></div>
      </div>
    </div>
  );
};

export default Player;
