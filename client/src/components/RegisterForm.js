import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {navigate} from '@reach/router';
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button"
import "../App.css"

const RegisterForm = (props) => {
  const [errors, setErrors] = useState([]);
  const [register, setRegister] = useState(false);

  const [user,setUser] = useState({
    firstName: '',
    lastName: "",
    email: "",
    password: "",
    confirmpw: "",
    ...props.user
  });

  const changeUser = (key, value) => {
    let state = {...user};
    state[key] = value;
    setUser(state)
  }

  const handleSubmit = e => {
    console.log('this is from handle submit')
    e.preventDefault();

    setErrors([])

    axios.post("http://localhost:8000/api/user/register", user, {
      withCredentials: true,
      headers: {'Access-Control-Allow-Origin': '*', 'Content-Type': 'application/json'}})
      .then(res => {
        // once done registering, navigate back to root
        navigate('/')
        setRegister(true)
      })
      .catch(err => {
        // console.log("ERRORS", JSON.stringify(err))
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

      {/* <form noValidate autoComplete="off" className="register-form">
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

      </form> */}

      <>
      {register ? <h3>Please login!</h3> : null}
      </>

      <form onSubmit={handleSubmit}>
        <p>
          <label>First Name:</label>
          <input type="text" value={user.firstName} onChange={ (e) => changeUser("firstName", e.target.value) } />
        </p>
        <p>
          <label>Last Name:</label>
          <input type="text" value={user.lastName} onChange={ (e) => changeUser("lastName", e.target.value) } />
        </p>
        <p>
          <label>Email:</label>
          <input type="text" value={user.email} onChange={ (e) => changeUser("email", e.target.value) } />
        </p>
        <p>
          <label>Password:</label>
          <input type="text" value={user.password} onChange={ (e) => changeUser("password", e.target.value) } />
        </p>
        <p>
          <label>Confirm Password:</label>
          <input type="text" value={user.confirmpw} onChange={ (e) => changeUser("confirmpw", e.target.value) } />
        </p>
        <Button variant="contained" color="primary" type="submit">
          Register
        </Button>

        {errors.map( (err, index) => <h3 className="errors" key={index}> {err}</h3>)}

      </form>
    </div>

  );

};

export default RegisterForm;