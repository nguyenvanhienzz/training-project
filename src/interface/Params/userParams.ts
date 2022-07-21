export interface UserParams {
    address: string;
    count: number;
    country: string;
    date_range: string[];
    date_type: string;
    memberships: string[];
    order_by: string;
    page: number;
    phone: string;
    search: string;
    sort: string;
    state: string;
    status: string[];
    types: string[];
    tz: number;
}

export interface userEditParams<T> {
    params: T[];
}
