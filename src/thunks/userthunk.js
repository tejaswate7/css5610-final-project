import {createAsyncThunk} from "@reduxjs/toolkit";
import {findUserById} from "../services/userservice";

export const findUserByIdThunk = createAsyncThunk(
    'findUserById',
    async (uid) => await findUserById(uid)
)