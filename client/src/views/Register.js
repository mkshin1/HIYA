import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import RegisterForm from '../components/RegisterForm';
import "../RegisterView.css"

import SearchAppBar from "../components/SearchAppBar"
// import Container from "../components/Container"
// import Variants from "../components/Variants"


// register page
const Register = (props) => {

  return (
    <div>
      {/* <SearchAppBar /> */}

      <header>
        <div className="left-header"><h1>Hiya!!</h1></div>
        <div></div>
        <div className="right-header">
          <button className="login-btn"><Link to="/" className="login-link">Log In</Link></button>
        </div>
      </header>

      <div className="register-form-div">
        <h1>Join Hiya!</h1>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;