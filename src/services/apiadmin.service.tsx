import { config } from 'config';
import { Brands, Countrys, Roles, Shippings, Vendors } from 'interface/apiAdmin';
import { brandslist, countryList, editProduct, roleList, vendorslist } from 'interface/common';

const apiAdmin = {
    getVendors(): Promise<vendorslist<Vendors>> {
        const url = 'apiAdmin/vendors/list';
        return config.AxiosClient.post(url);
    },
    getBrands(): Promise<brandslist<Brands>> {
        const url = 'apiAdmin/brands/list';
        return config.AxiosClient.post(url);
    },
    getShipping(): Promise<brandslist<Shippings>> {
        const url = 'apiAdmin/shipping/list';
        return config.AxiosClient.post(url);
    },
    getRole(): Promise<roleList<Roles>> {
        const url = 'apiAdmin/commons/role';
        return config.AxiosClient.post(url);
    },
    getCountry(): Promise<countryList<Countrys>> {
        const url = 'apiAdmin/commons/country';
        return config.AxiosClient.post(url);
    },
};
export default apiAdmin;
