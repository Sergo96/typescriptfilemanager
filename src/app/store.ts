import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
import userReducer from "../features/userSlice/userSlice";
import fileReducer from "../features/fileSlice/fileSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        files: fileReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
