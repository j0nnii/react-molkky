import React from "react";
import { connect } from "react-redux";
import styles from "./Header.module.css";
import { setGameRound } from "../actions";

class Header extends React.Component {
  setGameRound(currentRound, next) {
    console.log(currentRound);
    next
      ? this.props.setGameRound(currentRound + 1)
      : this.props.setGameRound(currentRound - 1);
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
          Round {this.props.currentRound}
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
  return { currentRound: game.currentRound };
};

export default connect(
  mapStateToProps,
  { setGameRound }
)(Header);
