import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Vendors } from 'interface/apiAdmin';
import type { RootState } from 'redux/store';
import apiAdmin from 'services/apiadmin.service';

interface AdminState {
    vendors: Vendors[];
}

// Define the initial state using that type
const initialState: AdminState = {
    vendors: [],
};

export const vendorSlice = createSlice({
    name: 'vendors',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchVendor.fulfilled, (state, actions) => {
            state.vendors = actions.payload;
        });
    },
});
export const fetchVendor = createAsyncThunk('vendor', async () => {
    const vendor = await apiAdmin.getVendors();
    return vendor.data;
});
// export const { vendorlist } = adminSlice.actions;
export const selectVendor = (state: RootState) => state.vendors.vendors;

export default vendorSlice.reducer;
