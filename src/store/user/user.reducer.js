import { USER_ACTION_TYPES } from "./user.types";
import {createSlice} from "@reduxjs/toolkit";
const INITIAL_STATE = {
    currentUser: null, // object retrieved from auth
    displayName: null,
    userType:null
}

// export const userReducer = (state = INITIAL_STATE, action) => {
//     const { type, payload } = action
//
//     switch(type){
//         case USER_ACTION_TYPES.SET_CURRENT_USER:
//             return {...state, currentUser: payload};
//         default:
//             return state
//     }
// }



const userSlice = createSlice({
    name: 'user',
    initialState: INITIAL_STATE,
    reducers: {
        setUser(state, action){
            // const { type, payload } = action
            state.currentUser = action.payload
            console.log("Logging SetUser action", action)
                // switch(type){
                //     case USER_ACTION_TYPES.SET_CURRENT_USER:
                //         state.currentUser = payload
                // }
        },
        setDisplayName(state, action){
            state.displayName = action.payload
            console.log("Logging setDisplayName action", action)
        },
        setUserType(state, action){
            state.userType = action.payload
            console.log("Logging setUserType action", action)
        }
    }
})

export const { setUser, setDisplayName, setUserType } = userSlice.actions;
export default userSlice.reducer;