import React from 'react';
import Main from './views/Main';
import Post from './components/Post';
import Login from './components/Login';
import Register from './components/Register';
import LoginAndRegister from "./views/LoginAndRegister"
import {Router} from "@reach/router"

import SearchAppBar from "./components/SearchAppBar"

function App() {
  return (
    <div className="App">
      <Router>

        <Main path="/home"> 
          <SearchAppBar />
          <Post />
        </Main>

        <LoginAndRegister path="/">
          <SearchAppBar />
          <Login />
          <Register />
        </LoginAndRegister>

      </Router>
      
    </div>
  );
}
export default App;