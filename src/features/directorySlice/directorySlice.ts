import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface iDirectory {
    id?: number | string;
    description?: any;
    parentId?: number | string;
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

        removeDirectory(state, action) {
            // const index = state.findIndex((file) => {
            //     console.log('id',typeof file.id);
            //     console.log('payload',typeof action.payload)
            //     return file?.id === action?.payload.id
            // });
            // console.log('redux', index)
            // state = state.slice(index)

            // state = state.slice(state[index])

            state = state.slice(state.indexOf(action.payload?.id))
        },
    },
});

export const {addFileIntoDirectoryArr, removeDirectory} = directorySlice.actions;
export default directorySlice.reducer;
