import React from "react";
import { connect } from "react-redux";
import Header from "./Header";
import Player from "./Player";
import Modal from "./Modal";
import { addGamePlayer, setPlayerName, addTurnScore } from "../actions";

class App extends React.Component {
  state = { settingsVisible: false };

  settingsActions() {
    return <button className="ui primary button">Save</button>;
  }

  settingsContent() {
    return "Content here";
  }

  onNameChange = name => {
    this.props.setPlayerName(name);
  };

  onAddTurnScore = score => {
    this.props.addTurnScore(parseInt(score));
  };

  roundScore(playerIndex) {
    // Return if player is not set yet
    if (!this.props.players[playerIndex]) return 0;
    const currentPlayerRound = this.props.players[playerIndex].gameData.filter(
      gameData => gameData.round === this.props.currentRound
    );
    if (!currentPlayerRound[0]) return 0;
    const currentRoundPoints = currentPlayerRound[0].turns.reduce(
      (a, b) => a + b
    );
    return currentRoundPoints;
  }

  renderPlayers() {
    return this.props.players.map((player, playerIndex) => {
      return (
        <Player
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
          onClick={() => this.props.addGamePlayer()}
        >
          Add player
        </button>
        {this.roundScore(this.props.currentPlayer) === 50 ? (
          <Modal
            title="Winner is here!!!"
            onDismiss={() => this.setState({ settingsVisible: false })}
            actions={this.settingsActions()}
            content={this.settingsContent()}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => {
  return {
    players: game.players,
    currentRound: game.currentRound,
    currentPlayer: game.currentPlayer
  };
};

export default connect(
  mapStateToProps,
  { addGamePlayer, setPlayerName, addTurnScore }
)(App);
