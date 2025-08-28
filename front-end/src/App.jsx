import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import {SecureRoute} from'./components/SecureRoute.jsx'
import SecuredComponent from "./components/SecuredComponent.jsx";
import Login from './components/Login';
import Home from './components/Home.jsx';
import Mixtapes from "./components/Mixtapes.jsx";
import Songs from "./components/Songs.jsx";
import MyMusic from "./components/MyMusic.jsx";
import CreateMixtapes from "./components/CreateMixtapes.jsx";
import About from "./components/About.jsx";

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/mixtapes" element={<Mixtapes/>}/>
                    <Route path="/mixtapes/:mixtapeId/songs" element={<Songs/>}/>
                    <Route path="/mymusic" element={<MyMusic/>}/>
                    <Route path="/create-mixtapes" element={<CreateMixtapes/>}/>
                    <Route path="/about" element={<About/>}/>
                    <Route path="/secured" element={
                        <SecureRoute component={
                            <SecuredComponent/>
                        }/>
                    }/>
                </Routes>
            </Router>
    )
}

export default App
