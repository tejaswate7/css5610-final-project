import {combineReducers} from "redux";
import  userReducer   from "./user/user.reducer";
import cocktailReducer from "../reducers/cocktail-reducer";
import restaurantReducer from "./restaurants/restaurant.reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    cocktail: cocktailReducer,
})