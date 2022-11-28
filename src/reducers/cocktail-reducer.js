import {createSlice} from "@reduxjs/toolkit";
import {findCocktailBySearchTerm} from "../services/cocktail/cocktail-service";
import {findCocktailBySearchTermThunk} from "../thunks/cocktail-thunk";

const initialState = {
    cocktails: [],
    loading: false
}

const cocktailReducer = createSlice({
    name: 'cocktail',
    initialState,
    extraReducers: {
        [findCocktailBySearchTermThunk.fulfilled]: (state, action) => {
            state.cocktails = action.payload
        }
    }
})

export default cocktailReducer.reducer;