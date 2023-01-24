import React, { useEffect,useState } from 'react';
import  jwt  from 'jwt-decode';
import './navBar.css'


const NavBar = () => {
  const [name,setName]=useState('')
  const [disable,setDisable]=useState('')

  useEffect(() => {
   if( localStorage.getItem('token'))
    {setName(jwt(localStorage.getItem('token')).name.split(" ")[0])
    setDisable('block')}else
    {setName('Guest')
    setDisable('none')}
    //if logged in there is no option to log out or see the student's courses
  },[])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ fontFamily: "Poppins" }}>
      <a className="navbar-brand" href="/" >College.com</a>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
          <a className="nav-item nav-link" href="/login">Log in</a>
          <a className="nav-item nav-link" href="/" 
          onClick={()=>{localStorage.removeItem('token')}} style={{"display":disable}}>Log out</a>
          <a className="nav-item nav-link" href="/profile" style={{"display":disable}}>
            {name.toUpperCase()}'s courses</a>
          </div>
      </div>
    </nav>
  );
}

export default NavBar;


