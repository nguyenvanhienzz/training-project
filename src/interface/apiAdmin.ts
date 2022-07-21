export interface Vendors {
    companyName: string;
    id: string;
    login: string;
    name: string;
}

export interface Brands {
    id: string;
    name: string;
}
export interface Shippings {
    id: string;
    name: string;
}
export interface Roles {
    administrator: [
        {
            enabled: string;
            id: string;
            name: string;
        },
    ];
    customer: [
        {
            id: string;
            name: string;
        },
    ];
}
export interface Countrys {
    active_currency: null;
    code: string;
    code3: string;
    country: string;
    currency_id: string;
    enabled: string;
    id: string;
    is_fraudlent: string;
}
