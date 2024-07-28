import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./features/companySlice";
import userSlice from "./features/userSlice";

const store = configureStore({
    reducer: {
        companySlice : companySlice,
        userSlice: userSlice,
    },
})

export default store;