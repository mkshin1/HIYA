import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import LoginForm from '../components/LoginForm';
import "../LoginView.css"
// import RegisterForm from '../components/Register';

import SearchAppBar from "../components/SearchAppBar"
// import Container from "../components/Container"
// import Variants from "../components/Variants"

// Login Page
const Login = (props) => {

  return (
    <div>
      {/* <SearchAppBar /> */}

      <header>
        <div><h1>Hiya!!</h1></div>
        {/* navbar? */}
      </header>

      <div>
        <h1>Welcome Back Ninja!</h1>
        <LoginForm />
      </div>

    </div>
  );
};

export default Login;