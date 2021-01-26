import React, {useState} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import Button from '@material-ui/core/Button';


const LoginForm = (props) => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState(props.password);
  const [confirmpw, setConfirmPw] = useState(props.confirmpw);
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();

    setErrors([])

    axios.[props.method](props.url, {
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
      <form onSubmit={handleSubmit} >
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
        <Button variant="contained" color="primary">
          Login
        </Button>

        {errors.map( (err, index) => <h3 className="errors" key={index}> {err}</h3>)}

      </form>
    </div>

  );

};

export default LoginForm;