import { USER_ACTION_TYPES } from "./user.types";
import {createSlice} from "@reduxjs/toolkit";
const INITIAL_STATE = {
    currentUser: null
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
                // switch(type){
                //     case USER_ACTION_TYPES.SET_CURRENT_USER:
                //         state.currentUser = payload
                // }
        }
    }
})

export const { setUser } = userSlice.actions;
export default userSlice.reducer;