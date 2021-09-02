import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface File {
    id: number | string;
    description: string;
    completed: boolean;
    parent: number;
    type: boolean;
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
            prepare: (description: string, type: boolean, parent?: string | number) => ({
                payload: {
                    id: Date.now(),
                    description,
                    completed: false,
                    parent: parent,
                    type: type
                } as File,
            }),
        },
        pushFilesIntoBin(state, action: PayloadAction<File>) {
            // const index = state.findIndex((file:any) => file.id === action.payload)
            // state[index].completed = action.payload.completed;
            // state[index].deletedFiles = action.payload.deletedFiles
            // deletedFiles.push(index, 1)
            // state[index].splice(index, 1);
            // // state[index] = [...state, ...payload.deletedFiles]
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

export const {addFile, removeFile, setFileStatus, updateFile, pushFilesIntoBin} = fileSlice.actions;
export default fileSlice.reducer;

