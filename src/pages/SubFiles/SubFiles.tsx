import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../app/store";

import {List, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {Link} from "react-router-dom";
import {addFile, removeFile, setFileStatus} from "../../features/fileSlice/fileSlice";


const SubFiles = () => {
    const {folderId} = useParams<any>();
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch()


    const [name, setName] = React.useState<string>("");


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name, folderId))
    }

    const filteredArraySecond = todoList.files.filter((data: any) => data.parent === folderId)


    return (
        <>
            <div>
                <form>
                    <label>Folder Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </form>
                <button onClick={handleSubmit} type="submit">
                    Add Folder
                </button>
            </div>

            <List>
                {filteredArraySecond.map((file: any) => (
                    <>
                        <Link to={`/folder/${file.id}`}>
                            <ListItem key={file.id}>
                                <ListItemText
                                    style={{
                                        textDecoration: file.completed ? "line-through" : "none",
                                    }}
                                >
                                    {file.description}
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton
                                        onClick={() => {
                                            dispatch(removeFile(file.id));
                                        }}
                                    >
                                        <DeleteIcon/>
                                    </IconButton>
                                    <Checkbox
                                        edge="end"
                                        value={file.completed}
                                        onChange={() => {
                                            dispatch(
                                                setFileStatus({completed: !file.completed, id: file.id})
                                            );
                                        }}
                                    />
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    </>
                ))}
            </List>
        </>
    )
};

export default SubFiles;