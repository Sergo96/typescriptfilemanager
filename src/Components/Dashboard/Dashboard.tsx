import React from "react"

import {useParams, useLocation} from "react-router-dom"
import {useSelector, useDispatch} from 'react-redux'

import {database} from "../../firebase"

import {addFile, removeFile, setFileStatus} from "../../features/fileSlice/fileSlice";

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


export default function Dashboard() {
    // const { folderId } = useParams()
    // const { state = {} } = useLocation()
    // const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

    const ROOT_FOLDER = {name: "Root", id: null, path: []}

    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");


    // const file = useSelector((state: any) => state.file.folder)
    const {userEmail} = useSelector((state: any) => state.user);
    const todoList = useSelector((state: RootState) => state);

    // console.log(fileList)

    // const { folder } = useSelector((state:any) => state.files);

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

    return (
        <>
            <div>

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
                    {todoList.files.map((file: any) => (
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
            </div>
        </>
    )
}