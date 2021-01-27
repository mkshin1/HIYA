import React, { useEffect, useState } from 'react';
import { Link, navigate } from '@reach/router';
import axios from 'axios';
import RegisterForm from '../components/RegisterForm';

import SearchAppBar from "../components/SearchAppBar"
// import Container from "../components/Container"
// import Variants from "../components/Variants"


// register page
const Register = (props) => {

  return (
    <div>
      {/* <SearchAppBar /> */}

      <header>
        <h1>Hiya!!</h1>
      </header>

      <RegisterForm />
    </div>
  );
};

export default Register;