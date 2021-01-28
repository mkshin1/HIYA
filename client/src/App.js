import React from 'react';
import Main from './views/Main';
import Post from './components/Post';
import Login from './views/Login';
import Register from './views/Register';
// import LoginAndRegister from "./views/LoginAndRegister"
import {Router} from "@reach/router"

import SearchAppBar from "./components/SearchAppBar"

function App() {
  return (
    <div className="App">
      <Router>

        <Main path="/home">
          {/* <Post /> */}
          <SearchAppBar />
        </Main>

        {/* <LoginAndRegister path="/"> */}
          {/* <SearchAppBar /> */}
          <Login path="/login"/>
          <Register path="/"/> 
        {/* </LoginAndRegister> */}

      </Router>

    </div>
  );
}
export default App;