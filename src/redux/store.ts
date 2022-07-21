import { configureStore } from '@reduxjs/toolkit';
import vendorSlice from 'pages/redux/vendorsSlice';
import categorySlice from 'pages/redux/categorySlice';
import productlist from 'pages/redux/productSlice';
import brandSlice from 'pages/redux/brandsSlice';
import shippingSlice from 'pages/redux/shippingSlice';
import countrySlice from 'pages/redux/countrySlice';
import roleSlice from 'pages/redux/roleSlice';
// ...

export const Store = configureStore({
    reducer: {
        product: productlist,
        category: categorySlice,
        vendors: vendorSlice,
        brands: brandSlice,
        shippings: shippingSlice,
        roles: roleSlice,
        countrys: countrySlice,
    },
});

export type RootState = ReturnType<typeof Store.getState>;

export type AppDispatch = typeof Store.dispatch;
