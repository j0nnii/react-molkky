import React, { useState } from "react";
import styles from "./Player.module.css";

// Destruct props
const Player = ({
  playerIndex,
  name,
  isCurrentPlayer,
  roundScore,
  onNameChange,
  onAddTurnScore,
  dismissed
}) => {
  // Define state variables and setters
  const [playerName, setPlayerName] = useState(name);
  const [turnScore, setTurnScore] = useState(0);
  const onAddScore = (score) => {
    onAddTurnScore(Number(score));
    setTurnScore(0);
  };
  return (
    <div className={`item ${isCurrentPlayer ? styles.current : null}`}>
      <div className="left floated content" style={{ width: "30px" }}>
        <div>{roundScore}</div>
      </div>

      <div className="right floated content ui action input">
        <input
          type="number"
          min="0"
          max="12"
          value={turnScore}
          onChange={e => setTurnScore(e.target.value)}
          style={{ width: "7rem", height: "2rem" }}
          className={!isCurrentPlayer ? styles.disabled : null}
        />
        <button
          className={`ui button ${!isCurrentPlayer ? styles.disabled : null}`}
          onClick={() => onAddScore(turnScore)}
        >
          +
        </button>
      </div>

      <div className="content">
        <div className="header">
          <input
            type="text"
            placeholder="Name"
            onBlur={() => onNameChange(playerIndex, playerName)}
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            style={{ border: "0", background: "none" }}
          />
          {dismissed ? <span style={{ color: 'red'}}>User should be dismissed</span> : null }
        </div>
      </div>
    </div>
  );
};

export default Player;
