import React,{useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {setAuthToken} from '../token'
import  jwt  from 'jwt-decode';
import './logIn.css'

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        //check if signed up, and if so, check id details are correct
        e.preventDefault();
        try {
            const loginData = { email: email, password: password };
            const loginResponse = await axios.post("http://localhost:3001/api/logIn", loginData);
            const token = loginResponse.data.token;
            localStorage.setItem("token", token);
            setAuthToken(token);
            navigate('/profile',jwt(token));
        } catch (err) {
            alert("Invalid email or password")
            console.log(err.message);
        }
    };

    return (
        <div className="login-card-container">
            <div className="login-card">

                <div className="card-header">
                    <h1 className="card-title">Log In</h1>
                </div>

                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input
                                className="form-input"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                className="form-input"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-footer">
                            <div>
                                <button className="form-submit-btn" type="submit">Log In</button>
                            </div>
                            <div>
                                <Link to="/signup" className="form-link">Not registerd yet? <br/>Sign Up here!</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default LogIn;
