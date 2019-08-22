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
  const [turnScore, setTurnScore] = useState("");
  const onAddScore = score => {
    onAddTurnScore(Number(score));
    setTurnScore("");
  };
  return (
    <div
      className={`player${playerIndex} item ${
        isCurrentPlayer ? styles.current : null
      }`}
    >
      <div className="left floated content" style={{ width: "30px" }}>
        <div>{roundScore}</div>
      </div>

      <div className="right floated content ui action input">
        <input
          id={`player${playerIndex}Score`}
          type="number"
          placeholder="0"
          min="0"
          max="12"
          value={turnScore}
          onChange={e => setTurnScore(e.target.value)}
          style={{ width: "7rem", height: "2rem" }}
          className={!isCurrentPlayer ? styles.disabled : null}
        />
        <button
          className={`addScore ui button ${
            !isCurrentPlayer ? styles.disabled : null
          }`}
          onClick={() => onAddScore(turnScore)}
        >
          +
        </button>
      </div>

      <div className="content">
        <div className="header">
          <input
            id={`player${playerIndex}Name`}
            type="text"
            placeholder="Name"
            onBlur={() => onNameChange(playerIndex, playerName)}
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            style={{ border: "0", background: "none" }}
          />
          {dismissed ? (
            <span className={styles.dismissed}>User should be dismissed</span>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Player;
