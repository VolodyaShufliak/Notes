import { useContext } from "react";

import ListItem from "../list-item/list-item";
import { notesContext } from "../../context";

import "./sidebar.scss"

const SlideBar = () => {
    const useNotesContext = useContext(notesContext) 
    const filterNotes = (arr,value) => {
        return arr.filter(item=>(item.title.toLowerCase().includes(value) || item.description.toLowerCase().includes(value)))
    }
    const visibleNotes = filterNotes(useNotesContext.notes,useNotesContext.searchedText.toLowerCase()); 
    return (
        <div className="slidebar">
            {visibleNotes.map(item=><ListItem key={item.id} note={item}/>)}
        </div>
    )
}

export default SlideBar;