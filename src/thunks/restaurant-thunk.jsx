import {createAsyncThunk} from "@reduxjs/toolkit";
import {findAllRestaurants, findRestaurantById} from "../services/restaurant-service";

export const findRestaurantByIdThunk = createAsyncThunk(
    'findRestaurantById',
    async (rid) => await findRestaurantById(rid)
)

export const findAllRestaurantsThunk = createAsyncThunk(
    'findAllRestaurants',
    async () => await findAllRestaurants()
)