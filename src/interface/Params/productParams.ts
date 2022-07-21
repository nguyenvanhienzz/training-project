export interface productParams {
    availability: string;
    category: string;
    count: number;
    order_by: string;
    page: number;
    search: string;
    search_type: string;
    sort: string;
    stock_status: string;
    vendor: string;
}
export interface productEditParams<T> {
    params: T[];
}
