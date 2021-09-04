import React from "react";
import "./Dashboard.scss";
import {useSelector, useDispatch} from 'react-redux';
import {addFile, removeFile, setFileStatus} from "../../features/fileSlice/fileSlice";
import {addFileIntoTrashBin} from "../../features/trashSlice/trashSlice";
import {RootState} from "../../app/store";
import {Link, useParams} from "react-router-dom";
import {
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Checkbox,
    IconButton,
    Button,
    TextField
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import DescriptionIcon from '@material-ui/icons/Description';
import FolderIcon from '@material-ui/icons/Folder';
import {addFileIntoDirectoryArr} from "../../features/directorySlice/directorySlice";


export default function Dashboard() {
    const [name, setName] = React.useState<string>("");
    // const {folderId} = useParams<{ folderId: any }>();


    // const {userEmail} = useSelector((state: any) => state.user);
    const todoList = useSelector((state: RootState) => state);


    console.log(todoList)


    const dispatch = useDispatch();


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const folderName = todoList.files.find(file => file.description === name && file.type === true)
        if (folderName) {
            alert('already exist')
        } else {
            dispatch(addFile(name, true))
        }
    }

    const handleFileSubmit = async (e: any) => {
        e.preventDefault()
        const fileName = todoList.files.find(file => file.description === name && file.type === false)
        if (fileName) {
            alert('already exist')
        } else {
            dispatch(addFile(name, false))
        }
    }


    const filteredArr = todoList?.files.filter((data: any) => data?.parent === undefined)

    const addDirectory = (id: string | number, directoryName: string, parentid: number | string) => {
        // const folder = todoList.files.find(item => item.id === folderId || item.id.toString() === folderId)
        // console.log('folder', folder)
        // if (!folder) return
        // const parent = todoList.files.find((item) => item.id.toString() === folder.id.toString())
        // console.log('parent', parent?.description)
        // dispatch(addFileIntoDirectory(parent))
        // const directoryArr = todoList.files.filter((item) => item.id.toString())
        dispatch(addFileIntoDirectoryArr(id, directoryName, parentid))
    }

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
                        <ListItem key={file?.id}
                                  onClick={() => addDirectory(file?.id, file?.description, file?.parent)}>
                            <ListItemText
                                style={{
                                    textDecoration: file?.completed ? "line-through" : "none",
                                }}
                            >
                                {file.type === true ? (
                                    <Link to={`/folder/${file.id}`} style={{
                                        textDecoration: "none",
                                        color: "black"
                                    }}>
                                        <div className="folder">
                                            <FolderIcon color={"primary"}/>
                                            <p>{file.description}</p>
                                        </div>
                                    </Link>

                                ) : (
                                    <Link to={`/file/${file.id}`} style={{
                                        textDecoration: "none",
                                        color: "black"
                                    }}>
                                        <div className="folder">
                                            <DescriptionIcon color={"action"}/>
                                            <p>{file.description}</p>
                                        </div>
                                    </Link>
                                )}


                            </ListItemText>
                            <ListItemSecondaryAction>
                                <IconButton
                                    // onClick={() => {
                                    //     dispatch(removeFile(file.id));
                                    // }}

                                    onClick={() => {
                                        dispatch(removeFile(file.id));
                                        dispatch(addFileIntoTrashBin(file));
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