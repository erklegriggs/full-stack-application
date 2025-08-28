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
    const [searchFunction, setSearchFunction] = useState('');

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

    // associating genre names with their genre_id within mixtape table
    const getGenreName = (genreId) => {
        const genreNames = {1: 'Pop', 2: 'HipHop', 3: 'Country', 4: 'R&B', 5: 'Rock'};
        return genreNames[genreId];
    }

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

    const handleMixtapeDelete = async (mixtapeId) => {
        try {
            const key = localStorage.getItem('key');
            await fetch(`http://localhost:8080/api/mixtapes/${mixtapeId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${key}`,
                }
            });
            fetchMixtapes();
        } catch(error) {
            console.log("Error during deletion: " + error);
        }
    }

    useEffect(() => {
        fetchMixtapes();
    }, []);

    const filterMixtapes = mixtapes.filter(mixtape => mixtape.name.toLowerCase().includes(searchFunction.toLowerCase()));

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }
    return (
        <>
            <div className="mixtapesPage">
                <img src="/images/MxTapeLogo.jpg" alt="MxTape Company Logo" className="logo"/>
                <div className="mixtapesHeader">
                    <h1>Community Mixtapes</h1>
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
                <nav className="navigationHeader">
                    <a href="/" className="link">Home</a>
                    <a href="/about" className="link">About</a>
                    <a href="/mymusic" className="link">My Music</a>
                </nav>

                <div className="searchBar">
                    <input type="text" placeholder="Search by mixtape name..." value={searchFunction} onChange={(e) => setSearchFunction(e.target.value)} />
                </div>
                <div className="mixtapesContainer">
                    {filterMixtapes.map(mixtape => (
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
                            <p>{getGenreName(mixtape.genreId)}</p>
                            <p><i>{mixtape.description}</i></p>
                            <small>{mixtape.date}</small>
                            <span className="like" onClick={(e) => {
                                e.stopPropagation();
                                handleLikes(mixtape.mixtapeId, e);
                            }}>
                                {likedMixtapes.has(mixtape.mixtapeId) ? '❤︎':'♡'}
                            </span>
                            {localStorage.getItem('role') === 'ROLE_ADMIN' && (
                                <span className="delete" onClick={(e) => {
                                    e.stopPropagation();
                                    handleMixtapeDelete(mixtape.mixtapeId);
                                }}>🗑️</span>
                            )}
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