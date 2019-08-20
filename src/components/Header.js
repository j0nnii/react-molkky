import React from 'react';
import styles from './Header.module.css';

const Header = ({ round }) => {
    return (
        <div className={styles.headerContainer}>
            <div className={styles.headerAreaLarge}>
                <h1 className="ui header">react-mölkky</h1>
            </div>
            <div className={styles.headerAreaSmall}>
                <i className="big angle left icon"></i>
                    Round {round}
                <i className="big angle right icon"></i>
            </div>
        </div>
    );
};

export default Header;


