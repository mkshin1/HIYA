import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import Button from '@material-ui/core/Button';
import "../LoginView.css"


const LoginForm = (props) => {
  // const [email, setEmail] = useState(props.email);
  // const [password, setPassword] = useState(props.password);
  // const [logged, setLogged] = useState(false);
  // console.log('Email from form: ', email)
  // console.log('Password from form: ', password)

  const [errors, setErrors] = useState([]);

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
        console.log('User from Login: ', res.data.user)
        localStorage.setItem('userID', res.data.user._id)
        localStorage.setItem('userFirstName', res.data.user.firstName)
        const lastNameInitial = res.data.user.lastName.charAt(0);
        // console.log("lastNameInitial: ", lastNameInitial)
        localStorage.setItem('userLastNameInitial', lastNameInitial)
        // setLogged(res.data.user)
        console.log('user from login form: ', res.data.user)
        navigate('/home')
      })
      .catch(err => {
        const errorArr = [];
        const errorData = err.response.data
        console.log('Error Response: ', err.response)
        errorArr.push(errorData.message);
        if (errorData.errors) {
          const errorResponse = errorData.errors;
          for (const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].message)
            console.log("Email error :",errorResponse[key].message)
          }
        }
        setErrors(errorArr);
      })
  }


  return(
    <div>

      <form onSubmit={handleSubmit} className="login-form-smaller-div">
        <p>
          {/* <label>Email:</label> */}
          <input type="text" className="registerForm-inputField" stye={{fontFamily: "Century-Gothic"}} placeholder="Email Address" value={user.email} onChange={ (e) => changeUserLogin("email", e.target.value) } />
        </p>
        <p>
          {/* <label>Password:</label> */}
          <input type="password" className="registerForm-inputField" placeholder="Password" value={user.password} onChange={ (e) => changeUserLogin("password", e.target.value) } />
        </p>
        <button className="login-btn" type="submit">Log In</button>


        {errors.map( (err, index) => <h3 className="errors" key={index}> {err}</h3>)}

      </form>
    </div>

  );

};

export default LoginForm;