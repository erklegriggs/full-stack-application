import {useState} from "react";
import {login} from "../utilities/apiUtilities";
import {jwtDecode} from "jwt-decode";
import "../css/App.css";
import {useNavigate} from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            username: username,
            password: password
        }
        login(payload).then((response) => {
            const claims = jwtDecode(response.token);
            localStorage.setItem('key', response.token);
            localStorage.setItem('role', claims.role[0].authority);
            localStorage.setItem('username', claims.sub);
            navigate('/mixtapes');
        }, []);
    }

    return (
        <div className="loginContainer">
            <h3>Log In</h3>
            <form onSubmit={handleSubmit}>
                <label> username:
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}/>
                </label>
                <br/>
                <label>Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <br/>
                <button type="submit">Log In</button>
            </form>
            <h3>Login Response</h3>
            <div>{localStorage.getItem('key') && JSON.stringify(localStorage.getItem('key'))}</div>
        </div>
    )
}