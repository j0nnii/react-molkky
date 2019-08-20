import React from 'react';

const Player = ({ name, score }) => {
  return (
    <div className="item">
      <div className="left floated content">
        <div>{score}</div>
      </div>

      <div className="right floated content ui action input">
        <input
          type="number"
          min="0"
          style={{ width: '7rem', height: '2rem' }}
        />
        <button className="ui button">+</button>
      </div>

      <div className="content">
        <div className="header">{name}</div>
      </div>
    </div>
  );
};

export default Player;
