import React, { useEffect, useState } from 'react';
import SidebarComponent from './sidebar/sidebar';
import EditorComponent from './editor/editor';
import './App.css';

const firebase = require('firebase');

function App (){

  // constructor() {
  //   super();
  //   this.state = {
  //     selectedNoteIndex: null,
  //     selectedNote: null,
  //     notes: null
  //   };
  // }
  const [selectedNote,setSelectedNote] =useState(null)
const [selectedNoteIndex,setSelectedNoteIndex]=useState(null)
const [notes,setNotes]=useState(null)
  useEffect (()=>{
    firebase
    .firestore()
    .collection('notes')
    .onSnapshot(serverUpdate => {
      const notes = serverUpdate.docs.map(_doc => {
        const data = _doc.data();
        data['id'] = _doc.id;
        return data;
      });
      console.log(notes);
      setNotes( notes);
    });
  },[])
  const selectNote = (note, index) => {
    setSelectedNoteIndex(selectedNoteIndex)
    setSelectedNote(note)
    
    //setState({ selectedNoteIndex: index, selectedNote: note })
}
 const noteUpdate = (id, noteObj) => {
    firebase
      .firestore()
      .collection('notes')
      .doc(id)
      .update({
        title: noteObj.title,
        body: noteObj.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
  }
  const newNote = async (title) => {
    const note = {
      title: title,
      body: ''
    };
    const newFromDB = await firebase
      .firestore()
      .collection('notes')
      .add({
        title: note.title,
        body: note.body,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
    const newID = newFromDB.id;
    await setNotes( [...notes, note] );
    const newNoteIndex = notes.indexOf(notes.filter(_note => _note.id === newID)[0]);
    setSelectedNote(notes[newNoteIndex])
    setSelectedNoteIndex(newNoteIndex)
    //this.setState({ selectedNote: this.state.notes[newNoteIndex], selectedNoteIndex: newNoteIndex });
  }
  const deleteNote = async (note) => {
    const noteIndex = notes.indexOf(note);
    await setNotes( notes.filter(_note => _note !== note) );
    if(selectedNoteIndex === noteIndex) {
      setSelectedNoteIndex(null)
      setSelectedNote(null)
      //this.setState({ selectedNoteIndex: null, selectedNote: null });
    } else {
     if(notes.length > 1) {
     selectNote(notes[selectedNoteIndex - 1], selectedNoteIndex - 1)}
     else{
     setSelectedNoteIndex(null)
     setSelectedNote(null)
     }
      //this.setState({ selectedNoteIndex: null, selectedNote: null });
    }
    firebase
    .firestore()
    .collection('notes')
    .doc(note.id)
    .delete();
  }


  
    return(
      <div className="app-container">
        <SidebarComponent 
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          deleteNote={deleteNote}
          selectNote={selectNote}
          newNote={newNote}></SidebarComponent>
        {
          selectedNote ?
          <EditorComponent selectedNote={selectedNote}
          selectedNoteIndex={selectedNoteIndex}
          notes={notes}
          noteUpdate={noteUpdate}></EditorComponent> :
          null
        }
      </div>
    );
  

 

 
   
  
}

export default App;