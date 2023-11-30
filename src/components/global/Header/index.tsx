/* eslint-disable max-len */
import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <div className={styles.container}>
      {/* <h1 className={styles.oponn}>Oponn</h1> */}
      <div className={styles.linksContainer}>
        <NavLink to="/" exact={true} activeClassName={styles.activeLink} className={styles.headerLink}>Home</NavLink>
        {/* <NavLink to="/build" exact={true} activeClassName={styles.activeLink} className={styles.headerLink}> Build</NavLink> */}
      </div>
      {/* <div className={styles.lineContainer}>
        <hr className={styles.blackLine} />
      </div> */}
    </div>
  );
};

export default Header;
