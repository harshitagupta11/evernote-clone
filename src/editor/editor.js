import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import debounce from '../helpers';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function EditorComponent (props) {

const [text,setText]=useState('')
const [title,setTitle]=useState('')
const [id,setId]=useState('')

const { classes,selectedNote } = props;

useEffect(()=>{
setText(props.selectedNote.body)
setTitle(props.selectedNote.title)
setId(props.selectedNote.id)
},[])


const updateSelection= (selectedNote)=>{
    if(selectedNote.id!==id){
        setText(selectedNote.body)
        setTitle(selectedNote.title)
        setId(selectedNote.id)
    }
     
}
useEffect(()=>{
   
   if(props.selectedNote.id !==id){
       console.log("hello")
       setId(selectedNote.id)
       setText(selectedNote.body)
       setTitle(selectedNote.title)

   }

},[id])


   const updateBody =  (val) => {
       //console.log(val)
       debounce(update,1500)
         //setText(val);
        
      };
    const  updateTitle =  async(txt) => {
        
        setTitle( txt );
        
      }
     const update = (val) => {
        props.noteUpdate(id, {
          title: title,
          body: text
        })
        setText(val)
      }
    

    return(
      <div className={classes.editorContainer}>
        <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
        <input
          className={classes.titleInput}
          placeholder='Note title...'
          value={title ? title : ''}
          onChange={(e) => updateTitle(e.target.value)}>
        </input>
        <ReactQuill 
          value={text} 
          onChange={updateBody}>
        </ReactQuill>
      </div>
    );
  }
  

export default withStyles(styles)(EditorComponent);