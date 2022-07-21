import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Brands } from 'interface/apiAdmin';
import type { RootState } from 'redux/store';
import apiAdmin from 'services/apiadmin.service';

interface AdminState {
    brands: Brands[];
}

// Define the initial state using that type
const initialState: AdminState = {
    brands: [],
};

export const brandSlice = createSlice({
    name: 'brands',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchBrand.fulfilled, (state, actions) => {
            state.brands = actions.payload;
        });
    },
});
export const fetchBrand = createAsyncThunk('brands', async () => {
    const brand = await apiAdmin.getBrands();
    return brand.data;
});
// export const { vendorlist } = adminSlice.actions;
export const selectBrands = (state: RootState) => state.brands.brands;

export default brandSlice.reducer;
