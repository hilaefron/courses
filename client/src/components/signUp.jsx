import React, { useState } from 'react';
import axios from 'axios';
import {setAuthToken} from '../token'
import { useNavigate ,Link} from 'react-router-dom';
import './logIn.css'


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sign up
                const data = { name: name, email: email, password: password };
                await axios.post("http://localhost:3001/api/students", data);
                // Log in the user after sign up
                const loginData = { email: email, password: password };
                const loginResponse = await axios.post("http://localhost:3001/api/logIn", loginData);
                const token = loginResponse.data.token;
                // Save token to local storage
                localStorage.setItem("token", token);
                setAuthToken(token);
                navigate('/profile');
                // redirect to protected page
        } catch (err) {
                alert("Invalid email or password.");
                console.log(err.message);
        }
    };

    return (
        <div className="login-card-container">
        <div className="login-card">

            <div className="card-header">
                <h1 className="card-title">Sign Up</h1>
            </div>

            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="form-label" htmlFor="name">Name</label>
                        <input
                            className="form-input"
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                            <button className="form-submit-btn" type="submit">Sign Up</button>
                        </div>
                        <div>
                            <Link to="/login" className="form-link">Alredy registeres? <br/>Log in here!</Link>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    </div>
)
}
export default SignUp;
