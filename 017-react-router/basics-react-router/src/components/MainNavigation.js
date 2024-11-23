import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            {/* Using NavLink instead of Link because we are also getting a function for className which we can use to check if the route is active or not and then apply the styles appropriately */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }

              // Style works same as className for NavLink
              // style={({ isActive }) => ({
              //   textAlign: isActive ? 'center' : 'left',
              // })}

              // By default, if the current route starts with the `to` attribute, then the class is applied. So if we are on `/products` route, then `/` and `/products` route both will be considered active route. end attribute will ensure to only apply the style if the current route ends with the attribute.
              end
            >
              Home Page
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Products Page
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
