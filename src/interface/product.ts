export interface Product {
    sku: string;
    name: string;
    category: string;
    price: number;
    amount: string;
    vendor: string;
    arrivalDate: string;
    recordsTotal: string;
}
export interface EditTableProduct {
    id?: string;
    price?: string | number;
    stock?: string | number;
}
export interface AddItemProduct {
    vendor_id: string;
    name: string;
    brand_id: string;
    condition_id: string;
    categories: [];
    description: string;
    enabled: number;
    memberships: [];
    shipping_to_zones: [{ id: number; price: string }];
    tax_exempt: number;
    price: string;
    sale_price_type: '$';
    arrival_date: string;
    inventory_tracking: number;
    quantity: string;
    sku: string;
    participate_sale: number;
    sale_price: string;
    og_tags_type: string;
    og_tags: string;
    meta_desc_type: string;
    meta_description: string;
    meta_keywords: string;
    product_page_title: string;
    facebook_marketing_enabled: number;
    google_feed_enabled: number;
    imagesOrder: string[];
    deleted_images: [];
}

export interface RemoveTableProduct {
    id: string;
    delete: number;
}

export interface Category {
    id: number;
    name: string;
    parentId: number;
    path: string;
    pos: number;
}
