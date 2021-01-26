import axios from 'axios';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS
} from './types';
import { toast } from 'react-toastify';

export const checkAuthenticated = () => async dispatch => {
  if (typeof window == 'undefined') {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
  
  const body = JSON.stringify({ token: localStorage.getItem('access') });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);

    if (res.data.code !== 'token_not_valid') {
      dispatch({
        type: AUTHENTICATED_SUCCESS
      });
    } else {
      dispatch({
        type: AUTHENTICATED_FAIL
      });
    }
  } catch (err) {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL
    });
  }
};

export const load_user = () => async dispatch => {
  if (localStorage.getItem('access')) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: USER_LOADED_FAIL
      });
    }
    } else {
      dispatch({
        type: USER_LOADED_FAIL
      });
    }
};

export const login = (email, password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    toast.success('Login successfull!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
    toast.error('Error authentication failed!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const signup = ({ name, email, password, re_password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ name, email, password, re_password }); 

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIGNUP_FAIL
    });
    toast.error('Error signup try again!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const verify = (uid, token) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ uid, token }); 

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);

    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: ACTIVATION_FAIL
    });
    toast.error('Error connection!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
};

export const reset_password = (email) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

    const body = JSON.stringify({ email }); 

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: RESET_PASSWORD_FAIL
      });
      toast.error('Error resetting!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      }
};

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ uid, token, new_password, re_new_password }); 

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

    dispatch({
      type: RESET_PASSWORD_CONFIRM_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: RESET_PASSWORD_CONFIRM_FAIL
    });
    toast.error('Error verifying!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  }
};

export const logout = () => dispatch => {
    dispatch({ type: LOGOUT });
    toast.error('Error connection!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };