import * as React from "react";
import {Route, Redirect, RouteProps, RouteComponentProps } from "react-router-dom"
 

interface PrivateRouteProps extends RouteProps {
    isLoggedIn: boolean
}


export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({render, isLoggedIn, ...rest}) =>  {
  return (
    <Route
      {...rest}
      render={(routeCompProps: RouteComponentProps) =>
        isLoggedIn ? (
          render!(routeCompProps)
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: routeCompProps.location }
            }}
          />
        )
      }
    />
  );
}