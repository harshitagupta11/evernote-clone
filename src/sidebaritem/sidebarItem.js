import React from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./styles";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
import DeleteIcon from "@material-ui/icons/Delete";
import { removeHTMLTags } from "../helpers";

function SidebarItemComponent({ classes, _note, setSelectedNote, deleteNote }) {
  const deleteCurrentNote = (note) => {
    if (window.confirm(`Are you sure you want to delete: ${note.title}`)) {
      deleteNote(note);
      setSelectedNote(null);
    }
  };

  return (
    <div>
      <ListItem className={classes.listItem} alignItems="flex-start">
        <div
          style={{
            width: "100%"
          }}
          className={classes.textSection}
          onClick={() => setSelectedNote(_note)}
        >
          <ListItemText
            primary={_note.title}
            secondary={removeHTMLTags(_note.body.substring(0, 30)) + "..."}
          ></ListItemText>
        </div>
        <IconButton
          onClick={() => deleteCurrentNote(_note)}
          className={classes.deleteIcon}
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
    </div>
  );
}

export default withStyles(styles)(SidebarItemComponent);