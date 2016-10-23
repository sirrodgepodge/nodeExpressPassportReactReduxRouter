import * as actionTypes from '../../actionTypes';
import request from '../../../utils/request';


export function localAuth(user) {
  return {
    type: actionTypes.LOCAL_AUTH,
    user
  };
}

export function localAuthRequest(_id, email, password) {
  const addingPassword = !!_id;
  const route = addingPassword ? '/auth/addPassword' : '/auth/login';
  const body = addingPassword ? {
    _id,
    email
  } : {
    email,
    password
  };
  return dispatch => request.post({
    route,
    body
  }).then(({ data: user }) =>
    dispatch(localAuth(user)));
}


export function logout() {
  return {
    type: actionTypes.LOG_OUT
  };
}

export function logoutRequest() {
  return dispatch => request.get('/auth/logout')
    .then(() =>
      dispatch(logout()));
}