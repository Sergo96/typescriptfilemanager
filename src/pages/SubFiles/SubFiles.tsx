import React from 'react';
import {useParams} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from "../../app/store";

import {List, ListItem, ListItemText, ListItemSecondaryAction} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import {Link, useHistory} from "react-router-dom";
import {addFile, removeFile, setFileStatus} from "../../features/fileSlice/fileSlice";
import Button from "@material-ui/core/Button";
import DescriptionIcon from "@material-ui/icons/Description";
import FolderIcon from "@material-ui/icons/Folder";


const SubFiles = () => {
    const {folderId} = useParams<any>();
    const todoList = useSelector((state: RootState) => state);
    const dispatch = useDispatch()


    const [name, setName] = React.useState<string>("");


    const handleSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name, true,  folderId))
    }

    const handleFileSubmit = async (e: any) => {
        e.preventDefault()
        dispatch(addFile(name, false, folderId))
    }

    const filteredArraySecond = todoList.files.filter((data: any) => data.parent === folderId)

    // this is to go back function
    const history = useHistory();


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

            <a onClick={() => history.goBack()}>...</a>
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

                                    ):(
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
                        </Link>
                    </>
                ))}
            </List>
        </>
    )
};

export default SubFiles;