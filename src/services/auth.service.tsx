import { config } from 'config';
import { RemoveTableUser } from 'interface';
import { editProduct } from 'interface/common';
import { userEditParams } from 'interface/Params/userParams';

const userApi = {
    Postlogin(values: any): any {
        const url = 'api/authentication/login';
        return config.AxiosClient.post(url, values);
    },
    Createuser(values: any): any {
        const url = 'apiAdmin/users/create';
        return config.AxiosClient.post(url, values);
    },
    Updateuser(values: { id: string }): any {
        const url = 'apiVendor/profile/detail';
        return config.AxiosClient.post(url, values);
    },

    Getuser(values: any): any {
        const url = 'apiAdmin/users/list';
        return config.AxiosClient.post(url, values);
    },
    deleteUser(params: userEditParams<RemoveTableUser>): Promise<editProduct> {
        const url = 'apiAdmin/users/edit';
        return config.AxiosClient.post(url, params);
    },
};
export default userApi;
