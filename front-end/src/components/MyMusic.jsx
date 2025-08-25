import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/MyMusic.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function MyMusic() {
    const [mixtapes, setMixtapes] = useState([]);
    const navigate = useNavigate();
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUserProfilePic(userData.profilePicURL);
                setUserId(userData.id);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        fetchUserProfile();
    }, []);

    const fetchUsersMixtapes = async () => {
        try {
            const key = localStorage.getItem('key');
            const response = await fetch(`http://localhost:8080/api/mixtapes?userId=${userId}`, {
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
        // ensuring userId is found before fetching
        if(userId) {
            fetchUsersMixtapes();
        }
    }, [userId]);

    const handleCreateButton = () => {
        navigate("/create-mixtapes");
    }

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <div className="musicPage">
                <div className="musicHeader">
                    <h1>Your art, all in one place.</h1>
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

                <div className="musicContainer">
                    <div className="createMixtapesCard" onClick={handleCreateButton}>
                        <div className="plusButton">+</div>
                        <p>Create</p>
                    </div>
                    {mixtapes.map(mixtape => (
                        <div key={mixtape.mixtapeId} className="musicCard"
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