import React, {useEffect, useState} from 'react';
import '../css/About.css';
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function About() {

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



    return (
        <>
            <div className="songsPage">
                <img src="/images/MxTapeLogo.jpg" alt="MxTape Company Logo" className="logo"/>
                <nav className="navigationHeader">
                    {localStorage.getItem('key') && (
                        <div>
                            <a href="/mixtapes" className="link">Home</a>
                            <a href="/mymusic" className="link">My Music</a>
                        </div>
                    )}
                    {!localStorage.getItem('key') && (
                        <a href="/" className="link">Login</a>
                    )}
                </nav>
                <div className="aboutHeader">
                    <h3>About MxTape</h3>
                </div>
                <div className="aboutDetails">
                    <div className="aboutSections">
                        <h3>Commit</h3>
                        <p>MxTape revives the simplicity of curating music and sharing it with the world. No sitting and pondering which songs to upload or what opinions will be, just commit. Share your genuine story, that is why we created MxTape.</p>
                        <h3>Discover</h3>
                        <p>Every playlist and mixtape here comes from a real person with real taste, not algorithmically generated music predicting what you enjoy. Find mixtapes by people who care about the flow of their tracks, and understand it's not always about the 'hit' song, but rather having different songs that hit for different moods.</p>
                        <h3>Connect</h3>
                        <p>We aren't just about music, but about the people behind the art. Find curators that match your vibe, and share their music or show love by just hitting the like button. Welcome to a community where music discovery feels personal again.</p>
                    </div>
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