import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: '/'
};

const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        SET_PAGE(state, action) {
            console.log({ 'Redux': action.payload });
            state.page = action.payload.page;
        },
    },
});

const SET_PAGE = navSlice.actions.SET_PAGE;
const selectPage = (state) => state.nav;
export { SET_PAGE, selectPage }
export default navSlice.reducer;
