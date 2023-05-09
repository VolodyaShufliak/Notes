import ListItem from "../list-item/list-item";
import "./sidebar.scss"

import { notesContext } from "../../context";
import { useContext } from "react";


const SlideBar = () => {

    const useNotesContext = useContext(notesContext) 
    const sortNotes = (arr,value) => {
        return arr.filter(item=>(item.title.includes(value) || item.description.includes(value)))
    }
    const visibleNotes = sortNotes(useNotesContext.notes,useNotesContext.searchedText); 
    return (
        <div className="slidebar">
            {visibleNotes.map(item=><ListItem key={item.id} note={item}/>)}
        </div>
    )
}

export default SlideBar;