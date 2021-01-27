import React from 'react'
import Post from "../components/Post"
import SearchAppBar from "../components/SearchAppBar"
import Feed from "../components/Feed"
import Sidebar from "../components/Sidebar"

function Main() {
    return (
        <div>
            <SearchAppBar />
            <Post />
            <Feed />
            <Sidebar />
        </div>
    )
}

export default Main
