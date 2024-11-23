import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  function activeClassHandler({ isActive }) {
    return isActive ? classes.active : undefined;
  }

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink className={activeClassHandler} to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={activeClassHandler} to="/events">
              Events
            </NavLink>
          </li>
          <li>
            <NavLink to="/newsletter" className={activeClassHandler}>
              Newsletter
            </NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
