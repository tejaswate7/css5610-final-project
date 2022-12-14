import {createAsyncThunk} from "@reduxjs/toolkit";
import {findCocktailById, findCocktailBySearchTerm, findCocktailsByIds} from "../services/cocktail/cocktail-service";

export const findCocktailBySearchTermThunk = createAsyncThunk(
    'findCocktailBySearchTerm',
    (term) => findCocktailBySearchTerm(term)
)

export const findCocktailByIdThunk = createAsyncThunk(
    'findCocktailById',
    (id) => findCocktailById(id)
)

export const findCocktailByIdsThunk = createAsyncThunk(
    'findCocktailByIds',
    (ids) => findCocktailsByIds(ids)
)

export const findCocktailByIds2Thunk = createAsyncThunk(
    'findCocktailByIds2',
    (ids) => findCocktailsByIds(ids)
)

export const findCocktailById2Thunk = createAsyncThunk(
    'findCocktailById2',
    (id) => findCocktailById(id)
)

export const findCocktailById3Thunk = createAsyncThunk(
    'findCocktailById3',
    (id) => findCocktailById(id)
)