import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';
import apiAdmin from 'services/apiadmin.service';

interface AdminState {
    countrys: any[];
}

// Define the initial state using that type
const initialState: AdminState = {
    countrys: [],
};

export const countrySlice = createSlice({
    name: 'countrys',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCountry.fulfilled, (state, actions) => {
            state.countrys = actions.payload;
        });
    },
});
export const fetchCountry = createAsyncThunk('country', async () => {
    const vendor = await apiAdmin.getCountry();
    return vendor.data;
});
// export const { vendorlist } = adminSlice.actions;
export const selectCountrys = (state: RootState) => state.countrys.countrys;

export default countrySlice.reducer;
