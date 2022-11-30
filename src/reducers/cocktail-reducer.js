import {createSlice} from "@reduxjs/toolkit";
import {findCocktailBySearchTerm} from "../services/cocktail/cocktail-service";
import {findCocktailByIdThunk, findCocktailBySearchTermThunk} from "../thunks/cocktail-thunk";

const initialState = {
    cocktails: [],
    currentCocktail: [],
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
        }
    }
})

export default cocktailReducer.reducer;