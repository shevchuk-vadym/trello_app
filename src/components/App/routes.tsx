import * as React from 'react';
import { Redirect, RouteChildrenProps } from 'react-router';
import { DashBoard } from '../DashBoard';
import { LogIn } from '../LogIn';
import { NotFound } from '../NotFound';
import { OAuth } from '../OAuth';

export interface AppRoute {
  path: string;
  title?: string;
  exact?: boolean;
  isHidden?: boolean;
  isProtected?: boolean;
  render: (props: any) => any;
}
export const routes: Array<AppRoute> = [
  {
    path: '/login',
    title: 'logIn',
    exact: true,
    render: (props: RouteChildrenProps) => <LogIn {...props} />,
  },
  {
    path: '/dashboard',
    title: 'DashBoard',
    exact: true,
    render: (props: any) => <DashBoard {...props} />,
    isProtected: true,
  },
  {
    path: '/',
    isHidden: true,
    exact: true,
    title: '/',
    render: (props: any) => <Redirect to='/login' />,
  },
  {
    path: '/404',
    isHidden: true,
    render: (props: RouteChildrenProps) => <NotFound {...props} />,
  },
];
