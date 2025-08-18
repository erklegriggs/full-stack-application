import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/Mixtapes.css';

export default function Mixtapes() {

    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <div>
            <h1>Mixtapes</h1>
            <button onClick={logOut}>Logout</button>
        </div>
    )
}