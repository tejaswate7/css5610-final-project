import {createAsyncThunk} from "@reduxjs/toolkit";
import {findCocktailById, findCocktailBySearchTerm} from "../services/cocktail/cocktail-service";

export const findCocktailBySearchTermThunk = createAsyncThunk(
    'findCocktailBySearchTerm',
    (term) => findCocktailBySearchTerm(term)
)

export const findCocktailByIdThunk = createAsyncThunk(
    'findCocktailById',
    (id) => findCocktailById(id)
)