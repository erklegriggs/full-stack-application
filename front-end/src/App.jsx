import React from "react";

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import Signup from './components/Signup';
import {SecureRoute} from'./components/SecureRoute.jsx'
import SecuredComponent from "./components/SecuredComponent.jsx";
import Login from './components/Login';

function App() {
    return (
            <Router>
                <div>
                    <Link to="/signup">Signup</Link>
                    <br/>
                    <Link to="/login">Login</Link>
                    <br/>
                    <Link to="/secured">Secured</Link>
                    <br/>
                    <button onClick={() => {localStorage.clear(); window.location.reload();}}>Logout</button>

                </div>

                <Routes>
                    <Route path="/" element={<Signup/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
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
