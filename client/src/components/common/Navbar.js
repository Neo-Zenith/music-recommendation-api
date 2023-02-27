import React, { useState, useEffect } from "react";
import logo from "../../static/img/logo_main.png";
import "../../static/css/navbar.css";

function Navbar() {
    const [showAbout, setShowAbout] = useState(false);
    const [showGetStarted, setShowGetStarted] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            const aboutLink = document.getElementById("about");
            const getStartedLink = document.getElementById("get-started");
            if (!aboutLink.contains(e.target)) {
                aboutLink.classList.remove("active");
                setShowAbout(false);
            }
            if (!getStartedLink.contains(e.target)) {
                getStartedLink.classList.remove("active");
                setShowGetStarted(false);
            }
        };
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const onAboutClick = () => {
        const aboutLink = document.getElementById("about");
        if (aboutLink.classList.contains("active")) {
            aboutLink.classList.remove("active");
        } else {
            aboutLink.classList.add("active");
        }
        setShowAbout(!showAbout);
        setShowGetStarted(false);
    };

    const onGetStartedClick = () => {
        const getStartedLink = document.getElementById("get-started");
        if (getStartedLink.classList.contains("active")) {
            getStartedLink.classList.remove("active");
        } else {
            getStartedLink.classList.add("active");
        }
        setShowGetStarted(!showGetStarted);
        setShowAbout(false);
    };

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-logo">
                    <img src={logo} alt="App Logo" />
                </div>
                <div className="navbar-links">
                    <ul className="main-links">
                        <li>
                            <a href="/">Home</a>
                        </li>
                        <li>
                            <a id="about" href="#" onClick={onAboutClick}>
                                About
                            </a>
                            {showAbout && (
                                <ul className="dropdown-links">
                                    <li>
                                        <a href="">Project</a>
                                    </li>
                                    <li>
                                        <a href="">Contact</a>
                                    </li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <a
                                id="get-started"
                                href="#"
                                onClick={onGetStartedClick}
                            >
                                Get Started
                            </a>
                            {showGetStarted && (
                                <ul className="dropdown-links">
                                    <li>
                                        <a href="/login">Login</a>
                                    </li>
                                    <li>
                                        <a href="/signup">Signup</a>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default Navbar;
