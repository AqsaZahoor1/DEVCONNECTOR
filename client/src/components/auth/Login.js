import React from 'react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
const Login = () => {



    const [email, setEmail] = useState();
    const [password, setPassword] = useState();



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
    }


    return (
        <Fragment>
            <h1 class="large text-primary">Sign In</h1>

            <p class="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>

            <form class="form" onSubmit={validateForm}>


                <div class="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        required
                    />
                </div>
                <div class="form-group">
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

                <input type="submit" class="btn btn-primary" value="Login" />
            </form>
            <p class="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    )
}

export default Login
