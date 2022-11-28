import {createAsyncThunk} from "@reduxjs/toolkit";
import {findCocktailBySearchTerm} from "../services/cocktail/cocktail-service";

export const findCocktailBySearchTermThunk = createAsyncThunk(
    'findCocktailBySearchTerm',
    (term) => findCocktailBySearchTerm(term)
)