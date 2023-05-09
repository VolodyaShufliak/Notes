import "./list-item.scss"

import { notesContext } from "../../context";
import { useContext } from "react";

const ListItem = (props) => {
    const useNotesContext = useContext(notesContext)
    const clazz = props.note.id===useNotesContext.activeNoteId?'list_item_container active_note':'list_item_container';
    function formatDateForListItem(date) {
        if (date.toLocaleDateString('en-ca') === new Date().toLocaleDateString('en-ca')) {
            const datetime =date.toLocaleTimeString('en-US').split(' ');
            const datetime_without_seconds = datetime[0].split(':');
            return `${datetime_without_seconds[0]}:${datetime_without_seconds[1]} ${datetime[1]}`;
        }
        return date.toLocaleDateString('en-ca').split('-').reverse().join('/');
    }
    return(
        <div className={clazz} onClick={()=>useNotesContext.showNote(props.note.id)}>
            <div className="title">{props.note.title}</div>
            <div className="modifided">{formatDateForListItem(props.note.date)} {props.note.description}</div>
        </div>
    )
}

export default ListItem;