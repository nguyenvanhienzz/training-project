import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Category } from 'interface';
import type { RootState } from 'redux/store';
import productApi from 'services/product.service';

interface CategoryState {
    category: Category[];
}

// Define the initial state using that type
const initialState: CategoryState = {
    category: [],
};

export const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchCategoty.fulfilled, (state, actions) => {
            state.category = actions.payload;
        });
    },
});
export const fetchCategoty = createAsyncThunk('categorys', async () => {
    const category = await productApi.getCategory();
    return category.data;
});
// export const { categorylist } = categorySlice.actions;

export const selectCategory = (state: RootState) => state.category.category;

export default categorySlice.reducer;
