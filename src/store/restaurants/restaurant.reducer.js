import {createSlice} from "@reduxjs/toolkit";
const INITIAL_STATE = {
    restaurants:[]
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



const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: INITIAL_STATE,
    reducers: {
        getRestaurants(state, action){
            state = action.payload
            console.log("Logging getRestaurants  action", action)
            console.log("Logging getRestaurants  new state", state)
        }
    }
})

export const { getRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;