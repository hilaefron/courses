import React, { useEffect, useState } from 'react';
import axios from 'axios'
import  jwt  from 'jwt-decode';
import './subjects.css'; // import custom stylesheet
import { useNavigate } from 'react-router-dom';


const Subjects = () => {
    const [subjects, setSubjects]=useState([])
    const url="http://localhost:3001/api/subject"
    const navigate=useNavigate()
    useEffect(() => {
        const getSubjects=async ()=>{
            const {data}=await axios.get(url,{})//get all subjects
            setSubjects(data)
        }
        getSubjects()
    }, []);
    const handleClick = async (subject) => {
       alert('are ou sure?')      
        const token=localStorage.getItem('token')
        if (!token){
            alert('you must log in first')
            navigate('/login')
        }
        const decoded=jwt(token);
        const userId=decoded.id 
        const subjectId=subject.subject_id 
        const courseName=subject.subject_name
        try{
            await axios.post("http://localhost:3001/api/registers",
            {userId:userId,subjectId:subjectId, courseName:courseName})// register a logged in student to the course
            alert('signed up successfully!')
        }
        catch(err){
            alert('you are already signed for this course, please try anotther one!');
        }     
    }
    return (
        <div >
            <div className="header-container">
                <h1>Wellcome to college.com</h1>
            </div>
            <div className="subjects-container">
                {subjects.map((subject, index) => (
                <div key={index} className="subject-card">
                    <h5 className="subject-name">{subject.subject_name}</h5>
                    <div className="level">Level: {subject.level}</div>
                    <div className="subject-description">{subject.description.split(' ').slice(0,22).join(' ')}...</div>
                    <button className="sign-up-btn" onClick={()=>handleClick(subject)}>
                        Sign up for {subject.subject_name}
                    </button> 
                </div>
                ))}
            </div>
        </div>
    );
}

export default Subjects;
