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
        },
        deleteUser: (state) => {
            state.user = {}
        }
    }
});

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;

