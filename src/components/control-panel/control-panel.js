import { useContext } from "react";
import { MdDeleteForever} from "react-icons/md";
import { IoIosAdd} from "react-icons/io";
import {FaEdit} from "react-icons/fa"
import { notesContext } from "../../context";

import "./control-panel.scss"

const ControlPanel = () => {

    const useNotesContext = useContext(notesContext)

    return (
        <div className="control_panel">
            <button onClick={useNotesContext.addNote}><IoIosAdd/></button>
            <button disabled={useNotesContext.activeNoteId===null?true:false} onClick={()=>useNotesContext.deleteNote(useNotesContext.activeNoteId)}><MdDeleteForever/></button>
            <button disabled={useNotesContext.activeNoteId===null?true:false}><FaEdit/></button>
        </div>
    )
}

export default ControlPanel;