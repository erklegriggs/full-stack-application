import {useState} from 'react';
import {signup} from "../utilities/apiUtilities";

import { jwtDecode } from 'jwt-decode'
import {useNavigate} from "react-router-dom";

export default function Signup() {
    const navigate = useNavigate();
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [profilePicFile, setProfilePicFile] = useState(null);
    const [profilePicPreview, setProfilePicPreview] = useState(null);
    let [signupErrors, setSignupErrors] = useState([]);

    const handleProfilePicSubmit = (e) => {
        const file = e.target.files[0];
        setProfilePicFile(file);
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => setProfilePicPreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setProfilePicPreview(null);
            setProfilePicFile(null);
        }
    }

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
        // don't submit until all fields pass validation
        if(!validateForm()) {
            return;
        }

        const payload = { username: Username, password: password };

        signup(payload).then(async (response) => {
            console.log(response)
            const userData = jwtDecode(response.token);
            localStorage.setItem('key', response.token);
            localStorage.setItem('role', userData.role[0].authority);
            localStorage.setItem('username', userData.sub);
            if(profilePicFile) {
                const formData = new FormData();
                formData.append('profilePic', profilePicFile);
                try {
                    await fetch(`http://localhost:8080/api/users/${response.userId}/profile-pic`, {
                        method: "POST",
                        headers: {'Authorization': `Bearer ${response.token}`},
                        body: formData,
                    })
                } catch (error) {
                    console.log("Profile picture upload failed! Error: " + error);
                }
            }

            navigate('/login');
        }, []);
    }

    return (
        <>
            <div className="signupContainer">
                <h3>Sign Up</h3>
                <form onSubmit={handleSubmit}>
                    {signupErrors.map((error, index) =>
                        <p key={index}>{error}</p>)}
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

                    <label>Avatar</label>
                    <div className={`avatarPreview ${profilePicPreview ? 'hasImage' : ''}`}>
                        {profilePicPreview ? (
                            <img src={profilePicPreview} alt="Avatar Preview" />
                        ):(
                            <div className="avatarPreviewPlaceholder">
                                Choose an Image
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept=".jpg, .png, .jpeg"
                        onChange={handleProfilePicSubmit}
                    />

                    <button type="submit">Sign Up</button>
                </form>
            </div>
        </>
    )
}