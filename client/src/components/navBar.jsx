import React, { useState } from 'react';
import  jwt  from 'jwt-decode';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const token=localStorage.getItem("token")

      
  return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="/" >College.com</a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
          <a class="nav-item nav-link" href="/login">Log in</a>
          <a class="nav-item nav-link" href="/" onClick={()=>{localStorage.removeItem('token')}}>Log out</a>
          <a class="nav-item nav-link" href="/profile">{jwt(token).name.split(" ")[0]}'s courses</a>
          {/* <a class="nav-item nav-link disabled" href="/">Disabled</a> */}
          </div>
      </div>
      </nav>
  );
}

export default NavBar;


