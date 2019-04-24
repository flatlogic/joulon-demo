import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap';
import cx from "classnames";
import s from './Login.module.scss';
import logo from '../../images/joulon-logo.svg';
import { loginUser, receiveToken } from '../../actions/user';
import jwt from "jsonwebtoken";

class Login extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
  };

  static isAuthenticated(token) {
    if (!token) return;
    const date = new Date().getTime() / 1000;
    const data = jwt.decode(token);
    return date < data.exp;
  }

  constructor(props) {
    super(props);

    this.state = {
      login: '',
      password: '',
    };

    this.doLogin = this.doLogin.bind(this);
    this.googleLogin = this.googleLogin.bind(this);
    this.microsoftLogin = this.microsoftLogin.bind(this);
    this.changeLogin = this.changeLogin.bind(this);
    this.changePassword = this.changePassword.bind(this);
  }

  changeLogin(event) {
    this.setState({login: event.target.value});
  }

  changePassword(event) {
    this.setState({password: event.target.value});
  }

  doLogin(e) {
    e.preventDefault();
    this.props.dispatch(loginUser({login: this.state.login, password: this.state.password}));
  }

  googleLogin() {
    this.props.dispatch(loginUser({social: "google"}));
  }

  microsoftLogin() {
    this.props.dispatch(loginUser({social: "microsoft"}));
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token');
    if (token) {
      this.props.dispatch(receiveToken(token));
    }

  }

  render() {
    const {from} = this.props.location.state || {from: {pathname: '/app'}}; // eslint-disable-line

    // cant access login page while logged in
    if (this.props.isAuthenticated) { // eslint-disable-line
      return (
        <Redirect to={from}/>
      );
    }

    return (
      <div className={s.root}>
        <section className={s.login}>
          <div className={s.logo}>
            <img src={logo} alt='Joulon Logo'/>
          </div>
              <div className={s.formContent}>
                <div className={s.socialButtons}>
                  <Button onClick={this.googleLogin} color="white" className={cx(s.socialGoogle, s.socialIcon)}/>
                  <Button onClick={this.microsoftLogin} className={cx(s.socialMicrosoft, s.socialIcon)}/>
                </div>
                <p className="mt-3 text-center text-gray-light">or</p>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fi flaticon-user"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="email" name="email" id="login_email" value={this.state.login}
                           onChange={this.changeLogin} placeholder="yours@example.com" required/>
                  </InputGroup>
                </FormGroup>
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>
                        <i className="fi flaticon-locked-4"/>
                      </InputGroupText>
                    </InputGroupAddon>
                    <Input type="password" name="password" id="login_password" value={this.state.password}
                           onChange={this.changePassword} placeholder="your example" required/>
                  </InputGroup>
                </FormGroup>
              </div>
              <Button color="primary" size="small" onClick={this.doLogin}
                      className={s.loginBtn}>{this.props.isFetching ? 'Loading...' :
                (<span>Login <i className="fa fa-angle-right"/></span>)}
                      </Button>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isFetching: state.auth.isFetching,
    isAuthenticated: state.auth.isAuthenticated,
    errorMessage: state.auth.errorMessage,
  };
}

export default withRouter(connect(mapStateToProps)(Login));

