export interface ParamsProduct {
    recordsTotal: string;
}

export interface ListProduct<T> {
    data: T[];
    recordsTotal: ParamsProduct;
}
export interface addProduct {
    data: string;
    errors: boolean;
    success: boolean;
}
export interface editProduct {
    data: boolean;
    errors: boolean | string;
    success: boolean;
}

//user
export interface dataUser<T> {
    data: T[];
    recordsTotal: ParamsProduct;
}
//apiadmin
export interface vendorslist<T> {
    data: T[];
    recordsTotal: number;
}
export interface brandslist<T> {
    data: T[];
}
export interface shippinglist<T> {
    data: T[];
}
export interface roleList<T> {
    data: T;
}
export interface countryList<T> {
    data: T[];
}
