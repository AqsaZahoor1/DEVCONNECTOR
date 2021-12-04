import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "../actions/types";
import { errorToast } from "./alert";
import { successToast } from "./alert";

import axios from 'axios';
import setAuthToken from "../utils/setAuthToken";


//Load user after authentication


export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {

        const res = await axios.get('api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data

        });
    } catch (error) {

        dispatch({
            type: AUTH_ERROR,
        });

    }

}





//user Registration
export const registerUser = ({ name, email, password }) => async (dispatch) => {

    try {

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ name, email, password });
        const res = await axios.post('/api/users', body, config);

        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(successToast("user registered successfully"));
        dispatch(loadUser());


    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {

            errors.forEach(error => dispatch(errorToast(error.msg)));
        }
        dispatch({
            type: REGISTER_FAIL,
        });
    }



}


export const loginUser = (email, password) => async (dispatch) => {

    try {

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const body = JSON.stringify({ email, password });
        const res = await axios.post('/api/auth', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(successToast("Login Success"));
        dispatch(loadUser());


    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {

            errors.forEach(error => dispatch(errorToast(error.msg)));
        }
        dispatch({
            type: LOGIN_FAIL,
        });

        dispatch(successToast("Failed to Login"));
    }



}
//Logout

export const logout = () => async (dispatch) => {

    dispatch({
        type: LOGOUT,

    });
}
