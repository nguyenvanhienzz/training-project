import Login from 'pages/Login';
import { config } from 'config';
import Products from 'pages/Products';
import User from 'pages/User';
import PublicProduct from 'pages/Products/PublicProduct';
import PublicUser from 'pages/User/PublicUser';

export const publicRouter = [
    { path: config.routes.products, component: Products },
    { path: config.routes.addProducts, component: PublicProduct },
    { path: config.routes.updateProducts, component: PublicProduct },
    { path: config.routes.users, component: User },
    { path: config.routes.addUsers, component: PublicUser },
    { path: config.routes.updateUser, component: PublicUser },
    { path: config.routes.login, component: Login, layout: null },
];
