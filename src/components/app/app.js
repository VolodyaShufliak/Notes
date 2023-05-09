import { useState } from "react";
import AppHeader from "../app-header/app-header"
import NotesContent from "../notes-content/notes-content";
import { v4 as uuidv4 } from "uuid";

import { notesContext } from "../../context";

const App = () =>{

    const [data,setData] = useState({
        notes:[
        {id:1,title:'1rgrgr',description:'1gtgtgt',date:'24/6/2000',active:false},
        {id:2,title:'2rgrgr',description:'2gtgtgt',date:'25/6/2000',active:false},
        {id:4,title:'3rgrgr',description:'3gtgtgt',date:'26/6/2000',active:false},
        {id:5,title:'4rgrgr',description:'4gtgtgt',date:'27/6/2000',active:false}
    ],
    activeNoteId:null,
    searchedText:'',
    addNote:addNote,
    deleteNote:deleteNote,
    showNote:showNote,
    changeTitle:changeTitle,
    changeDescription:changeDescription,
    searchChange:searchChange

})

    const generationNote = (id,title,description,date) => {
        return {
            id:id,
            title:title,
            description:description,
            date:date,
            active:false
        }
    }

    function addNote () {
        const date = new Date().toLocaleDateString('en-ca');
        const newNote = generationNote(uuidv4(),'Untitled','',date);
        setData(data=>({...data,notes:[...data.notes,newNote]}));
    }

    function deleteNote (id) {
        let ques = window.confirm("Delete this note?");
        if (ques){
            setData(data=>({...data,notes:data.notes.filter(item=>item.id!==id),activeNoteId:null}));
        }
    }

    function showNote(id){
        setData(data=>({
            ...data,
            activeNoteId:id
        }))
    }

    function changeTitle(id,value) {
        setData(data=>({...data,notes:data.notes.map(item=>item.id===id?{...item,title:value}:{...item})}));
    }

    function changeDescription(id,value) {
        setData(data=>({...data,notes:data.notes.map(item=>item.id===id?{...item,description:value}:{...item})}));
    }

    function searchChange(value){
        setData(data=>({...data,searchedText:value,activeNoteId:null}))
    }
    return (
        <notesContext.Provider value={data}>
            <AppHeader/>
            <NotesContent/>
        </notesContext.Provider>
    )
}
export default App;