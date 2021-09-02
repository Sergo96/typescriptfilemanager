import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface TrashBin {
    id: number | string;
    description: string;
    completed: boolean;
    parent: number;
    type: boolean;
}

const initialState = [] as TrashBin[];


const trashSlice = createSlice({
    name: "trashFiles",
    initialState,
    reducers: {
        addFileIntoTrashBin: {
            reducer: (state, action: PayloadAction<TrashBin>) => {
                state.push(action.payload);
            },
            prepare: (description: string, type?: boolean, parent?: string | number) => ({
                payload: {
                    id: Date.now(),
                    description,
                    completed: false,
                    parent: parent,
                    type: type
                } as TrashBin,
            }),

        },
        removeTrashBinFile(state, action: PayloadAction<string>) {
            const index = state.findIndex((file) => file.id === action.payload);
            state.splice(index, 1);
        },
    },
});

export const {addFileIntoTrashBin, removeTrashBinFile} = trashSlice.actions;
export default trashSlice.reducer;
