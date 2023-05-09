import { createContext } from "react";

export const notesContext = createContext({
    notes:[],
    activeNoteId:null,
    searchedText:'',
    addNote:()=>{},
    showNote:()=>{},
    deleteNote:()=>{},
    changeTitle:()=>{},
    changeDescription:()=>{},
    searchChange:()=>{}
});

