import React from 'react';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registrationCreators } from '../../Redux/ExportCreators/export';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
const Login = () => {



    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const dispatch = useDispatch();
    // const { successToast, errorToast } = bindActionCreators(alertCreators, dispatch);
    const { loginUser } = bindActionCreators(registrationCreators, dispatch);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);





    const emailHandler = (event) => {

        setEmail(event.target.value)

    }
    const passwordHandler = (event) => {

        setPassword(event.target.value)

    }
    const validateForm = (event) => {

        event.preventDefault();

        alert(email);
        alert(password);
        loginUser(email, password);
    }


    // Redirect if user is authenticated and has valid token
    const navigate = useNavigate();
    if (isAuthenticated) {
        console.log(isAuthenticated);
        navigate("/dashboard");
    }
    useEffect(() => {
        if (isAuthenticated) {
            console.log(isAuthenticated);
            navigate("/dashboard");
        }
    }, []);



    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>

            <p className="lead"><i className="fas fa-user"></i> Sign Into Your Account</p>

            <form className="form" onSubmit={validateForm}>


                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={passwordHandler}
                        required
                        minLength="6"
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login
