import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Mixtapes.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function Mixtapes() {

    const navigate = useNavigate();
    const [ mixtapes, setMixtapes ] = useState([]);
    const [ userProfilePic, setUserProfilePic ] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUserProfilePic(userData.profilePicURL);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        fetchUserProfile();
    }, []);


    const fetchMixtapes = async () => {
        try {
            const key = localStorage.getItem('key');
            const response = await fetch('http://localhost:8080/api/mixtapes', {
                headers: {
                    'Authorization': `Bearer ${key}`
                }
            });
            const data = await response.json();
            setMixtapes(data);
        } catch (error) {
            console.log("There was a problem: ", error);
        }
    }

    useEffect(() => {
        fetchMixtapes();
    }, []);

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <>
            <div className="mixtapesPage">
                <div className="mixtapesHeader">
                    <h1>Mixtapes</h1>
                    <div className="profile">
                        {userProfilePic && (
                            <img
                                src={`http://localhost:8080${userProfilePic}`}
                                alt="My Profile"
                                className="profilePic"
                            />
                        )}
                        <button onClick={logOut} className="logoutButton">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mixtapesContainer">
                    {mixtapes.map(mixtape => (
                        <div key={mixtape.mixtapeId} className="mixtapeCard"
                             onClick={() => navigate(`/mixtapes/${mixtape.mixtapeId}/songs`)}>
                            <h3>{mixtape.name}</h3>
                            <p>by {mixtape.user.username}</p>
                            <p>{mixtape.description}</p>
                            <small>{mixtape.date}</small>
                        </div>
                    ))}
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