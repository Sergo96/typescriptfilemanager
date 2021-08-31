import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../app/store";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {Link} from "react-router-dom";
import {addFile, removeFile, setFileStatus, updateFile} from "../../features/fileSlice/fileSlice";


const SubFiles = () => {
    const {folderId} = useParams<any>();
    console.log(folderId)
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch()

    const main = {}

    console.log(todoList);

    const [name, setName] = React.useState<string>("");


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name, folderId))
    }

    const filteredArraySecond = todoList.files.filter((data:any) => data.parent === folderId)


    return (
        <>
            <form onSubmit={handleSubmit}>
                <form>
                    <label>Folder Name</label>
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={e => setName(e.target.value)}

                    />
                </form>
                <button type="submit">
                    Add Folder
                </button>
            </form>

            <List>
                {filteredArraySecond.map((file: any) => (
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
                ))}
            </List>
        </>
    )
};

export default SubFiles;