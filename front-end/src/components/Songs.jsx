import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import '../css/Songs.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function Songs() {

    const navigate = useNavigate();
    const [mixtape, setMixtape] = useState(null);
    const {mixtapeId} = useParams();
    const [songs, setSongs] = useState([]);
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [username, setUsername] = useState('');
    const [playingSong, setPlayingSong] = useState(null);
    const [playingSongId, setPlayingSongId] = useState(null);

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

    const fetchMixtapes = async () => {
        try {
            const key = localStorage.getItem('key');
            const response = await fetch(`http://localhost:8080/api/mixtapes/${mixtapeId}`, {
                headers: {
                    'Authorization': `Bearer ${key}`
                }
            });
            const data = await response.json();
            setMixtape(data);
        } catch (error) {
            console.log("There was a problem: ", error);
        }
    }

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

    // pause any songs currently playing
    const playSongPreview = async (songId) => {
        if(playingSong) {
            playingSong.pause();
        }
        try {
            const key = localStorage.getItem('key');
            const response = await fetch(`http://localhost:8080/api/songs/${songId}/audio`, {
                headers: {
                    "Authorization": `Bearer ${key}`
                }
            });
            const audioData = await response.blob();
            const audioFile = URL.createObjectURL(audioData);
            const audio = new Audio(audioFile);
            setPlayingSong(audio);
            setPlayingSongId(songId);
            audio.play();

            setTimeout(() => {
                audio.pause();
                setPlayingSong(null);
                setPlayingSongId(null);
                URL.revokeObjectURL(audioFile);
            }, 15000);

            audio.onended = () => {
                setPlayingSong(null);
                setPlayingSongId(null);
                URL.revokeObjectURL(audioFile);
            }
        } catch(error) {
            console.log("Error with audio file: " + error);
        }
    }

    const stopSongPreview = () => {
        if(playingSong) {
            playingSong.pause();
            setPlayingSong(null);
            setPlayingSongId(null);
        }
    }



    useEffect(() => {
        fetchSongs();
        fetchMixtapes();
    }, [mixtapeId]);

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }

    return (
        <>
            <div className="songsPage">
                <div className="songsHeader">
                    <div className="mixtapeDetails">
                        {mixtape && mixtape.mixtapePicURL && (
                            <img src={`http://localhost:8080${mixtape.mixtapePicURL}`} alt="Mixtape Cover Image" className="mixtapeCover" />
                        )}
                        <h1>{mixtape ? mixtape.name : "Waiting.."}</h1>
                    </div>
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
                <div className="songsContainer">
                    {songs.map(song => (
                        <div key={song.songId} className="songCard">
                            <h3>{song.name}</h3>
                            {playingSongId === song.songId ? (
                                <button onClick={stopSongPreview} className="stopAudioButton">⏹</button>
                            ) : (
                                <button onClick={() => playSongPreview(song.songId)} className="startAudioButton">▷</button>
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