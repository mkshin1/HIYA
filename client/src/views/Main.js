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

            <div className="main">
                <Sidebar />
                <Feed />

            </div>



        </div>
    )
}

export default Main
