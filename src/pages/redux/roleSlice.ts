import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Roles } from 'interface/apiAdmin';
import { roleList } from 'interface/common';
import type { RootState } from 'redux/store';
import apiAdmin from 'services/apiadmin.service';
import { string } from 'yup';

interface AdminState {
    roles: Roles;
}

// Define the initial state using that type
const initialState: AdminState = {
    roles: {
        administrator: [{ enabled: '', id: '', name: '' }],
        customer: [
            {
                id: '',
                name: '',
            },
        ],
    },
};

export const roleSlice = createSlice({
    name: 'roles',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchRoles.fulfilled, (state, actions: any) => {
            state.roles = actions.payload;
        });
    },
});
export const fetchRoles = createAsyncThunk('roles', async () => {
    const role = await apiAdmin.getRole();
    return role.data;
});
// export const { vendorlist } = adminSlice.actions;
export const selectRoles = (state: RootState) => state.roles.roles;

export default roleSlice.reducer;
