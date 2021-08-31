import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface File {
    id: number | string;
    description: string;
    completed: boolean;
    parent: number;
}

const initialState = [] as File[];


const fileSlice = createSlice({
    name: "files",
    initialState,
    reducers: {
        addFile: {
            reducer: (state, action: PayloadAction<File>) => {
                state.push(action.payload);
            },
            prepare: (description: string, parent?: string | number) => ({
                payload: {
                    id: Date.now(),
                    description,
                    completed: false,
                    parent : parent,
                } as File,
            }),
        },
        removeFile(state, action: PayloadAction<string>) {
            const index = state.findIndex((file) => file.id === action.payload);
            state.splice(index, 1);
        },
        //update todos
        updateFile: (state, action) => {
            return state.map((file) => {
                if (file.id === action.payload.id) {
                    return {
                        ...file,
                        item: action.payload.item,
                    };
                }
                return file;
            });
        },
        setFileStatus(
            state,
            action: PayloadAction<{ completed: boolean; id: string }>
        ) {
            const index = state.findIndex((file) => file.id === action.payload.id);
            state[index].completed = action.payload.completed;
        },
    },
});

export const {addFile, removeFile, setFileStatus, updateFile} = fileSlice.actions;
export default fileSlice.reducer;


//
// interface FileState {
//     folderId: number | string;
//     folder: any;
//     childFolders: any[];
//     childFiles: any[];
// }
//
// const initialState =[] as FileState[] ;
//
// const fileSlice = createSlice({
//     name: "file",
//     initialState,
//     reducers: {
//         addFolder:{
//             reducer: (state:any, action:PayloadAction<FileState>) => {
//                 state.push(action.payload);
//             },
//
//             prepare: (description: string) => ({
//                 payload: {
//                     id: uuidv4(),
//                     description,
//                     completed: false,
//                 } as Todo,
//             }),
//         } ,
//
//
//
//         addFile: (state, action) => {
//
//         }
//     }
// });
//
// export const {addFolder, addFile} = fileSlice.actions;
// export default fileSlice.reducer;