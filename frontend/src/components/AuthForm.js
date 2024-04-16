import React, { useState } from 'react';
import { Form, Link, useSearchParams } from 'react-router-dom';
import classes from './AuthForm.module.css';
import Person0jumpComponent from '../three1/Person0jumpComponent.jsx';
import Person0IdleComponent from '../three1/Person0IdleComponent.jsx';

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get('mode') === 'login';
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <>
      <div className={classes.formContainer}>
        <Form method="post" className={`${classes.form} ${classes.formContainer}`}>
          <div className={classes.whiteBox} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            {isHovered ? <Person0jumpComponent /> : <Person0IdleComponent />}
          </div>
          <div className={classes.otherElements}>
            <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
            <p>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" name="email" required />
            </p>
            <p>
              <label htmlFor="password">Password</label>
              <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}>
              <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
                {isLogin ? 'Create new user' : 'Login'}
              </Link>
              <button>Save</button>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}

export default AuthForm;
