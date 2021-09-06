import {createSlice} from "@reduxjs/toolkit";

// const  [userName, setUserName] = useState(null);
// const [userEmail, setUserEmail] = useState(null);
const initialState = {
    userName: null,
    userEmail: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.userName = action.payload.userName; // setUserName(action.payload)
            state.userEmail = action.payload.userEmail;
        },
        setUserLogOutState: (state) => {
            state.userName = null;
            state.userEmail = null;
        },
    },
});

export const {setActiveUser, setUserLogOutState} = userSlice.actions;
export const selectUserName = (state: any) => state.user.userName;
export const selectUserEmail = (state: any) => state.user.userEmail;
export default userSlice.reducer;