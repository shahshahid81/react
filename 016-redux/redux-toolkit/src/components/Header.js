import { useSelector } from 'react-redux';
import classes from './Header.module.css';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth';

const Header = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(authActions.logout());
  }

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {isAuthenticated && (
        <nav>
          <ul>
            <li>
              <a href="/">My Products</a>
            </li>
            <li>
              <a href="/">My Sales</a>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
