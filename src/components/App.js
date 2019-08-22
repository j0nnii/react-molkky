import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Player from "./Player";
import Modal from "./Modal";
import {
  addGamePlayer,
  setPlayerName,
  addTurnScore,
  setGameRound
} from "../actions";

class App extends React.Component {
  state = { settingsVisible: false };

  // Handle name change (callback from Player component)
  onNameChange = (playerIndex, name) => {
    // Call an action creator to set it, give index also because can set other than currentPlayer too
    this.props.setPlayerName(playerIndex, name);
  };

  // Handle adding player turn score (callback from Player component)
  onAddTurnScore = score => {
    // Call an action creator to set it, make sure we send score as integer
    this.props.addTurnScore(parseInt(score));
  };

  roundScore(playerIndex) {
    // Return if player is not set yet
    if (!this.props.players[playerIndex]) return 0;
    // Get current player current round
    const currentPlayerRound = this.props.players[playerIndex].gameData.filter(
      gameData => gameData.round === this.props.currentRound
    );
    // If it does not exist return
    if (!currentPlayerRound[0]) return 0;
    // Sum turns /w reduce to get round total score
    const currentRoundPoints = currentPlayerRound[0].turns.reduce(
      (a, b) => a + b
    );
    // Return it
    return currentRoundPoints;
  }

  // Action buttons for modal based on if we are on round 1 or not
  winnerActionButtons() {
    const prevButton =
      this.props.currentRound > 1 ? (
        <button
          className="ui primary button"
          onClick={() => this.props.setGameRound(this.props.currentRound - 1)}
        >
          Previous round
        </button>
      ) : null;
    return (
      <React.Fragment>
        {prevButton}
        <button
          className="ui primary button"
          onClick={() => this.props.setGameRound(this.props.currentRound + 1)}
        >
          Next round
        </button>
      </React.Fragment>
    );
  }

  showWinner() {
    // Filter from saved winners based on round
    const roundWinner = this.props.winners.filter(
      gameData => gameData.round === this.props.currentRound
    );
    // If roundwinner & current player matches show winner modal
    if (
      roundWinner.length > 0 &&
      roundWinner[0].winner === this.props.currentPlayer
    ) {
      return (
        <Modal
          title={`Round ${this.props.currentRound} winner is here!!!`}
          onDismiss={() => this.setState({ settingsVisible: false })}
          actions={this.winnerActionButtons()}
          content={roundWinner[0].name}
        />
      );
    }
    return;
  }

  // Check if player is dismissed from round
  isDismissed(player) {
    const dismissedPlayer = this.props.dismissed.filter(
      gameData =>
        gameData.round === this.props.currentRound && gameData.player === player
    );
    if (dismissedPlayer.length > 0) return true;
    return false;
  }

  renderPlayers() {
    // Map through the players state
    return this.props.players.map((player, playerIndex) => {
      return (
        <Player
          dismissed={this.isDismissed(playerIndex)}
          name={player.name}
          key={`player${playerIndex}`}
          isCurrentPlayer={
            playerIndex === this.props.currentPlayer ? true : false
          }
          roundScore={this.roundScore(playerIndex)}
          playerIndex={playerIndex}
          onNameChange={this.onNameChange}
          onAddTurnScore={this.onAddTurnScore}
        />
      );
    });
  }

  render() {
    return (
      <div className="ui container">
        <Header round="1" />
        <div className="ui massive middle aligned selection celled list">
          {this.renderPlayers()}
        </div>
        <button
          className="ui button primary"
          id="addPlayer"
          onClick={() => this.props.addGamePlayer()}
        >
          Add player
        </button>
        {this.showWinner()}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => {
  return {
    players: game.players,
    currentRound: game.currentRound,
    currentPlayer: game.currentPlayer,
    winners: game.winners,
    dismissed: game.dismissed
  };
};

export default connect(
  mapStateToProps,
  { addGamePlayer, setPlayerName, addTurnScore, setGameRound }
)(App);
