import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink to="/" className={({isActive})=> isActive ? classes.active: undefined}>Home</NavLink>
          </li>
          <li>
          <NavLink to="/posts" className={({isActive})=> isActive ? classes.active: undefined}>Posts</NavLink>
          </li>
          <li>
          <NavLink to="/auth" className={({isActive})=> isActive ? classes.active: undefined}>Auth</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
