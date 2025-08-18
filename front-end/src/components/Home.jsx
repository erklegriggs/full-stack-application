import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/Home.css';

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('key')) {
            navigate('/mixtapes');
        }
    }, [navigate]);



    return (
        <div className="homeContainer">
            <div className="homeContent">
                <h1>MxTape</h1>
                <p>Stream. Share. Discover.</p>
                <p>Discover.</p>
                <img src="/images/MxTapeLogo.jpg" alt="MxTape Company Logo"/>
                <p>Log in to share your sound now!</p>

                <div className="navigation">
                    <Link to="/login" className="loginButton">login</Link>
                    <br/>
                    <Link to="/signup" className="signupButton">sign up</Link>
                    <br/>
                    <Link to="/secured" className="securedButton">secured</Link>
                    <br/>
                    {localStorage.getItem('key') && (
                    <button onClick={() => {localStorage.clear(); window.location.reload();}}>Logout</button>
                    )}
                </div>
            </div>
        </div>

    )
}