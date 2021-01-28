import React from 'react';
import Main from './views/Main';
import Post from './components/Post';
import Login from './views/Login';
import Register from './views/Register';
import PostDetail from './views/PostDetail';
import UpdatePost from './views/UpdatePost';
// import LoginAndRegister from "./views/LoginAndRegister"
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
          <PostDetail path="/post/:id" />
          <UpdatePost path="/post/:id/update" />

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