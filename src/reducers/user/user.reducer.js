import {createSlice} from "@reduxjs/toolkit";
import {findUserByIdThunk} from "../../thunks/userthunk";

const INITIAL_STATE = {
    currentUser: null, // object retrieved from auth
    displayName: null,
    userType:null,
    publicProfile: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser(state, action){
            state.currentUser = action.payload
            // console.log("Logging SetUser action", action)
        },
        setDisplayName(state, action){
            state.displayName = action.payload
            // console.log("Logging setDisplayName action", action)
        },
        setUserType(state, action){
            state.userType = action.payload
            // console.log("Logging setUserType action", action)
        }
    },
    extraReducers: {
        [findUserByIdThunk.fulfilled]: (state, action) => {
            state.publicProfile = action.payload
        }
    }

})

export const { setUser, setDisplayName, setUserType} = userSlice.actions;
export default userSlice.reducer;