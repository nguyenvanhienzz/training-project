import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
    password: Yup.string()
        .min(6, 'Password phải lơn hơn 6 kí tự')
        .max(50, 'Password nhỏ hơn 50 kí tự')
        .required('Vui lòng nhập password'),
});
export const NewAccountSchema = Yup.object().shape({
    firstName: Yup.string().required('Vui lòng nhập first name'),
    lastName: Yup.string().required('Vui lòng nhập last name'),
    email: Yup.string().email('Email không hợp lệ!').required('Vui lòng nhập email'),
    password: Yup.string()
        .min(6, 'Password phải lơn hơn 6 kí tự')
        .max(50, 'Password nhỏ hơn 50 kí tự')
        .required('Vui lòng nhập password'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Vui lòng nhập đúng password')
        .required('Vui lòng nhập confirmpassword'),
});
export const ProductSchema = Yup.object().shape({
    vendor: Yup.string().required('This field is required'),
    title: Yup.string().required('This field is required'),
    brand: Yup.string().required('This field is required'),
    image: Yup.string().required('Image is required!'),
    category: Yup.string().required('This field is required'),
    description: Yup.string().required('This field is required'),
});
