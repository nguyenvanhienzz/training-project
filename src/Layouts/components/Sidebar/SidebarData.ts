import { faTag, faUser, faAngleLeft, faUpDown } from '@fortawesome/free-solid-svg-icons';
import { config } from 'config';
export const SidebarData = [
    {
        title: 'Catalog',
        path: config.routes.products,
        icon: faTag,
        icon_down: faAngleLeft,
        icon_up: faUpDown,
        cName: 'nav-text',
        subNav: [
            {
                title: 'Products',
                path: '',
            },
        ],
    },
    {
        title: 'User',
        path: config.routes.users,
        icon: faUser,
        icon_down: faAngleLeft,
        icon_up: faUpDown,
        cName: 'nav-text',
        subNav: [
            {
                title: 'User list',
                path: '',
            },
        ],
    },
];
