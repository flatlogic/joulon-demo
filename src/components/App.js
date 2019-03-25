import React from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router';
import { Router, Route } from 'react-router-dom';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import LayoutComponent from '../components/Layout';
import '../styles/theme.scss';
import history from '../history';
import Callback from '../auth/Callback';

const PrivateRoute = ({ component, ...rest }) => {
  if (!rest.auth.isAuthenticated() && !/\/callback/.test(rest.location.pathname)) {
    rest.auth.login();
    return false;
  }
  return ( // eslint-disable-line
    <Route
      {...rest} render={props => {
        return (
          React.createElement(component, {...props, auth: rest.auth})
        )}
      }
    />
  );
};

class App extends React.PureComponent {
  render() {
    const handleAuthentication = ({location}) => {
      if (/access_token|id_token|error/.test(location.hash)) {
        this.props.auth.handleAuthentication();
      }
    };

    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app"/>}/>
          <PrivateRoute path="/app" auth={this.props.auth} component={LayoutComponent} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
          <Route path="/callback" exact component={Callback} />
          <Route path="/error" exact component={ErrorPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(App);
