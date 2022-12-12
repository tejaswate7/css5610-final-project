import {createAsyncThunk} from "@reduxjs/toolkit";
import {findUserById} from "./userservice";

export const findUserByIdThunk = createAsyncThunk(
    'findUserById',
    async (uid) => await findUserById(uid)
)