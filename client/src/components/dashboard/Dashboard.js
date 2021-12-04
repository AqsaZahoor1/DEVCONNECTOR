import React from 'react';
import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useEffect } from 'react';
const Dashboard = () => {




    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);







    // Redirect if user is authenticated and has valid token
    const navigate = useNavigate();
    if (!isAuthenticated) {
        navigate("/login");
    }
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, []);



    return (
        <Fragment>
            Dasboard
        </Fragment>
    )
}

export default Dashboard
