import {useState} from 'react';
import {signup} from "../utilities/apiUtilities";

import { jwtDecode } from 'jwt-decode'
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    let [signupErrors, setSignupErrors] = useState([]);

    const validateForm = () => {
        let errors = [];
        if (!Username) {
            errors.push("Please enter a valid Username");
        }
        if (!password) {
            errors.push("Please enter a valid password");
        }
        if (!passwordConfirm) {
            errors.push("Please confirm password");
        }
        if (passwordConfirm !== password) {
            errors.push("Passwords do not match");
        }
        setSignupErrors(errors)
        return errors.length === 0;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // until all fields in form pass validation, don't process submit
        if(!validateForm()) {
            return;
        }

        const payload = { username: Username, password: password };

        signup(payload).then((response) => {
            console.log(response)
            const claims = jwtDecode(response.token);
            localStorage.setItem('key', response.token);
            localStorage.setItem('role', claims.role[0].authority);
            localStorage.setItem('username', claims.sub);
            navigate('/mixtapes');
        }, []);
    }

    return (
        <div className="signupContainer">
            <h3>Sign Up</h3>
            <form onSubmit={handleSubmit}>
                {signupErrors.length !== "" ?  signupErrors.map((error,index) =>
                    <p key={index}>{error}</p>
                ) : <p></p>}
                <label> Username:</label>
                    <input
                        type="text"
                        value={Username}
                        onChange={(e) => setUsername(e.target.value)}/>

                <br/>
                <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>

                <br/>
                <label>Confirm Password:</label>
                    <input
                        type="password"
                        value={passwordConfirm}
                        onChange={(e) => setPasswordConfirm(e.target.value)}
                    />

                <br/>
                <button type="submit">Sign Up</button>
            </form>
            <h3>Signup Response:</h3>
            <div>{localStorage.getItem('key') && localStorage.getItem('key')}</div>
        </div>
    )
}