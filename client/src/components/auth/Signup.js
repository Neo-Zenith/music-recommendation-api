import React, { useState, useEffect } from "react";
import "../../static/css/signup.css";
import loginBanner from "../../static/img/login_banner.png";

function Signup() {
    // for API use
    const [username, setUsername] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    // for user input
    const [newUsername, setNewUsername] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newRetypedPassword, setNewRetypedPassword] = useState("");

    const handleSubmit = () => {};

    useEffect(() => {
        if (newPassword != newRetypedPassword) {
            setErrorMessage("Passwords do not match!");
            document.getElementById("signup-error").style.display = "flex";
            document.getElementById("submit-btn").disabled = true;
        } else {
            setErrorMessage("");
            document.getElementById("signup-error").style.display = "none";
            document.getElementById("submit-btn").disabled = false;
        }
    }, [newPassword, newRetypedPassword]);

    return (
        <>
            <div className="page-container">
                <div className="signup-page-banner">
                    <img src={loginBanner} />
                </div>
                <div className="signup-container">
                    <div className="signup-form">
                        <div className="signup-header">
                            <span>Signup</span>
                        </div>
                        <div className="signup-subtitle">
                            <span>
                                Already have an account?{" "}
                                <a href="/login">Login now</a>.
                            </span>
                        </div>

                        <div className="signup-content">
                            <div
                                id="signup-error"
                                className="signup-error"
                                style={{ display: "none" }}
                            >
                                <span>⊙ {errorMessage}</span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    required
                                    type="text"
                                    id="username"
                                    name="username"
                                    placeholder="Username"
                                    onChange={(e) => {
                                        setNewUsername(e.target.value);
                                    }}
                                />
                                <input
                                    required
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Email address"
                                    onChange={(e) => {
                                        setNewEmail(e.target.value);
                                    }}
                                />
                                <input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) => {
                                        setNewPassword(e.target.value);
                                    }}
                                />
                                <input
                                    required
                                    type="password"
                                    id="password-retype"
                                    name="password-retype"
                                    placeholder="Retype Password"
                                    onChange={(e) => {
                                        setNewRetypedPassword(e.target.value);
                                    }}
                                />
                                <input
                                    required
                                    id="submit-btn"
                                    type="submit"
                                    value="Signup"
                                    disabled
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Signup;
