import "./list-item.scss"

import { notesContext } from "../../context";
import { useContext } from "react";

const ListItem = (props) => {
    const useNotesContext = useContext(notesContext)
    const clazz = props.note.id===useNotesContext.activeNoteId?'list_item_container active_note':'list_item_container';
    return(
        <div className={clazz} onClick={()=>useNotesContext.showNote(props.note.id)}>
            <div className="title">{props.note.title}</div>
            <div className="modifided">{props.note.date+''}</div>
        </div>
    )
}

export default ListItem;