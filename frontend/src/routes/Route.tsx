import React from 'react';
import {
  Route as ReactDOMRoute,
  RouteProps as ReactDOMRouteProps,
  Redirect,
} from 'react-router-dom';

import { useAuth } from '../hooks/auth';

interface RouteProps extends ReactDOMRouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

// Caso 01: (rota privada e user autenticado) true/true = OK
// Caso 02: (rota privada e user nao autenticado) true/false = Redirect Login
// Caso 03: (rota nao privada e user autenticado) = false/true =  Redirect Dashboard
// Caso 04: (rota nao privada e user nao autenticado) = false/false = OK

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { user } = useAuth();

  return (
    <ReactDOMRoute
      {...rest}
      render={({ location }) => {
        // verifica se a rota é privada e se usuario esta autenticado
        return isPrivate === !!user ? (
          <Component />
        ) : (
          // verifica se a rota necessita de autenticacao, redirect login ou dashboard
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
