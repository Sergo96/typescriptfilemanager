import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface iDirectory {
    id?: number | string,
    description: string,
    parentId?: string | number,
}


const initialState = {
    breadCrumbArr: [] as iDirectory[],
};

const directorySlice = createSlice({
    name: "directoryArray",
    initialState,
    reducers: {
        addFileIntoDirectoryArr: {
            reducer: (state, action: PayloadAction<iDirectory>) => {
                state.breadCrumbArr.push(action.payload);
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
            const index = state.breadCrumbArr.findIndex((file) => {
                return file?.id === parseInt(action?.payload)
            });
            state.breadCrumbArr = state.breadCrumbArr.splice(0, index + 1)

        },
    },
});

export const {addFileIntoDirectoryArr, removeDirectory} = directorySlice.actions;
export default directorySlice.reducer;
