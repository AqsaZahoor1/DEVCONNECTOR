import React, { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { alertCreators, registrationCreators } from '../../Redux/ExportCreators/export';
import { bindActionCreators } from 'redux';
import { useDispatch } from "react-redux";


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const dispatch = useDispatch();
    const { errorToast } = bindActionCreators(alertCreators, dispatch);
    const { registerUser } = bindActionCreators(registrationCreators, dispatch);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);


    const nameHandler = (event) => {

        setName(event.target.value)

    }
    const emailHandler = (event) => {

        setEmail(event.target.value)

    }
    const passwordHandler = (event) => {

        setPassword(event.target.value)

    }
    const password2Handler = (event) => {

        setPassword2(event.target.value)

    }
    const validateForm = async (event) => {
        event.preventDefault();


        if (password !== password2) {

            errorToast("passsword do not match");
            return;
        }

        registerUser({
            name,
            email,
            password
        })


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
            <h1 className="large text-primary">Sign Up</h1>

            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit={validateForm}>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={nameHandler}
                        name="name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        required
                    />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={password2Handler}
                        required
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

export default Register;