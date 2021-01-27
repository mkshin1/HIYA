import React from 'react';
import Main from './views/Main';
import Post from './components/Post';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
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
          <Login path="/login"/> // takes us to login page
          <Register /> // takes us to register page, which is the root
        </LoginAndRegister>

      </Router>

    </div>
  );
}
export default App;