import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { registrationCreators } from '../../Redux/ExportCreators/export'
import { useDispatch, useSelector } from 'react-redux'


const Navbar = () => {

    const dispatch = useDispatch();
    const { logout } = bindActionCreators(registrationCreators, dispatch);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const loading = useSelector((state) => state.auth.loading);

    const guestLinks = (<ul>
        <li><Link to="/profiles">Developers</Link></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
    </ul>);
    const authLinks = (
        <ul>
            <li><a onClick={logout} href="#!">Logout</a></li>
        </ul>
    );


    return (
        <nav className="navbar bg-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
            </h1>
            {
                !loading && isAuthenticated ? (<Fragment>{authLinks}</Fragment>) : (<Fragment>{guestLinks}</Fragment>)
            }

        </nav>
    )
}

export default Navbar
