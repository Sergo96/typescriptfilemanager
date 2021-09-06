import React from "react";

import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../app/store";
import {IconButton, List, ListItem, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import {removeTrashBinFile} from "../../features/trashSlice/trashSlice";
import DeleteIcon from "@material-ui/icons/Delete";


const TrashBin = () => {

    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch();
    return (
        <>
            <List>
                {todoList.trashFiles.map((file: any) => (
                    <ListItem key={file?.id}>
                        <ListItemText
                            style={{
                                textDecoration: file?.completed ? "line-through" : "none",
                            }}
                        >
                            {file.description.type === true ? (
                                <div className="folder">
                                    <FolderIcon color={"primary"}/>
                                    <p>{file.description.description}</p>
                                </div>

                            ) : (

                                <div className="folder">
                                    <DescriptionIcon color={"action"}/>
                                    <p>{file.description.description}</p>
                                </div>
                            )}

                        </ListItemText>
                        <ListItemSecondaryAction>
                            <IconButton
                                onClick={() => {
                                    dispatch(removeTrashBinFile(file.id));
                                }}
                            >
                                <DeleteIcon/>
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default TrashBin;