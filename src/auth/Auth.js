import auth0 from 'auth0-js';
import config from '../config';
import history from '../history';
import axios from "axios";


export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: config.auth.domain,
    clientID: config.auth.clientID,
    redirectUri: config.baseURLUi + '/callback',
    responseType: 'token id_token',
    scope: 'openid',
    audience: config.auth.audience,
    sso: false
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/app/dashboard');
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    let expiresAt = (authResult.expiresIn * 1000) + new Date().getTime();
    this.setAccessToken(authResult.accessToken);
    this.setIdToken(authResult.idToken);
    this.setExpiresAt(expiresAt);
    this.setApiHeader();
  }

  setApiHeader() {
    const accessToken = this.getAccessToken();
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  getIdToken() {
    return localStorage.getItem('idToken');
  }

  getExpiresAt() {
    return localStorage.getItem('expiresAt');
  }

  setAccessToken(value) {
    return localStorage.setItem('accessToken', value);
  }

  setIdToken(value) {
    return localStorage.setItem('idToken', value);
  }

  setExpiresAt(value) {
    return localStorage.setItem('expiresAt', value);
  }

  logout() {
    // Remove tokens and expiry time
    this.setAccessToken(null);
    this.setIdToken(null);
    this.setExpiresAt(0);
    this.setApiHeader();

    // navigate to the home route
    history.replace('/');
  }

  isAuthenticated() {
    let expiresAt = this.getExpiresAt();
    return (new Date().getTime() < expiresAt) && !!this.getAccessToken();
  }

  login() {
    this.auth0.authorize();
  }
}