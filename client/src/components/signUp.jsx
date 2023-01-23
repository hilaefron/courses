import React, { useState } from 'react';
import axios from 'axios';
import {setAuthToken} from '../token'
import { useNavigate } from 'react-router-dom';
import  jwt  from 'jwt-decode';


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
                console.log(token);
                console.log(jwt(token));
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
        <form onSubmit={handleSubmit}>
            <h3>Sign up</h3>

            <div class="form-group">
                <label>Name</label>
                <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} />
            </div>

            <div class="form-group">
                <label>Email address</label>
                <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} />
            </div>

            <button type="submit" class="btn btn-primary">sin up</button>
            </form>  
  );
}
export default SignUp;
