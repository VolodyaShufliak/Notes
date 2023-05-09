import { useEffect,useState } from "react";
import AppHeader from "../app-header/app-header"
import NotesContent from "../notes-content/notes-content";
import { v4 as uuidv4 } from "uuid";

import { notesContext } from "../../context";

const idb =
  window.indexedDB ||
  window.mozIndexedDB ||
  window.webkitIndexedDB ||
  window.msIndexedDB ||
  window.shimIndexedDB;

const insertDataInIndexedDb = () => {
  if (!idb) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  const request = idb.open("notes_db", 1);

  request.onerror = function (event) {
    console.error("An error occurred with IndexedDB");
    console.error(event);
  };

  request.onupgradeneeded = function (event) {
    const db = request.result;
    if (!db.objectStoreNames.contains("notesData")) {
        db.createObjectStore("notes", { keyPath: "id" });
    }
  };
};


const App = () =>{


    useEffect(()=>{
        insertDataInIndexedDb();
        getAllData();
    },[])

    const [data,setData] = useState({
        notes:[],
        activeNoteId:null,
        searchedText:'',
        addNote:addNote,
        deleteNote:deleteNote,
        showNote:showNote,
        changeTitle:changeTitle,
        changeDescription:changeDescription,
        searchChange:searchChange

    })
    const getAllData = () => {
        const dbPromise = idb.open("notes_db", 1);
        dbPromise.onsuccess = () => {
        const db = dbPromise.result;

        var tx = db.transaction("notes", "readonly");
        var notesData = tx.objectStore("notes");
        const notes = notesData.getAll();

        notes.onsuccess = () => {
            setData(data=>({...data,notes:notes.result}));
        };

        tx.oncomplete = function () {
            db.close();
        };
        };
    };


    const generationNote = (id,title,description,date) => {
        return {
            id:id,
            title:title,
            description:description,
            date:date
        }
    }

    
    function addNote () {
        crudForNotes('create')
    }

    function deleteNote (id) {
        let ques = window.confirm("Delete this note?");
        if (ques){
            crudForNotes('delete',{id});
        }
    }

    function showNote(id){
        setData(data=>({
            ...data,
            activeNoteId:id
        }))
    }

    function changeTitle(id,value) {
        crudForNotes('update',{id,value,type:'title'})
    }

    function changeDescription(id,value) {
        crudForNotes('update',{id,value,type:'description'})
    }

    function searchChange(value){
        setData(data=>({...data,searchedText:value,activeNoteId:null}))
    }

    function crudForNotes(operation,parametrs){
        const dbPromise = idb.open("notes_db", 1);
        dbPromise.onsuccess = () => {
            const db = dbPromise.result;
            var tx = db.transaction("notes", "readwrite");
            var notesData = tx.objectStore("notes");
            switch (operation) {
                case 'update':
                    const load_active_note = notesData.get(parametrs.id);
                    load_active_note.onsuccess = () => {
                        const active_note = load_active_note.result;
                        const notes = notesData.put({
                            ...active_note,
                            id:parametrs.id,
                            [parametrs.type]:parametrs.value,
                            date:new Date()
                          });
                          notes.onsuccess = () => {
                            tx.oncomplete = function () {
                              db.close();
                            };
                        }
                    };
                    break;
                case 'create':
                    const date = new Date();
                    const newNote = generationNote(uuidv4(),'Untitled','',date);
                    const notes = notesData.put({
                        ...newNote
                      });
                      notes.onsuccess = () => {
                        tx.oncomplete = function () {
                          db.close();
                        };
                    };
                    break;
                case 'delete':
                    const deleteNote = notesData.delete(parametrs.id);
                    deleteNote.onsuccess = () => {
                        tx.oncomplete = function () {
                            db.close();
                            setData(data=>({...data,activeNoteId:null}))
                        };
                    };
                    break;
                default:
                    break;
            }
            getAllData();
        }
    }
    return (
        <notesContext.Provider value={data}>
            <AppHeader/>
            <NotesContent/>
        </notesContext.Provider>
    )
}
export default App;