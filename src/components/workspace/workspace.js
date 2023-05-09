import "./workspace.scss"
import { notesContext } from "../../context";
import { useContext } from "react";
import Skeleton from "../skeleton/Skeleton";

    
const Workspace = () => {
    const useNotesContext = useContext(notesContext);
    const activeNote =useNotesContext.activeNoteId!==null?useNotesContext.notes.filter(note=>note.id===useNotesContext.activeNoteId)[0]:{};
    return (
        <div className="workspace_container">
            {useNotesContext.activeNoteId===null?<Skeleton/>
            :<>
                <div className="workspace_date">{activeNote.date}</div>
                <textarea 
                    className="workspace_title" 
                    value={activeNote.title} 
                    onChange={(e)=>{useNotesContext.changeTitle(activeNote.id,e.target.value)}}>
                </textarea>
                <textarea 
                    className="workspace_description" 
                    value={activeNote.description} 
                    onChange={(e)=>{useNotesContext.changeDescription(activeNote.id,e.target.value)}}>
                </textarea>
            </>}
        </div>
    )
}

export default Workspace;