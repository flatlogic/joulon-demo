import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router';
import { Router, Route } from 'react-router-dom';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import LayoutComponent from '../components/Layout';
import Login from '../components/Login';
import '../styles/theme.scss';
import history from './history';

const PrivateRoute = ({ component, ...rest }) => {
  return ( // eslint-disable-line
    <Route
      {...rest} render={props => (
      localStorage.getItem('id_token') ? (
        React.createElement(component, props)
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }, // eslint-disable-line
          }}
        />
      )
    )}
    />
  );
};

class App extends React.PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app"/>}/>
          <Route path="/app" exact render={() => <Redirect to="/app/dashboard"/>}/>
          <PrivateRoute path="/app" component={LayoutComponent} />
          <Route path="/login" exact component={Login}/>
          <Route path="/error" exact component={ErrorPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(App);
