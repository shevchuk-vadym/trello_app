import * as React from 'react';
import { FunctionComponent } from 'react';
import { RouteChildrenProps } from 'react-router';
import { Redirect } from 'react-router-dom';

interface OAuthprops extends RouteChildrenProps {
  onSetToken: (token: string) => void;
}

export const OAuth: FunctionComponent<OAuthprops> = ({
  location: { hash },
  onSetToken,
}: OAuthprops) => {
  console.log('TEST');
  const token = hash.split('=')[1];
  onSetToken(token);
  return <Redirect to={'/dashBoard'} />;
};
