import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Mixtapes.css';

export default function Mixtapes() {

    const navigate = useNavigate();
    const [mixtapes, setMixtapes] = useState([]);

    const fetchMixtapes = async () => {
        try {
            const token = localStorage.getItem('key');
            const response = await fetch('http://localhost:8080/api/mixtapes', {
                headers: {
                    'Authorization': `Bearer ${token}`
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
        <div>
            <h1>Mixtapes</h1>
            <button onClick={logOut}>Logout</button>

            <div className="mixtapesContainer">
                {mixtapes.map(mixtape => (
                    <div key={mixtape.mixtapeId} className="mixtapeCard">
                        <h3>{mixtape.name}</h3>
                        <p>by {mixtape.username}</p>
                        <p>{mixtape.description}</p>
                        <small>{mixtape.date}</small>
                    </div>
                ))}
            </div>
        </div>
    )
}