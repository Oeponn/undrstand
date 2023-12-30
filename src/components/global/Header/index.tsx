/* eslint-disable max-len */
import React, {useEffect, useRef} from 'react';
import {NavLink} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import styles from './styles.module.scss';

const Header = () => {
  const navContainerRef = useRef<(HTMLDivElement | null)>(null);
  const indicatorRef = useRef<(HTMLDivElement | null)>(null);
  const {pathname} = useLocation();

  const updateActiveIndicator = () => {
    if (!navContainerRef.current || !indicatorRef.current) {
      return;
    }
    const activeLink = navContainerRef.current
        .querySelector(`.${styles.activeLink}`) as HTMLElement;
    const indicator = indicatorRef.current;

    if (activeLink && indicator) {
      indicator.style.left = `${activeLink.offsetLeft}px`;
      indicator.style.width = `${activeLink.offsetWidth}px`;
    }
  };

  useEffect(() => {
    // Initial update
    updateActiveIndicator();

    // Update on tab change
    window.addEventListener('click', updateActiveIndicator);

    return () => {
      window.removeEventListener('click', updateActiveIndicator);
    };
  }, [updateActiveIndicator]);

  useEffect(() => {
    updateActiveIndicator();
  }, [pathname]);

  return (
    <div className={styles.container}>
      <div className={styles.navContainer} ref={navContainerRef}>
        <NavLink to="/about" exact={true} activeClassName={styles.activeLink} className={styles.navLink}>
          <span className="material-symbols-outlined">info</span>
          <div>Info</div>
        </NavLink>
        {/* <NavLink to="/build" exact={true} activeClassName={styles.activeLink} className={styles.navLink}>
          <span className="material-symbols-outlined">dashboard_customize</span>
          <div>Build</div>
        </NavLink> */}
        <NavLink to="/" exact={true} activeClassName={styles.activeLink} className={styles.navLink}>
          <span className="material-symbols-outlined">playing_cards</span>
          <div>Home</div>
        </NavLink>
        {/* <NavLink to="/admin" exact={true} activeClassName={styles.activeLink} className={styles.navLink}>
          <span className="material-symbols-outlined">account_circle</span>
          <div>Admin</div>
        </NavLink> */}
        <NavLink to="/settings" exact={true} activeClassName={styles.activeLink} className={styles.navLink}>
          <span className="material-symbols-outlined">settings</span>
          <div>Settings</div>
        </NavLink>
        <div className={styles.indicator} ref={indicatorRef}/>
      </div>
    </div>
  );
};

export default Header;
