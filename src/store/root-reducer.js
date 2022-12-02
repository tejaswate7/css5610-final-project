import {combineReducers} from "redux";
import  userReducer   from "./user/user.reducer";
import cocktailReducer from "../reducers/cocktail-reducer";

export const rootReducer = combineReducers({
    user: userReducer,
    cocktail: cocktailReducer
})