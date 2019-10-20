import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import isLoggedIn from './isLoggedIn';

export const AuthRoute = ({
  component: Component,
  path,
  exact
}) => {
  return <Route path={path} exact={exact} render={(props) => (
    !isLoggedIn()
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
};

export const ProtectedRoute = ({
  component: Component,
  path,
  exact
}) => {
  return <Route path={path} exact={exact} render={(props) => (
    isLoggedIn()
      ? <Component {...props} />
      : <Redirect to="/login" />
  )} />
};
