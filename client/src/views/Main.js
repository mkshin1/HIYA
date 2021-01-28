import React from 'react'
import Post from "../components/Post"
import SearchAppBar from "../components/SearchAppBar"

import Sidebar from "../components/Sidebar"
import Feed from "../components/Feed"
import "../Main.css"


function Main() {

    
    return (
        <div>
            <SearchAppBar />
            <h2></h2>

            <div className="main">
                <Sidebar />
                <Post />
                <Feed />
            </div>

           



        </div>
    )
}

export default Main
