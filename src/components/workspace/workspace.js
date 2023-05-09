import "./workspace.scss"
import { notesContext } from "../../context";
import { useContext } from "react";
import Skeleton from "../skeleton/Skeleton";

    
const Workspace = () => {
    const useNotesContext = useContext(notesContext);
    function formatDateForWorkspace(date) {
        const firstdate_split = (date+'').split(' ');
        const datedate = `${firstdate_split[1]} ${firstdate_split[2]}, ${firstdate_split[3]} at`
        const datetime =date.toLocaleTimeString('en-US').split(' ');
        const datetime_without_seconds = datetime[0].split(':') 
        return `${datedate} ${datetime_without_seconds[0]}:${datetime_without_seconds[1]} ${datetime[1]}`;
    }
    const activeNote =useNotesContext.activeNoteId!==null?useNotesContext.notes.filter(note=>note.id===useNotesContext.activeNoteId)[0]:{};
    return (
        <div className="workspace_container">
            {useNotesContext.activeNoteId===null?<Skeleton/>
            :<>
                <div className="workspace_date">{formatDateForWorkspace(activeNote.date)}</div>
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