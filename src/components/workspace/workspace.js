import { useContext, useEffect, useRef, useState } from "react";

import { notesContext } from "../../context";
import Skeleton from "../skeleton/Skeleton";

import "./workspace.scss"
    
const Workspace = () => {
    const useNotesContext = useContext(notesContext);
    const [pos, setPos] = useState(0);
    const refForTitle = useRef(null);
    const refForDescription = useRef(null);
    useEffect(()=>{
        if(useNotesContext.activeNoteId!==null){
            refForTitle.current.selectionStart = pos;
            refForTitle.current.selectionEnd = pos;
            refForDescription.current.selectionStart = pos;
            refForDescription.current.selectionEnd = pos;
        }
    },[pos,useNotesContext.notes])
    function formatDateForWorkspace(date) {
        const firstdate_split = (date+'').split(' ');
        const datedate = `${firstdate_split[1]} ${firstdate_split[2]}, ${firstdate_split[3]} at`
        const datetime =date.toLocaleTimeString('en-US').split(' ');
        const datetime_without_seconds = datetime[0].split(':') 
        return `${datedate} ${datetime_without_seconds[0]}:${datetime_without_seconds[1]} ${datetime[1]}`;
    }
    const activeNote = useNotesContext.activeNoteId!==null?useNotesContext.notes.filter(note=>note.id===useNotesContext.activeNoteId)[0]:{};
    return (
        <div className="workspace_container">
            {useNotesContext.activeNoteId===null?<Skeleton/>
            :<>
                <div className="workspace_date">{formatDateForWorkspace(activeNote.date)}</div>
                <textarea 
                    className="workspace_title"
                    value={activeNote.title}
                    onChange={(e)=>{
                        setPos(e.target.selectionStart);
                        useNotesContext.changeTitle(activeNote.id,e.target.value);
                    }}
                    ref={refForTitle}>
                </textarea>
                <textarea 
                    value={activeNote.description}
                    className="workspace_description"  
                    onChange={(e)=>{
                        setPos(e.target.selectionStart);
                        useNotesContext.changeDescription(activeNote.id,e.target.value)}}
                    ref={refForDescription}>
                </textarea>
            </>}
        </div>
    )
}

export default Workspace;