import React, {useEffect, useState} from 'react';
import {Form, useNavigate} from "react-router-dom";
import {getUserProfile} from "../utilities/apiUtilities.js";

export default function CreateMixtapes() {

    const navigate = useNavigate();
    const [mixtapePicFile, setMixtapePicFile] = useState(null);
    const [mixtapePicPreview, setMixtapePicPreview] = useState(null);
    const[userId, setUserId] = useState(null);
    const [userProfilePic, setUserProfilePic] = useState(null);
    const [songs, setSongs] = useState([{name: '', file: null}])
    const [isCreationFormOpen, setIsCreationFormOpen] = useState(false);
    const [creationErrors, setCreationErrors] = useState([]);

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

    const handleMixtapePicSubmit = (e) => {
        const file = e.target.files[0];
        setMixtapePicFile(file);
        if(file) {
            const reader = new FileReader();
            reader.onload = (e) => setMixtapePicPreview(e.target.result);
            reader.readAsDataURL(file);
        } else {
            setMixtapePicPreview(null);
            setMixtapePicFile(null);
        }
    }

    const [mixtapeForm, setMixtapeForm] = useState({
        name: '',
        description: '',
        genreId: '',
    });

    const handleFormChange = (e) => {
        setMixtapeForm({...mixtapeForm,[e.target.name]: e.target.value});
    }

    const updateSongName = (index, value) => {
        let newSongs = [...songs];
        newSongs[index].name = value;
        setSongs(newSongs);
    }

    const updateSongFile = (index, file) => {
        let newSongs = [...songs];
        newSongs[index].file = file;
        setSongs(newSongs);
    }

    const addSongs = () => {
        setSongs([...songs, {name: '', file: null}]);
    }

    const deleteSongs = (index) => {
        if(songs.length > 1) {
            setSongs(songs.filter((song, i) => i !== index));
        }
    }

    const validateForm = () => {
        let errors = [];
        if(!mixtapeForm.name) {
            errors.push("Mixtape name is required");
        }
        if(!mixtapeForm.description) {
            errors.push("Mixtape description is required");
        }
        if(!mixtapeForm.genreId) {
            errors.push("Mixtape genre is required");
        }

        // looping through all songs for validating form fields
        for (let i = 0; i < songs.length; i++) {
            if(!songs[i].name) {
                errors.push("Song " + (i+1) + " needs a name");
            }
            if(!songs[i].file) {
                errors.push("Song " + (i+1) + " needs an audio file");
            }

        }

        setCreationErrors(errors)
        return errors.length === 0;
    }

    const handleMixtapeSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) {
            return;
        }
        try {
            const mixtapeData = {
                name: mixtapeForm.name,
                description: mixtapeForm.description,
                genreId: mixtapeForm.genreId,
                userId: userId
            };
            const mixtapeResponse = await fetch(`http://localhost:8080/api/mixtapes`, {
                method: "POST",
                headers: {"Authorization": "Bearer " + localStorage.getItem('key'), "Content-Type": "application/json"},
                body: JSON.stringify(mixtapeData),
            });
            const mixtape = await mixtapeResponse.json();

            if(mixtapePicFile) {
                const mixtapeCoverData = new FormData();
                mixtapeCoverData.append('file', mixtapePicFile);

                await fetch(`http://localhost:8080/api/mixtapes/${mixtape.mixtapeId}/picture`, {
                    method: "POST",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('key')},
                    body: mixtapeCoverData
                })
            }

            for (let i = 0; i < songs.length; i++) {
                const formData = new FormData();
                formData.append('Name', songs[i].name);
                formData.append('Audiofile', songs[i].file);
                await fetch(`http://localhost:8080/api/songs/mixtape/${mixtape.mixtapeId}`, {
                    method: "POST",
                    headers: {"Authorization": "Bearer " + localStorage.getItem('key')},
                    body: formData,
                });
            }
            navigate('/mymusic');
        } catch (error) {
            console.log("Mixtape creation failed. Error: " + error);
        }

    }

    const changeCreationFormDisplay = () => {
        setIsCreationFormOpen(true);
    }

    const logOut = () => {
        localStorage.clear();
        navigate("/");
    }


    return (
        <>
            <div className="mixtapeCreationContainer">
                <h3>Create Your Sound!</h3>
                <div className="creationHeader">
                    <h1>Mixtapes</h1>
                    <button onClick={changeCreationFormDisplay}>
                        {isCreationFormOpen ? 'Creation Form' : '+'}
                    </button>
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
                {isCreationFormOpen && (
                    <form  onSubmit={handleMixtapeSubmit}>
                        {creationErrors.map((error, index) =>
                            <p key={index}>{error}</p>)}

                        <label>Mixtape Name:</label>
                        <input name="name" value={mixtapeForm.name} onChange={handleFormChange}/>
                        <label>Description:</label>
                        <input name="description" value={mixtapeForm.description} onChange={handleFormChange}/>
                        <label>Genre:</label>
                        <select name="genreId" value={mixtapeForm.genreId} onChange={handleFormChange}>
                            <option>Choose your genre:</option>
                            <option>Pop</option>
                            <option>HipHop</option>
                            <option>Country</option>
                            <option>R&B</option>
                            <option>Rock</option>
                        </select>

                        <label>Mixtape Cover</label>
                        <div className={`coverPreview ${mixtapePicPreview ? 'hasImage' : ''}`}>
                            {mixtapePicPreview ? (
                                <img src={mixtapePicPreview} alt="Cover Preview" />
                            ):(
                                <div className="coverPreviewPlaceholder">
                                    Choose an Image
                                </div>
                            )}
                        </div>

                        <input
                            type="file"
                            accept=".jpg, .png, .jpeg"
                            onChange={handleMixtapePicSubmit}
                        />

                        <label>Songs</label>
                        {songs.map((song, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    placeholder={"Song " + (index+1) + " Name"}
                                    value={song.name}
                                    onChange={(e) => updateSongName(index, e.target.value)}/>
                                <input
                                    type="file"
                                    accept="audio/*"
                                    onChange={(e) => updateSongFile(index, e.target.files[0])}/>
                                {songs.length > 1 && (
                                    <button  type="button" onClick={() => deleteSongs(index)}>🗑️</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addSongs}>Add song +</button>

                        <button type="submit">Create</button>
                    </form>
                )}






            </div>




        </>



    )





}