import React from 'react';
import Main from './views/Main';
import Post from './components/Post';
import Login from './views/Login';
import Register from './views/Register';
import PostDetail from './views/PostDetail';
import UpdatePost from './views/UpdatePost';
import axios from 'axios';
// import LoginAndRegister from "./views/LoginAndRegister"
import {Router} from "@reach/router"

import SearchAppBar from "./components/SearchAppBar"

function App() {
  // const [logged, setLogged] = useState(false);

  // useEffect(() => {
  //   axios.get('http://localhost:8000/api/user/')
  // })

  return (
    <div className="App">
      <Router>

        <Main path="/home">
          {/* <Post /> */}
          <SearchAppBar />
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