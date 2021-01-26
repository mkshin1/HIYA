import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';

import SearchAppBar from "../components/SearchAppBar"
// import Container from "../components/Container"
// import Variants from "../components/Variants"


const loginAndRegister = (props) => {

  return (
    <div>
      <SearchAppBar />
      
      
      
      <header>
        <h1>Register</h1>
      </header>

      {/* <LoginForm 
        method = "post"
        email = ""
        password = ""
      /> */}

      <RegisterForm
        method = "post"
        firstName = ""
        lastName = ""
        email = ""
        password = ""
        confirmpw = ""
      />
    </div>
  );
};

export default loginAndRegister;