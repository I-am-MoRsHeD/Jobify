import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    companies: [],
    companyById: [],
}

const companySlice = createSlice({
    name: 'companySlice',
    initialState,
    reducers: {
        addCompany: (state, { payload }) => {
            state.companies.push(payload)
        },
        catchCompanyByid: (state, { payload }) => {
            
        }
    },
})

export const { addCompany } = companySlice.actions;

export default companySlice.reducer;
