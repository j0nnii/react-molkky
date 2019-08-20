import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Player from './Player';
import Modal from './Modal';
import { addGamePlayer, changePlayerName } from '../actions';

class App extends React.Component {
  state = { settingsVisible: false };

  settingsActions() {
    return <button className="ui primary button">Save</button>;
  }

  settingsContent() {
    return 'Content here';
  }

  onNameChange = (playerIndex, name) => {
    this.props.changePlayerName(playerIndex, name);
  };

  renderPlayers() {
    return this.props.players.map((player, playerIndex) => {
        return <Player key={`player${playerIndex}`} isCurrentPlayer={ playerIndex === this.props.currentPlayer ? true : false } score="0" playerIndex={playerIndex} onNameChange={this.onNameChange} />
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
          onClick={() => this.setState({ settingsVisible: true })}
        >
          Settings
        </button>
        <button
          className="ui button primary"
          onClick={() => this.props.addGamePlayer()}
        >
          Add player
        </button>
        {this.state.settingsVisible ? (
          <Modal
            title="Settings"
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
  return { players: game.players, currentPlayer: game.currentPlayer };
}

export default connect(mapStateToProps, { addGamePlayer, changePlayerName })(App);
