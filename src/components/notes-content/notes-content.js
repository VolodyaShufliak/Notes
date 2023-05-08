import SlideBar from "../sidebar/sidebar";
import Workspace from "../workspace/workspace";

import "./notes-content.scss"

const NotesContent = () => {
    return (
        <div className="notes_content">
            <SlideBar/>
            <Workspace/>
        </div>
    )
}

export default NotesContent;