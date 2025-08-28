import React, {useEffect, useState} from "react";
import {login} from "../utilities/apiUtilities";
import {jwtDecode} from "jwt-decode";
import "../css/App.css";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isAdminRole, setIsAdminRole] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const key = localStorage.getItem('key');
        if(key) {
            const claims = jwtDecode(key);
            // checking if admin is logged in already upon page loading
            if(claims.role[0].authority === 'ROLE_ADMIN') {
                setIsAdminRole(true);
            }
        }

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            username: username,
            password: password
        }
        try {
            const response = await login(payload);
            if(response) {
                const claims = jwtDecode(response.token);
                localStorage.setItem('key', response.token);
                localStorage.setItem('username', claims.sub);
                localStorage.setItem('userId', claims.sub);
                // setting admin boolean to true to redirect to admin view choices (user or admin) in return
                if (claims.role[0].authority === 'ROLE_ADMIN') {
                    setIsAdminRole(true);
                } else {
                    localStorage.setItem('role', 'ROLE_USER');
                    navigate('/mixtapes');
                }

            }
        } catch(error) {
            console.log("Error: " + error);
            alert("Invalid credentials, please try again.");
        }
    }

    return (
        <>
            <div className="loginContainer">
                {isAdminRole && <h3>Welcome, Administrator!</h3>}
                {!isAdminRole && <h3>Log In</h3>}


                {!isAdminRole && (
                    <form onSubmit={handleSubmit}>
                        <label> username:
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}/>
                        </label>
                        <br/>
                        <label>password:
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}/>
                        </label>
                        <br/>
                        <button type="submit">Log In</button>
                    </form>
                )}
                {isAdminRole && (
                    <div>
                        <label>Select View Mode:</label>
                        <button className="adminViewChoiceButton" onClick={() => {
                            localStorage.setItem('role', 'ROLE_ADMIN');
                            navigate('/mixtapes');
                        }}>ADMIN VIEW</button>

                        <button className="userViewChoiceButton" onClick={() => {
                            localStorage.setItem('role', 'ROLE_USER');
                            navigate('/mixtapes');
                        }}>USER VIEW</button>
                    </div>


                )}
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