import React from "react";

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import {SecureRoute} from'./components/SecureRoute.jsx'
import SecuredComponent from "./components/SecuredComponent.jsx";
import Login from './components/Login';
import Home from './components/Home.jsx';
import Mixtapes from "./components/Mixtapes.jsx";

function App() {
    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/mixtapes" element={<Mixtapes/>}/>
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
