import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Shippings, Vendors } from 'interface/apiAdmin';
import type { RootState } from 'redux/store';
import apiAdmin from 'services/apiadmin.service';

interface AdminState {
    shippings: any[];
}

// Define the initial state using that type
const initialState: AdminState = {
    shippings: [],
};

export const vendorSlice = createSlice({
    name: 'vendors',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchShipping.fulfilled, (state, actions) => {
            state.shippings = actions.payload;
        });
    },
});
export const fetchShipping = createAsyncThunk('shipping', async () => {
    const vendor = await apiAdmin.getShipping();
    return vendor.data;
});
// export const { vendorlist } = adminSlice.actions;
export const selectShipping = (state: RootState) => state.shippings.shippings;

export default vendorSlice.reducer;
