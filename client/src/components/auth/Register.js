import React from 'react';
import { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';



const Register = () => {


    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [password2, setPassword2] = useState();

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


        if (password != password2) {
            alert("Password error");
            return;
        }
        alert(name, email, password, password2);
        alert(email);
        alert(password);
        alert(password2);

    }


    return (
        <Fragment>
            <h1 class="large text-primary">Sign Up</h1>

            <p class="lead"><i class="fas fa-user"></i> Create Your Account</p>

            <form class="form" onSubmit={validateForm}>

                <div class="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={nameHandler}
                        name="name" required />
                </div>
                <div class="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={emailHandler}
                        required
                    />
                    <small class="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
                        Gravatar email</small
                    >
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
                <div class="form-group">
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
                <input type="submit" class="btn btn-primary" value="Register" />
            </form>
            <p class="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    )
}

export default Register




{/* const validateForm = async (event) => {
        event.preventDefault();


        if (password != password2) {
            alert("Password error");
            return;
        }
        // alert(name, email, password, password2);
        // alert(email);
        // alert(password);
        // alert(password2);

        const newUser = {
            name,
            email,
            password
        }

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        try {

            const body = JSON.stringify(newUser);
            const res = await axios.post('/api/users', body, config);
            alert(res.data);


        } catch (error) {
            alert(error.message);
        }

    } */}
