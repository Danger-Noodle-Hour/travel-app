import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate(); // Move the useNavigate hook call here

    const handleLogout = () => {
        // Clear cookies
        document.cookie = 'userToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        // Terminate server-side session
        axios.post('/logout')
            .then(response => {
                // Handle successful logout
                navigate("/login"); // Redirect the user to the login page
            })
            .catch(error => {
                // Handle error
                console.error('Error logging out:', error);
            });
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
