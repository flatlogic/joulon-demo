import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router';
import { Router, Route } from 'react-router-dom';

/* eslint-disable */
import ErrorPage from '../pages/error/ErrorPage';
import {logoutUser} from '../actions/user';
/* eslint-enable */

import LayoutComponent from './Layout';
import Login from './Login';
import '../styles/theme.scss';
import history from './history';

const PrivateRoute = ({ dispatch, component, ...rest }) => {
  if (!Login.isAuthenticated(localStorage.getItem('token'))) {
    dispatch(logoutUser());
    return (<Redirect to="/login"/>)
  } else {
    return ( // eslint-disable-line
      <Route {...rest} render={props => (React.createElement(component, props))}/>
    );
  }

};

class App extends React.PureComponent {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app"/>}/>
          <Route path="/app" exact render={() => <Redirect to="/app/dashboard"/>}/>
          <PrivateRoute path="/app" dispatch={this.props.dispatch} component={LayoutComponent} />
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
