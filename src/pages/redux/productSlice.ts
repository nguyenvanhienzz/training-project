import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'redux/store';

interface ProductState {
    valueProduct: [];
}

// Define the initial state using that type
const initialState: ProductState = {
    valueProduct: [],
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        productlist: (state, actions: PayloadAction<any>) => {
            state.valueProduct = actions.payload;
        },
    },
});

export const { productlist } = productSlice.actions;

export const selectProduct = (state: RootState) => state.product.valueProduct;

export default productSlice.reducer;
