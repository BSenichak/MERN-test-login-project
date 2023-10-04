import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../axiosAPI.js";

export const registration = createAsyncThunk(
    "auth-registration",
    async (params) => {
        const { data } = await axios.post("/register", params);
        return data;
    }
);

const initialState = {
    userEmail: null,
    status: "loading",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.userEmail = null;
        },
    },
    extraReducers: {
        [registration.pending]: (state) => {
            state.userEmail = null;
            state.status = "loading";
        },
        [registration.fulfilled]: (state, action) => {
            state.userEmail = action.payload.email;
            state.status = "loaded";
        },
        [registration.rejected]: (state) => {
            state.userEmail = null;
            state.status = "error";
        },
    },
});

export const isAuthSelector = (state) => Boolean(state.auth.userEmail);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
