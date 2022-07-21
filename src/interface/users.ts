export interface User {
    email: string;
    password: number | string;
}

export interface RemoveTableUser {
    id: string;
    delete: number;
}
export interface UserTable {
    access_level: string;
    created: string;
    fistName: null | string;
    lastName: null | string;
    last_login: string;
    order: { order_as_buyer: number; order_as_buyer_total: number };
    product: number;
    profile_id: string;
    storeName: null | string;
    vendor: string;
    vendor_id: string;
    wishlist: string;
}
