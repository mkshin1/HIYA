import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import LoginForm from '../components/Login';
import RegisterForm from '../components/Register';

import SearchAppBar from "../components/SearchAppBar"
// import Container from "../components/Container"
// import Variants from "../components/Variants"


const LoginAndRegister = (props) => {

  return (
    <div>
      {/* <SearchAppBar /> */}

      <header>
        <h1>Hiya!!</h1>
      </header>

      <LoginForm />
      <RegisterForm />
    </div>
  );
};

export default LoginAndRegister;