import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    token: null,
    user: {
        id: null,
        name: null,
        email: null,
        role: null,
    }, firmDetails: {
        role: null,
        firmName: null,
    }
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LOGIN(state, action) {
            // console.log({ 'Redux': action.payload.tok });
            state.isLoggedIn = true;
            if (action.payload.token) {
                state.token = action.payload.token;
            }
            if (action.payload.user.id) {
                state.user.id = action.payload.user.id;
            }
            if (action.payload.user.name) {
                state.user.name = action.payload.user.name;
            }
            if (action.payload.user.role) {
                state.user.role = action.payload.user.role;
            }
            if (action.payload.user.email) {
                state.user.email = action.payload.user.email;
            }
            // if (action.payload.firmDetails.role) {
            //     state.firmDetails.role = action.payload.firmDetails.role;
            // }
            // if (action.payload.firmDetails.firmName) {
            //     state.firmDetails.firmName = action.payload.firmDetails.firmName;
            // }
        },
        LOGOUT(state) {
            state.isLoggedIn = false;
            state.token = null;
            state.firmDetails = {
                role: null,
                firmName: null,
            };
            state.user = {
                id: null,
                name: null,
                email: null,
                role: null,
            };
        },
    },
});

const LOGIN = authSlice.actions.LOGIN;
const LOGOUT = authSlice.actions.LOGOUT;
const selectAuth = (state) => state.auth;
export { LOGIN, LOGOUT, selectAuth }
export default authSlice.reducer;
