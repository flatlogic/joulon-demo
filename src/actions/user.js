import axios from 'axios';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function receiveLogin(payload) {
  return {
    type: LOGIN_SUCCESS,
    payload,
  };
}

function loginError(payload) {
  return {
    type: LOGIN_FAILURE,
    payload,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    document.cookie = 'token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    axios.defaults.headers.common['Authorization'] = "";
    dispatch(receiveLogout());
  };
}

export function loginUser(creds) {
  return (dispatch) => {
    dispatch(requestLogin());
    if (creds.login.length > 0 && creds.password.length > 0) {
      axios.post("/user/signin", creds).then(res => {
        const token = res.data.token;
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = "Bearer " + token;
        dispatch(receiveLogin());

      }).catch(err => {
        dispatch(loginError(err.body));
      })

    } else {
      dispatch(loginError('Something was wrong. Try again'));
    }
  };
}
