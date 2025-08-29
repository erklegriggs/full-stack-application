import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import '../css/MyMusic.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function MyMusic() {
    const [mixtapes, setMixtapes] = useState([]);
    const navigate = useNavigate();
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [userId, setUserId] = useState(null);
    const [username, setUsername] = useState('');
    const [editMixtapeId, setEditMixtapeId] = useState(null);
    const [editMixtapeName,  setEditMixtapeName] = useState('');

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

    const handleMixtapeEdit = async (id) => {
        const key = localStorage.getItem('key');
        const currentMixtape = mixtapes.find(m => m.mixtapeId === id);
        console.log(currentMixtape);
        const response = await fetch(`http://localhost:8080/api/mixtapes`, {
            method: "PUT",
            headers: {
                'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mixtapeId: id,
                name: editMixtapeName,
                description: currentMixtape.description,
                genreId: currentMixtape.genreId,
                date:  currentMixtape.date,
                mixtapePicURL: currentMixtape.mixtapePicURL,
            })
        });

        if(response.ok) {
            setEditMixtapeId(null);
            fetchUsersMixtapes();
        }
    }

    const startMixtapeEdit = (id, name) => {
        setEditMixtapeId(id);
        setEditMixtapeName(name);
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
            fetchUsersMixtapes();
        } catch(error) {
            console.log("Error during deletion: " + error);
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
                <img src="/images/MxTapeLogo.jpg" alt="MxTape Company Logo" className="logo"/>
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
                        <p>{username}</p>
                        <button onClick={logOut} className="logoutButton">
                            Logout
                        </button>
                    </div>
                </div>
                <nav className="navigationHeader">
                    <a href="/" className="link">Home</a>
                    <a href="/about" className="link">About</a>
                </nav>

                <div className="createMixtapesCard" onClick={handleCreateButton}>
                    <div className="createMixtapeContainer">
                        <div className="plusButton">CREATE</div>
                    </div>
                </div>

                <div className="musicContainer">
                    {mixtapes.map(mixtape => (
                        <div key={mixtape.mixtapeId} className="musicCard"
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
                            {editMixtapeId === mixtape.mixtapeId ? (
                                <div>
                                    <input value={editMixtapeName} onChange={(e) => setEditMixtapeName(e.target.value)}
                                    onClick={(e) => e.stopPropagation()}/>
                                    <button onClick={(e) => {e.stopPropagation(); handleMixtapeEdit(mixtape.mixtapeId)}} className="doneButton">Done</button>
                                    <button onClick={(e) => {e.stopPropagation(); setEditMixtapeId(null)}} className="cancelButton">Cancel</button>
                                </div>
                            ) : (
                                <div>
                                    <h3>{mixtape.name}</h3>
                                    <button onClick={(e) => {e.stopPropagation(); startMixtapeEdit(mixtape.mixtapeId, mixtape.name)}} className="editButton">Edit</button>
                                    <span className="delete" onClick={(e) => {
                                        e.stopPropagation();
                                        handleMixtapeDelete(mixtape.mixtapeId);
                                    }}>🗑️</span>
                                </div>
                            )}
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