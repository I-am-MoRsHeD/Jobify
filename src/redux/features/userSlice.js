import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {}
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, { payload }) => {
            state.user.email = payload;
        }
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;

