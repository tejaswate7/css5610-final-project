import {createSlice} from "@reduxjs/toolkit";
import {
    findCocktailById2Thunk,
    findCocktailById3Thunk, findCocktailByIds2Thunk, findCocktailByIdsThunk,
    findCocktailByIdThunk,
    findCocktailBySearchTermThunk
} from "../thunks/cocktail-thunk";
import { enableMapSet } from 'immer';
import {findCocktailBySearchTerm} from "../services/cocktail/cocktail-service";

enableMapSet();


const initialState = {
    cocktails: [],
    currentCocktail: [],
    cocktailsInFeed: new Map(),
    cocktailsInLatestFeed: new Map(),
    cocktailsInLatestFeed2: new Map(),
    cocktailsInFeed2: new Map(),
    loading: true
}

const cocktailReducer = createSlice({
    name: 'cocktail',
    initialState,
    extraReducers: {
        [findCocktailBySearchTermThunk.fulfilled]: (state, action) => {
            state.cocktails = action.payload
        },
        [findCocktailByIdThunk.pending]: (state, action) => {
            state.loading = true
            state.cocktails = action.payload
        },
        [findCocktailByIdThunk.fulfilled]: (state, action) => {
            state.currentCocktail = action.payload
            state.loading = false
        },
        [findCocktailById2Thunk.fulfilled]: (state, action) => {
            console.log("payload", action.payload)
            state.cocktailsInFeed.set(action.payload[0].idDrink, action.payload[0])
        },
        [findCocktailById3Thunk.fulfilled]: (state, action) => {
            console.log("payload 3", action.payload)
            state.cocktailsInLatestFeed.set(action.payload[0].idDrink, action.payload[0])
        },
        [findCocktailByIdsThunk.fulfilled]: (state, action) => {
            // console.log("payload 4", action.payload)
            state.cocktailsInLatestFeed2 = action.payload
        },
        [findCocktailByIds2Thunk.fulfilled]: (state, action) => {
            // console.log("in reducer payload 5", action.payload)
            state.cocktailsInFeed2 = action.payload
        }
    },
    reducers: {
        setCocktailsFeedMap(state, action) {
            state.cocktailsInFeed2 = new Map()
        },
        setLatestCocktailsMap(state, action) {
            state.cocktailsInLatestFeed2 = new Map()
        }
    }
})

export const {setCocktailsFeedMap, setLatestCocktailsMap} = cocktailReducer.actions;

export default cocktailReducer.reducer;