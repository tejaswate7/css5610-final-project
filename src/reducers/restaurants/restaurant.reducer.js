import {createSlice} from "@reduxjs/toolkit";
import {findAllRestaurantsThunk, findRestaurantByIdThunk} from "../../thunks/restaurant-thunk";

const INITIAL_STATE = {
    restaurants:[],
    name: '',
    photoURL: ''
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
    },
    extraReducers: {
        [findRestaurantByIdThunk.fulfilled]: (state, action) => {
            state.name = action.payload.title
            state.photoURL = action.payload.imageUrl
        },
        [findAllRestaurantsThunk.fulfilled]: (state, action) => {
            state.restaurants = action.payload
        }
    }
})

export const { getRestaurants } = restaurantSlice.actions;
export default restaurantSlice.reducer;