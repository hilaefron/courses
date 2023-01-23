import React,{useState} from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {setAuthToken} from '../token'
import  jwt  from 'jwt-decode';



const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Log in the user
            const loginData = { email: email, password: password };
            const loginResponse = await axios.post("http://localhost:3001/api/logIn", loginData);
            const token = loginResponse.data.token;
            console.log(jwt(token));
            // Save token to local storage
            localStorage.setItem("token", token);
            setAuthToken(token);
            navigate('/profile',jwt(token));
        } catch (err) {
            alert("Invalid email or password")
            console.log(err.message);
        }
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <h3>first, log in!</h3>
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
            
            <button type="submit" class="btn btn-primary">Submit</button>
            <Link to="/resetpassword"><button class="btn btn-primary">reset password</button></Link>
            <h3>don't have an account? sign up!</h3>
            <Link to="/signup"><button class="btn btn-primary">sign up here!</button></Link>
        </form>  
  );
}
export default LogIn;
