import {createSlice} from "@reduxjs/toolkit";
import {findUserByIdThunk} from "../../thunks/userthunk";

const INITIAL_STATE = {
    currentUser: null, // object retrieved from auth
    displayName: null,
    userType:null,
    location: null,
    contact: null,
    publicProfile: null
}

const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser(state, action){
            state.currentUser = action.payload
        },
        setDisplayName(state, action){
            state.displayName = action.payload
        },
        setUserType(state, action){
            state.userType = action.payload
        },
        setUserLocation(state, action){
            state.location = action.payload
        },
        setUserContact(state, action){
            state.contact = action.payload
        }
    },
    extraReducers: {
        [findUserByIdThunk.fulfilled]: (state, action) => {
            state.publicProfile = action.payload
        }
    }

})

export const { setUser, setDisplayName, setUserType, setUserLocation, setUserContact} = userSlice.actions;
export default userSlice.reducer;