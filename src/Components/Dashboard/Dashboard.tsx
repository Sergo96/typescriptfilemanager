import React, {useRef} from "react";
import "./Dashboard.scss"

import {useParams, useLocation} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'

import {database} from "../../firebase"

import {addFile, removeFile, setFileStatus, updateFile} from "../../features/fileSlice/fileSlice";

import {doc, setDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {storage} from "../../firebase";
import {RootState} from "../../app/store";



import {Link} from "react-router-dom"

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";


import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



import FolderIcon from '@material-ui/icons/Folder';


export default function Dashboard() {
    const inputRef = useRef(true);


    const update = (id:any, value:any, e:any) => {
        if (e.which === 13) {
            updateFile({ id, item: value });
        }
    };


    const ROOT_FOLDER = {name: "Root", id: null, path: []}

    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");


    const {userEmail} = useSelector((state: any) => state.user);
    const todoList = useSelector((state: RootState) => state);

    console.log(todoList)


    let currentdate = new Date();


    console.log(userEmail)

    const dispatch = useDispatch();

    function closeModal() {
        setOpen(false)
    }

    function openModal() {
        setOpen(true)
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name))
        closeModal()
    }

    const filteredArr = todoList.files.filter((data:any) => data.parent === undefined)

    return (
        <>
            <div >
                <form className={"form__style"} onSubmit={handleSubmit}>
                    <form>
                        <TextField
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label={"Creater Folder"}

                        />
                    </form>
                    <Button variant="contained" color="primary" type="submit">
                        Create Folder
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
                                    <Link to={`/folder/${file.id}`} style={{
                                        textDecoration: "none",
                                        color: "black"
                                    }}>
                                    <div className="folder">
                                        <FolderIcon/>
                                        <p>{file.description}</p>
                                    </div>
                                    </Link>

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