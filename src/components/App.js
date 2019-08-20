import React from 'react';
import Header from './Header';
import Player from './Player';
import Modal from './Modal';

class App extends React.Component {
  state = { settingsVisible: false };

  settingsActions() {
    return <button className="ui primary button">Save</button>;
  }

  settingsContent() {
    return 'Content here';
  }

  render() {
    return (
      <div className="ui container">
        <Header round="1" />
        <div className="ui massive middle aligned selection celled list">
          <Player name="Jonni" score="43" />
          <Player name="Sonja" score="40" />
        </div>
        <button
          className="ui button primary"
          onClick={() => this.setState({ settingsVisible: true })}
        >
          Settings
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

export default App;
