import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import Button from '@material-ui/core/Button';
import "../LoginView.css"


const LoginForm = (props) => {
  // const [email, setEmail] = useState(props.email);
  // const [password, setPassword] = useState(props.password);
  const [errors, setErrors] = useState([]);

  // console.log('Email from form: ', email)
  // console.log('Password from form: ', password)

  const [user,setUser] = useState({
    email: "",
    password: "",
    ...props.user
  });

  const changeUserLogin = (key, value) => {
    let state= {...user};
    state[key] = value;
    setUser(state)
  }

  const handleSubmit = e => {
    console.log('this is from login!')
    e.preventDefault();

    setErrors([])

    axios.post('http://localhost:8000/api/user/login', user, {withCredentials: true})
      .then(res => {
        console.log('Response!!')
        console.log('User from Login: ', user)
        navigate('/home')
      })
      .catch(err => {
        // console.log("ERRORS", JSON.stringify(err.response))
        // console.log("ERRORS", err.response.data)
        // const errorResponse = err.response.data;
        // const errorArr = [];
        // for (const key of Object.keys(errorResponse)) {
        //   errorArr.push(errorResponse[key].message)
        // }
        // setErrors(errorArr);
        // console.log(err.response.data)
        const errorArr = [];
        const errorData = err.response.data
        errorArr.push(errorData.message);
        if (errorData.errors) {
          const errorResponse = errorData.errors;
          for (const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message)
          }
        }
        setErrors(errorArr);
      })
  }


  return(
    <div>
      <form onSubmit={handleSubmit} className="login-form-div">
        <p>
          {/* <label>Email:</label> */}
          <input type="text" className="registerForm-inputField" placeholder="Email Address" value={user.email} onChange={ (e) => changeUserLogin("email", e.target.value) } />
        </p>
        <p>
          {/* <label>Password:</label> */}
          <input type="text" className="registerForm-inputField" placeholder="Password" value={user.password} onChange={ (e) => changeUserLogin("password", e.target.value) } />
        </p>
        <button className="login-btn" type="submit">Log In</button>


        {errors.map( (err, index) => <h3 className="errors" key={index}> {err}</h3>)}

      </form>
    </div>

  );

};

export default LoginForm;