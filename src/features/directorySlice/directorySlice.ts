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
                console.log(file)
                console.log('id',  file.id);
                console.log('payload',  action.payload)
                return file?.id === parseInt(action?.payload)
            });
            console.log('redux', index)
            // return state.slice(state[index])
            // state = state.splice(0, index + 1);

            // state = state.slice(0, index)


            // state = state.slice(state[index])

            // state =  state.slice(index))

            // state = state.slice(state.indexOf(action.payload))

            state.breadCrumbArr = state.breadCrumbArr.splice(0, index + 1)

        },
    },
});

export const {addFileIntoDirectoryArr, removeDirectory} = directorySlice.actions;
export default directorySlice.reducer;
