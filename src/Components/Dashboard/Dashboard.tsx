import React from "react";
import "./Dashboard.scss";

import {useSelector, useDispatch} from 'react-redux'


import {addFile, removeFile, setFileStatus} from "../../features/fileSlice/fileSlice";
import {RootState} from "../../app/store";

import {Link} from "react-router-dom";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from '@material-ui/icons/Description';


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import FolderIcon from '@material-ui/icons/Folder';


export default function Dashboard() {


    const [name, setName] = React.useState<string>("");


    const {userEmail} = useSelector((state: any) => state.user);
    const todoList = useSelector((state: RootState) => state);

    console.log(todoList)




    console.log(userEmail)

    const dispatch = useDispatch();


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name, true))
    }

    const handleFileSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name, false))
    }


    const filteredArr = todoList.files.filter((data: any) => data.parent === undefined)

    return (
        <>
            <div>
                <form className={"form__style"}>
                    <form>
                        <TextField
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={"Name of the File"}

                        />
                    </form>
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        color="default"
                        type="submit"
                        startIcon={<FolderIcon/>}
                    >
                        Create Folder
                    </Button>
                    <Button
                        onClick={handleFileSubmit}
                        variant="contained"
                        color="default"
                        type="submit"
                        startIcon={<DescriptionIcon/>}
                    >
                        Create File
                    </Button>
                </form>

                <List>
                    {filteredArr.map((file: any) => (

                        <ListItem key={file.id}>
                            <ListItemText
                                style={{
                                    textDecoration: file.completed ? "line-through" : "none",
                                }}
                            >
                                {file.type === true ? (
                                    <Link to={`/folder/${file.id}`} style={{
                                        textDecoration: "none",
                                        color: "black"
                                    }}>
                                        <div className="folder">
                                            <FolderIcon/>
                                            <p>{file.description}</p>
                                        </div>
                                    </Link>

                                ) : (
                                    <Link to={`/file/${file.id}`} style={{
                                        textDecoration: "none",
                                        color: "black"
                                    }}>
                                        <div className="folder">
                                            <DescriptionIcon/>
                                            <p>{file.description}</p>
                                        </div>
                                    </Link>
                                )}


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
                    ))}
                </List>
            </div>
        </>
    )
}