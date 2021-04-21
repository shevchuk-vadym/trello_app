import * as React from 'react';
import {
  Route,
  Link,
  Switch,
  Redirect,
  RouteChildrenProps,
  withRouter,
  RouteComponentProps,
} from 'react-router-dom';
import { AppRoute, routes } from './routes';
import { OAuth } from '../OAuth';
import { PrivateRoute } from '../ProtectedRoute';
import { setToLocalStorage, getFromStorage } from '../../utils';

const TOKEN_STORAGE_KEY = 'TOKEN';

interface AppState {
  token: string;
  boards: Array<string>;
}

interface AppProps extends RouteComponentProps {}

class App extends React.Component<AppProps, AppState> {
  public state = {
    token: '',
    boards: [],
  };

  componentDidMount() {
    console.log('HELLO');
    this.getToken();
  }

  private getToken() {
    const token = getFromStorage(TOKEN_STORAGE_KEY);
    if (!token) {
      this.props.history.push('/login');
      return;
    }
    this.setState({ token }, () => this.props.history.push('/dashboard'));
  }

  private setToken = (token: string) => {
    console.log('ON SET TOKEN');
    this.setState({ token });
    setToLocalStorage(TOKEN_STORAGE_KEY, token);
  };

  private get isLoggedIn() {
    return !!this.state.token;
  }

  private renderHeader() {
    return (
      <header>
        {routes.map((route: AppRoute, i: number) =>
          route.isHidden ? null : (
            <Link key={i} to={route.path}>
              {route.title}
            </Link>
          )
        )}
      </header>
    );
  }

  private renderContent() {
    return (
      <main>
        <Switch>
          <Route
            path='/oauth'
            render={(props: RouteChildrenProps) => (
              <OAuth {...props} onSetToken={this.setToken} />
            )}
          />
          {routes.map(this.renderRoute)}

          <Redirect to='/404' />
        </Switch>
      </main>
    );
  }

  private renderRoute = (route: AppRoute, i: number) => {
    if (route.isProtected) {
      return (
        <PrivateRoute
          isLoggedIn={this.isLoggedIn}
          exact={route.exact}
          key={i}
          render={(props) =>
            route.render({ ...props, token: this.state.token })
          }
        />
      );
    } else {
      return (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          render={route.render}
        />
      );
    }
  };

  public render() {
    return (
      <div>
        {this.renderHeader()}
        {this.renderContent()}
      </div>
    );
  }
}

const AppWithRouter = withRouter(App);

export { AppWithRouter as App };
