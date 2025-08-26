import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Mixtapes.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function Mixtapes() {

    const navigate = useNavigate();
    const [mixtapes, setMixtapes] = useState([]);
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);
    const [likedMixtapes, setLikedMixtapes] = useState(new Set());

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUserProfilePic(userData.profilePicURL);
                setUserId(userData.id);
                setUsername(userData.username);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        fetchUserProfile();
    }, []);

    useEffect(() => {
        const fetchUserLikes = async () => {
            try {
                const key = localStorage.getItem('key');
                if(!userId) {
                    console.log("Error accessing userId: " + key)
                    return;
                }
                const response = await fetch(`http://localhost:8080/api/likes?userId=${userId}`, {
                    headers: {
                        "Authorization": `Bearer ${key}`
                    }
                });

                const likes = await response.json();
                const mixtapedIdLiked = likes.map(like => like.mixtapeId);
                setLikedMixtapes( new Set(mixtapedIdLiked));
            } catch(error) {
                console.log("Error: " + error)
            }
        }

        fetchUserLikes();
    }, [userId]);

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

    const handleLikes = async (mixtapeId, e) => {
        try {
            const   key = localStorage.getItem('key');
            if(!userId) {
                console.log("Error accessing userId: " + key);
                return;
            }
            // like a mixtape
            if(!likedMixtapes.has(mixtapeId)) {
                await fetch('http://localhost:8080/api/likes', {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${key}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: userId,
                        mixtapeId: mixtapeId,
                    })
                });
                const newLike = new Set(likedMixtapes);
                newLike.add(mixtapeId);
                setLikedMixtapes(newLike);
            // remove like from mixtape
            } else {
                await fetch(`http://localhost:8080/api/likes?userId=${userId}&mixtapeId=${mixtapeId}`, {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${key}`,
                    }
                });
                const newLike = new Set(likedMixtapes);
                newLike.delete(mixtapeId);
                setLikedMixtapes(newLike);
            }

        } catch(error) {
            console.log("Error: " + error);
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
                        <p>{username}</p>
                        <button onClick={logOut} className="logoutButton">
                            Logout
                        </button>
                    </div>
                </div>

                <div className="mixtapesContainer">
                    {mixtapes.map(mixtape => (
                        <div key={mixtape.mixtapeId} className="mixtapeCard"
                             onClick={() => navigate(`/mixtapes/${mixtape.mixtapeId}/songs`)}>
                            <div className={`coverPreview ${mixtape.mixtapePicURL ? 'hasImage' : ''}`}>
                                {mixtape.mixtapePicURL ? (
                                    <img src={`http://localhost:8080${mixtape.mixtapePicURL}`} alt="Mixtape Cover Preview" />
                                ):(
                                    <div className="coverPreviewPlaceholder">
                                        Choose an Image
                                    </div>
                                )}
                            </div>
                            <h3>{mixtape.name}</h3>
                            <p>by <strong>{mixtape.user.username}</strong></p>
                            <p><i>{mixtape.description}</i></p>
                            <small>{mixtape.date}</small>
                            <span className="like" onClick={(e) => {
                                e.stopPropagation();
                                handleLikes(mixtape.mixtapeId, e);
                            }}>
                                {likedMixtapes.has(mixtape.mixtapeId) ? '❤︎':'♡'}
                            </span>
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