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
        e.preventDefault();
        try {
            const loginData = { email: email, password: password };
            const loginResponse = await axios.post("http://localhost:3001/api/logIn", loginData);
            const token = loginResponse.data.token;
            console.log(jwt(token));
            localStorage.setItem("token", token);
            setAuthToken(token);
            navigate('/profile',jwt(token));
        } catch (err) {
            alert("Invalid email or password")
            console.log(err.message);
        }
    };

    return (
        <div className="login-card">
          <div className="card-header">
            <h2 className="card-title">Log In</h2>
          </div>
            <form onSubmit={handleSubmit} className="card-body">
                <div className="form-control">
                <label className="form-label" htmlFor="email">Email</label>
                <input className="form-input" type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}  required/>
                </div>

                <div className="form-control">
                <label className="form-label" htmlFor="password">Password</label>
                <input className="form-input" type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                </div>

                <div className="form-footer">
                <button className="form-submit-btn" type="submit">Submit</button>
                <Link className="form-link" to="/signup">Don't have an account? Sign up</Link>
                </div>
            </form>
        </div>
    );
}

export default LogIn;
