import React, { useState } from "react";
import "../../static/css/login.css";
import loginBanner from "../../static/img/login_banner.png";

function Login() {
    const handleSubmit = () => {};
    const [password, setPassword] = useState("");
    const [loginID, setLoginID] = useState("");

    return (
        <>
            <div className="page-container">
                <div className="login-page-banner">
                    <img src={loginBanner} />
                </div>
                <div className="login-container">
                    <div className="login-form">
                        <div className="login-header">
                            <span>Login</span>
                        </div>
                        <div className="login-subtitle">
                            <span>
                                Don't have an account?{" "}
                                <a href="/signup">Create one now</a>.
                            </span>
                        </div>

                        <div className="login-content">
                            <div
                                id="login-error"
                                className="login-error"
                                style={{ display: "none" }}
                            >
                                <span>
                                    ⊙ Invalid credentials. Please try again!
                                </span>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <input
                                    required
                                    type="text"
                                    id="username/email"
                                    name="username/email"
                                    placeholder="Username"
                                    onChange={(e) => setLoginID(e.target.value)}
                                />
                                <input
                                    required
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <input
                                    id="submit-btn"
                                    type="submit"
                                    value="Login"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
