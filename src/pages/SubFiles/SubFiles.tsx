import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../app/store";

import {List, ListItem, ListItemText, ListItemSecondaryAction, TextField} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {Link, useHistory} from "react-router-dom";

import Button from "@material-ui/core/Button";
import DescriptionIcon from "@material-ui/icons/Description";
import FolderIcon from "@material-ui/icons/Folder";

import "./SubFiles.scss"
import {addFile, removeFile, setFileStatus} from "../../features/fileSlice/fileSlice";

import {addFileIntoTrashBin} from "../../features/trashSlice/trashSlice";
import {addFileIntoDirectoryArr, removeDirectory} from "../../features/directorySlice/directorySlice";


const SubFiles = () => {
    const {folderId} = useParams<{ folderId: string }>();
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch();


    const [name, setName] = React.useState<string>("");


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const folderName = todoList.files.find(file => file.description === name && file.type === true)
        if (folderName) {
            alert('already exist')
        } else {
            dispatch(addFile(name, true, folderId))
            // addDirectory()
        }
    }

    const handleFileSubmit = async (e: any) => {
        e.preventDefault()
        const fileName = todoList.files.find(file => file.description === name && file.type === false)
        if (fileName) {
            alert('already exist')
        } else {
            dispatch(addFile(name, false, folderId))
        }
    }

    const filteredArraySecond = todoList.files.filter((data: any) => data.parent === folderId);


    // this is to go back function
    const history = useHistory();


    // const addDirectory = () => {
    //     const folder = todoList.files.find(item => item.id === folderId || item.id.toString() === folderId)
    //     console.log('folder', folder)
    //     if (!folder) return
    //     const parent = todoList.files.find((item) => item.id.toString() === folder.id.toString())
    //     console.log('parent', parent?.description)
    //     // dispatch(addFileIntoDirectory(parent))
    //     // const directoryArr = todoList.files.filter((item) => item.id.toString())
    //     dispatch(addFileIntoDirectoryArr(parent?.id, parent?.description, parent?.parent))
    // }

    const addDirectory = (id: string | number, description: string, parent: string | number) => {
        dispatch(addFileIntoDirectoryArr(id, description, parent))
    }

    React.useEffect(() => {
        dispatch(removeDirectory(folderId))
        // eslint-disable-next-line
    }, [removeDirectory, folderId])

    return (
        <>
            <div className={"subfilesForm"}>
                <form>
                    <TextField
                        type="text"
                        required
                        value={name}
                        onChange={(e: any) => setName(e.target.value)} id="standard-basic" label="Create Files"
                    />
                </form>
                <Button
                    onClick={handleSubmit}
                    type="submit"
                    variant="contained"
                    color="default"
                >
                    Add Folder
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
            </div>

            <p className={"backHistory"} onClick={() => history.goBack()}>...</p>
            <List>

                {filteredArraySecond.map((file: any) => (
                    <>
                        <Link to={`/folder/${file.id}`}>
                            <ListItem key={file.id}
                                      onClick={() => addDirectory(file?.id, file?.description, file?.parent)}>
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
                                            <div className="folders">
                                                <FolderIcon color={"primary"}/>
                                                <p>{file.description}</p>
                                            </div>
                                        </Link>

                                    ) : (
                                        <Link to={`/file/${file.id}`} style={{
                                            textDecoration: "none",
                                            color: "black"
                                        }}>
                                            <div className="folders">
                                                <DescriptionIcon color={"action"}/>
                                                <p>{file.description}</p>
                                            </div>
                                        </Link>

                                    )}
                                </ListItemText>
                                <ListItemSecondaryAction>
                                    <IconButton
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
                        </Link>
                    </>
                ))}
            </List>
        </>
    )
};

export default SubFiles;