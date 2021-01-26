import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import "../App.css"

const RegisterForm = (props) => {
  const [firstName, setFirstName] = useState(props.firstName);
  const [lastName, setLastName] = useState(props.lastName);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [confirmpw, setConfirmPw] = useState(props.confirmpw);
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    setErrors([])

    axios.[props.method](props.url, {
      firstName,
      lastName,
      email,
      password,
      confirmpw
    })
      .then(res => {
        console.log('Response: ', res.data)
        navigate('/')
      })
      .catch(err => {
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
          errorArr.push(errorResponse[key].message)
        }
        setErrors(errorArr);
        console.log(err.response.data)
      })
  }
  

  
  return(
    <div>

      <form  noValidate autoComplete="off" className="register-form">
          <div>
          
          <TextField id="outlined-basic" label="First Name" variant="outlined" />
          </div>
          <div>
          <TextField id="outlined-basic" label="Last Name" variant="outlined" />
          </div>
          <div>
          <TextField id="outlined-basic" label="Email" variant="outlined" />
          </div>
          <div>
          <TextField id="outlined-basic" label="Password" variant="outlined" />
          </div>
          <TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
          <div>
          <Button variant="contained" color="primary">Login</Button>
        </div>
        
      </form>


      <form >
        <p>
          <label>First Name:</label>
          <input type="text" value={firstName} onChange={ (e) => setFirstName(e.target.value) } />
        </p>
        <p>
          <label>Last Name:</label>
          <input type="text" value={lastName} onChange={ (e) => setLastName(e.target.value) } />
        </p>
        <p>
          <label>Email:</label>
          <input type="text" value={email} onChange={ (e) => setEmail(e.target.value) } />
        </p>
        <p>
          <label>Password:</label>
          <input type="text" value={password} onChange={ (e) => setPassword(e.target.value) } />
        </p>
        <p>
          <label>Confirm Password:</label>
          <input type="text" value={confirmpw} onChange={ (e) => setConfirmPw(e.target.value) } />
        </p>
        <input type="submit" value="Login"/>

        {errors.map( (err, index) => <h3 className="errors" key={index}> {err}</h3>)}

      </form>
    </div>

  );

};

export default RegisterForm;