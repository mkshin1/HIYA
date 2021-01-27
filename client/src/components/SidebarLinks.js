import React from "react"
import "../SidebarLinks.css"


const SidebarLinks = ({active, text, Icon}) => {
    return(
        <div className={`sidebarlinks ${active && 'sidebarlinks--active'}` }>
            <Icon />
            <h2>{text} </h2>
            


        </div>
    )
}

export default SidebarLinks