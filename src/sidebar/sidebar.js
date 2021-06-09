import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import List from "@material-ui/core/List";
import { Divider, Button } from "@material-ui/core";
import SidebarItemComponent from "../sidebaritem/sidebarItem";

function SidebarComponent({
  classes,
  notes,
  deleteNote,
  setSelectedNote,
  newNote
}) {
  const [addingNote, setAddingNote] = useState(false);
  const [title, setTitle] = useState(null);

  const newNoteBtnClick = () => {
    setTitle(null);
    setAddingNote(!addingNote);
  };
  const updateTitle = (txt) => {
    setTitle(txt);
  };
  const createNewNote = () => {
    newNote(title);

    setTitle(null);
    setAddingNote(false);
  };
  //  const selectNote = (n, i) => props.selectNote(n, i);
  //  const deleteNote = (note) => props.deleteNote(note);

  if (notes) {
    return (
      <div className={classes.sidebarContainer}>
        <Button onClick={newNoteBtnClick} className={classes.newNoteBtn}>
          {addingNote ? "Cancel" : "New Note"}
        </Button>
        {addingNote ? (
          <div>
            <input
              type="text"
              className={classes.newNoteInput}
              placeholder="Enter note title"
              onKeyUp={(e) => updateTitle(e.target.value)}
            ></input>
            <Button
              className={classes.newNoteSubmitBtn}
              onClick={createNewNote}
            >
              Submit Note
            </Button>
          </div>
        ) : null}
        <List>
          {notes.map((_note) => {
            return (
              <div key={_note.id}>
                <SidebarItemComponent
                  _note={_note}
                  setSelectedNote={setSelectedNote}
                  deleteNote={deleteNote}
                ></SidebarItemComponent>
                <Divider></Divider>
              </div>
            );
          })}
        </List>
      </div>
    );
  } else {
    return <div></div>;
  }
}

export default withStyles(styles)(SidebarComponent);