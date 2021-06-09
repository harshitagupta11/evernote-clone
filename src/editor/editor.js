import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import debounce from "../helpers";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";

function EditorComponent({ classes, selectedNote, noteUpdate }) {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");
  // console.log(selectedNote);

  useEffect(() => {
    setText(selectedNote.body);
    setTitle(selectedNote.title);
    setId(selectedNote.id);
  }, [selectedNote]);

  // console.log(id);
  // const updateSelection = (selectedNote) => {
  //   if (selectedNote.id !== id) {
  //     setText(selectedNote.body);
  //     setTitle(selectedNote.title);
  //     setId(selectedNote.id);
  //   }
  // };
  // useEffect(()=>{

  //    if(props.selectedNote.id !==id){
  //        console.log("hello")
  //        setId(selectedNote.id)
  //        setText(selectedNote.body)
  //        setTitle(selectedNote.title)

  //    }

  // },[id])

  const update = React.useCallback(
    () =>
      debounce(
        () =>
          noteUpdate(id, {
            title: title,
            body: text
          }),
        1500
      )(),
    [id, text, title, noteUpdate]
  );
  const updateTitle = async (e) => {
    await setTitle(e.target.value);
    update();
  };
  const updateBody = async (val) => {
    await setText(val);

    if (text !== "") {
      update();
    }
  };

  // const update = (val) => {
  //   noteUpdate(id, {
  //     title: title,
  //     body: text
  //   });
  //   setText(val);
  // };

  return (
    <div className={classes.editorContainer}>
      <BorderColorIcon className={classes.editIcon}></BorderColorIcon>
      <input
        className={classes.titleInput}
        placeholder="Note title..."
        value={title}
        onChange={updateTitle}
      />
      <ReactQuill value={text} onChange={updateBody}></ReactQuill>
    </div>
  );
}

export default withStyles(styles)(EditorComponent);