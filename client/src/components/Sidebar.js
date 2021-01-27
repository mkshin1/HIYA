import React from "react"
import CreateIcon from '@material-ui/icons/Create';
import SidebarLinks from "../components/SidebarLinks"
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import ForumIcon from '@material-ui/icons/Forum';

import "../Sidebar.css"

const Sidebar = () => {
    return(
        <div className="sidebar">
            <SidebarLinks active Icon={HomeIcon} text="Home"></SidebarLinks>
            <SidebarLinks Icon={SettingsIcon} text="Settings"></SidebarLinks>
            <SidebarLinks Icon={ForumIcon} text="Messages"></SidebarLinks>




        </div>
    )
}

export default Sidebar