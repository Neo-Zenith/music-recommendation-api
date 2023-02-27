import React from "react";
import Navbar from "./components/common/Navbar";
import HeroSection from "./components/HeroSection";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Navbar />
            <Router>
                <Routes>
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
