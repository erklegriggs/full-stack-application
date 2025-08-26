import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import '../css/Songs.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function Songs() {

    const navigate = useNavigate();
    const {mixtapeId} = useParams();
    const [songs, setSongs] = useState([]);
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUserProfilePic(userData.profilePicURL);
                setUsername(userData.username);
            } catch (error) {
                console.log("Error: " + error);
            }
        };
        fetchUserProfile();
    }, []);

    const fetchSongs = async () => {
        try {
            const key = localStorage.getItem('key');
            const response = await fetch(`http://localhost:8080/api/songs/mixtape/${mixtapeId}`, {
                headers: {
                    'Authorization': `Bearer ${key}`
                }
            });
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.log("There was a problem: ", error);
        }
    }

    const formatSongDurations = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec =  seconds % 60;
        return  `${min}:${sec.toString().padStart(2, '0')}`;
    }

    useEffect(() => {
        fetchSongs();
    }, [mixtapeId]);

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <div className="songsPage">
                <div className="songsHeader">
                    <h1>Song</h1>
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

                <div className="songsContainer">
                    {songs.map(song => (
                        <div key={song.songId} className="songCard">
                            <h3>{song.name}</h3>
                            <small>{formatSongDurations(song.duration)}</small>
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