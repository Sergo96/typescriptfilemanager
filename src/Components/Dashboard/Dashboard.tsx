import React from "react"

import { useParams, useLocation } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'

import { database } from "../../firebase"

import {addFile, addFolder} from "../../features/fileSlice/fileSlice";

import { doc, setDoc } from "firebase/firestore";
import {db} from "../../firebase";
import {storage} from "../../firebase";





export default function Dashboard() {
    // const { folderId } = useParams()
    // const { state = {} } = useLocation()
    // const { folder, childFolders, childFiles } = useFolder(folderId, state.folder)

    const ROOT_FOLDER = { name: "Root", id: null, path: [] }

    const [open, setOpen] = React.useState<boolean>(false);
    const [name, setName] = React.useState<string>("");



    // const file = useSelector((state: any) => state.file.folder)
    const { userEmail } = useSelector((state:any) => state.user);
    const { folder } = useSelector((state:any) => state.files);

    let currentdate = new Date();



    console.log(userEmail)

    const dispatch = useDispatch()

    function closeModal() {
        setOpen(false)
    }

    function openModal() {
        setOpen(true)
    }



    const handleSubmit = async (e:any) => {
        e.preventDefault()
        dispatch(addFolder({
            title: name
        }))
        closeModal()
    }

    return (
        <>
            <div>
                <div className="d-flex align-items-center">
                    {/*<FolderBreadcrumbs currentFolder={folder} />*/}
                    {/*<AddFileButton currentFolder={folder} />*/}
                    {/*<AddFolderButton currentFolder={folder} />*/}


                    <h1>duuuudeeeeeeeee</h1>
                </div>
                {/*{childFolders.length > 0 && (*/}
                {/*    <div className="d-flex flex-wrap">*/}
                {/*        {childFolders.map(folder => (*/}
                {/*            <div*/}
                {/*                key={folder.id}*/}
                {/*                style={{ maxWidth: "250px" }}*/}
                {/*                className="p-2"*/}
                {/*            >*/}
                {/*                <Folder folder={folder} />*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}
                {/*{childFolders.length > 0 && childFiles.length > 0 && <hr />}*/}
                {/*{childFiles.length > 0 && (*/}
                {/*    <div className="d-flex flex-wrap">*/}
                {/*        {childFiles.map(file => (*/}
                {/*            <div key={file.id} style={{ maxWidth: "250px" }} className="p-2">*/}
                {/*                <File file={file} />*/}
                {/*            </div>*/}
                {/*        ))}*/}
                {/*    </div>*/}
                {/*)}*/}
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
                        <button  onClick={closeModal}>
                            Close
                        </button>
                        <button  type="submit">
                            Add Folder
                        </button>
                </form>
            </div>
        </>
    )
}