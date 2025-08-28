import React, {useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../css/Home.css';
import {jwtDecode} from "jwt-decode";

export default function Home() {

    const navigate = useNavigate();

    useEffect(() => {
        const key = localStorage.getItem('key')
            if(key) {
                try {
                    const {exp} = jwtDecode(key);
                    if(exp > Date.now() / 1000) {
                        navigate('/mixtapes');
                    }
                    else {
                        localStorage.clear();
                    }
                } catch {
                    localStorage.clear();
                }
            }
    }, [navigate]);



    return (
        <>
            <div className="topBanner">Where Music Meets Community.</div>
            <nav className="navigationHeader">
                <a href="/about" className="link">About</a>
            </nav>
            <div className="homeContainer">
                <div className="homeContent">
                    <h1>M<span className="letterX">x</span>Tape</h1>
                    <p>Stream. Share.</p>
                    <p>Discover.</p>
                    <img src="/images/MxTapeLogo.jpg" alt="MxTape Company Logo"/>
                    <p>Log in to share your sound now!</p>

                    <div className="navigation">
                        <Link to="/login" className="loginButton">login</Link>
                        <br/>
                        <Link to="/signup" className="signupButton">sign up</Link>
                        <br/>
                    </div>
                </div>
            </div>

            <footer className="footer">
                <p>Promoting your favorite music since 2025.</p>
                <div className="copyright">
                    <p>© MxTape Inc, 2025</p>
                    <p>1011 Musically Drive,</p>
                    <p>San Francisco, CA</p>
                </div>
            </footer>

        </>

    )
}