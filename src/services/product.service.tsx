import { config } from 'config';
import {
    AddItemProduct,
    Category,
    EditTableProduct,
    Product,
    productEditParams,
    productParams,
    RemoveTableProduct,
} from 'interface';
import { addProduct, editProduct, ListProduct } from 'interface/common';

const productApi = {
    getProduct(params: productParams | undefined): Promise<ListProduct<Product>> {
        const url = 'api/products/list';
        return config.AxiosClient.post(url, params);
    },
    editProduct(params: productEditParams<EditTableProduct>): Promise<editProduct> {
        const url = 'apiAdmin/products/edit';
        return config.AxiosClient.post(url, params);
    },
    addProduct(params: any): Promise<addProduct> {
        const url = 'apiAdmin/products/create';
        return config.AxiosClient.post(url, params);
    },
    updateProduct(params: { id: string }) {
        const url = 'apiAdmin/products/detail';
        return config.AxiosClient.post(url, params);
    },
    updateImg(params: any) {
        const url = 'api/products/upload-image';
        return config.AxiosClient.post(url, params);
    },
    deleteProduct(params: productEditParams<RemoveTableProduct>): Promise<editProduct> {
        const url = 'apiAdmin/products/edit';
        return config.AxiosClient.post(url, params);
    },
    getCategory(): Promise<ListProduct<Category>> {
        const url = 'api/categories/list';
        return config.AxiosClient.post(url);
    },
};
export default productApi;
