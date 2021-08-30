import {createSlice} from "@reduxjs/toolkit";

interface FileState {
    folderId: number | string;
    folder: any;
    childFolders: any[];
    childFiles: any[];
}

const initialState = {
    folder: [],

} as FileState ;

const fileSlice = createSlice({
    name: "file",
    initialState,
    reducers: {
        addFolder: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
            };
            state.folder.push(newTodo);
            // state.folder = action.payload.folder;
        },

        addFile: (state, action) => {

        }
    }
});

export const {addFolder, addFile} = fileSlice.actions;
export default fileSlice.reducer;