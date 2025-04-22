import React from "react";
import icon from '../../../assets/images/icon.png';
import img4 from '../../../assets/images/img4.jpeg';

const RegisterForm = () => {
    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-left">
                    <header className="register-header">
                        <div className="logo">
                            <img
                                src={icon}
                                alt="White rounded diamond shape logo"
                                className="logo-icon"
                                width="32"
                                height="32"
                            />
                            <span className="logo-text">SESAVENTY</span>
                        </div>
                        <nav className="nav-links">
                            <Link to="/Login">Sign In</Link>
                            <Link to="/register">Sign Up</Link>
                        </nav>
                    </header>
                    <main className="register-main">
                        <div className="welcome-section">
                            <h1 className="welcome-text">Welcome!</h1>
                            <p className="welcome-subtext">Create an account to discover amazing events</p>
                        </div>
                        <form className="register-form">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><i className="fas fa-user" /></span>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><i className="fas fa-envelope" /></span>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="input-wrapper">
                                    <span className="input-icon"><i className="fas fa-lock" /></span>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button type="button" className="password-toggle">
                                        <i className="fas fa-eye" />
                                    </button>
                                </div>
                            </div>
                            <button type="submit" className="register-button">Register</button>
                        </form>
            </div>
            <div className="login-right">
                      <div className="image-overlay"></div>
                      <img src={img4} alt="Event Crowd" />
                      <div className="image-caption">
                        <h3>Discover Amazing Events</h3>
                        <p>Join thousands of events happening around you</p>
                      </div>
                    </div>
        </div>
        </div>
    )));
    };
        export default RegisterForm;
