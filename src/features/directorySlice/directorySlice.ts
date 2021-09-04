import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface iDirectory {
    id: number | string;
    description: any;
    parentId: number| string;
}


const initialState = [] as iDirectory[];

const directorySlice = createSlice({
    name: "directoryArray",
    initialState,
    reducers: {
        addFileIntoDirectoryArr: {
            reducer: (state, action: PayloadAction<iDirectory>) => {
                state.push(action.payload);
            },
            prepare: (id, description, parentId) => ({
                payload: {
                    id,
                    description,
                    parentId,
                } as iDirectory,
            }),
        },

        removeDirectory(state, action: PayloadAction<iDirectory>) {
            // const index = state.findIndex((file) => file.id === action.payload);
            // state.splice(index, 1);
        },
    },
});

export const {addFileIntoDirectoryArr, removeDirectory} = directorySlice.actions;
export default directorySlice.reducer;
