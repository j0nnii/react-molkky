import React, { useState } from "react";

const Player = ({
  name,
  isCurrentPlayer,
  roundScore,
  onNameChange,
  onAddTurnScore
}) => {
  const [playerName, setPlayerName] = useState(name);
  const [turnScore, setTurnScore] = useState(0);
  return (
    <div className="item" style={!isCurrentPlayer ? { opacity: "0.3" } : null}>
      <div className="left floated content" style={{ width: "30px" }}>
        <div>{roundScore}</div>
      </div>

      <div className="right floated content ui action input">
        <input
          type="number"
          min="0"
          value={turnScore}
          onChange={e => setTurnScore(e.target.value)}
          style={{ width: "7rem", height: "2rem" }}
        />
        <button
          className="ui button"
          onClick={() => onAddTurnScore(parseInt(turnScore))}
        >
          +
        </button>
      </div>

      <div className="content">
        <div className="header">
          <input
            type="text"
            placeholder="Name"
            onBlur={() => onNameChange(playerName)}
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            style={{ border: "0" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Player;
