import React,{useState, useEffect} from 'react';
import { Link, } from 'react-router-dom';
import axios from 'axios';
import  jwt  from 'jwt-decode';
import './profile.css'; // import custom stylesheet

const Profile = () => {
    const [name,setName]=useState({})
    const [subjects,setSubjects]=useState([])
    const token = localStorage.getItem('token');
    const decoded=jwt(token);
    const userName=decoded.name 

    const getUser = async () => {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:3001/api/registers', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setName(data);
    }

    const getSubjects = async () => {
        const token = localStorage.getItem('token');
        const decoded=jwt(token);
        const userId=decoded.id 

        const r = await axios.get(`http://localhost:3001/api/registers/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(r.data);
        setSubjects(r.data);
    }
    
    useEffect(() => {
        getUser()
        getSubjects()
    }, []);

    return (
        <div className="profile-container">
            <h3 className="greeting">Hey {userName.split(" ")[0]}! <br/>Those are your courses:</h3>
            <div className="courses-container">
                {subjects.map((subject, index) => (
                <div key={index} className="course-card">
                    <h5 class="course-name">{subject.course_name}</h5>
                </div>
                ))}
            </div>
            <h4 className="challenge-text">Want to challenge yourself?</h4>
            <Link to="/">
                <button className="challenge-btn">Click here to try more courses</button>
            </Link>           
        </div>
    );
}

export default Profile;
