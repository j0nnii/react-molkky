import React from "react";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import { setGameRound } from "../actions";

class Header extends React.Component {
  // Logic from clicking arrow icons to set game round
  setGameRound(currentRound, next) {
    // Turnary expression on parameters to call action creator to set game round
    next
      ? this.props.setGameRound(currentRound + 1)
      : this.props.setGameRound(currentRound - 1);
  }

  // Get current round's turn
  currentTurn() {
    // Return if player is not set yet
    if (!this.props.players[this.props.currentPlayer]) return 0;

    // Get current user's round state by filtering it from props
    const currentPlayerRound = this.props.players[
      this.props.currentPlayer
    ].gameData.filter(gameData => gameData.round === this.props.currentRound);

    // If current player round array exists, get the current turn from arrays length
    if (Array.isArray(currentPlayerRound) && currentPlayerRound.length) {
      return currentPlayerRound[0].turns.length;
    } else {
      // Otherwise round will be 1
      return 1;
    }
  }

  render() {
    return (
      <div className={styles.headerContainer}>
        <div className={styles.headerAreaLarge}>
          <h1 className="ui header">react-mölkky</h1>
        </div>
        <div className={styles.headerAreaSmall}>
          {this.props.currentRound > 1 ? (
            <i
              className="big angle left icon"
              style={{ cursor: "pointer" }}
              onClick={() => this.setGameRound(this.props.currentRound, false)}
            />
          ) : null}
          Turn {this.currentTurn()} / Round {this.props.currentRound}
          <i
            className="big angle right icon"
            style={{ cursor: "pointer" }}
            onClick={() => this.setGameRound(this.props.currentRound, true)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => {
  return {
    currentRound: game.currentRound,
    currentPlayer: game.currentPlayer,
    players: game.players
  };
};

export default connect(
  mapStateToProps,
  { setGameRound }
)(Header);
