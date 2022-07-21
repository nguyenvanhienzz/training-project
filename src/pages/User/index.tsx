import './UserStyles.scss';

import Button from 'components/button';
import ProductSearch from './UserSearch';
import TableProduct from './TableUser';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserParams } from 'interface/Params/userParams';
import { UserTable } from 'interface';

const User = () => {
    const [paramsUser, setParamsUser] = useState<UserParams>({
        address: '',
        count: 10,
        country: '',
        date_range: [],
        date_type: 'R',
        memberships: [],
        order_by: 'DESC',
        page: 1,
        phone: '',
        search: '',
        sort: 'last_login',
        state: '',
        status: [],
        types: [],
        tz: 7,
    });

    //phan trang
    const [pageCount, setPageCount] = useState<number>(1);
    //tong san pham trong product
    const [TotalItem, setTotalItem] = useState<number>(0);
    const [userItem, setUserItem] = useState<UserTable[] | []>([]);

    //hanh dong click vao tran trang

    const handerChange = (event: any) => {
        setParamsUser({ ...paramsUser, [event.target.name]: event.target.value });
    };

    return (
        <div className="products">
            <div className="product-item">
                <p>Search for users</p>
                <ProductSearch
                    setUserItem={(e: any) => setUserItem(e)}
                    paramsUser={paramsUser}
                    handerChange={handerChange}
                    setParamsUser={setParamsUser}
                    setTotalItem={(item: any) => setTotalItem(item.recordsTotal)}
                    setPageCount={(item: any) => setPageCount(Math.ceil(Number(item.recordsTotal) / paramsUser.count))}
                />
                <Link to="/pages/user/new-user">
                    <Button title="Add user " classes="btn-add" />
                </Link>
                <TableProduct
                    handlePageClick={(event: any) => {
                        setParamsUser({ ...paramsUser, page: event.selected + 1 });
                    }}
                    setUserItem={(e: any) => setUserItem(e)}
                    userItem={userItem}
                    setParamsProduct={(event: any) => setParamsUser(event)}
                    paramsUser={paramsUser}
                    pageCount={pageCount}
                    TotalItem={TotalItem}
                    setTotalItem={(item: any) => setTotalItem(item.recordsTotal)}
                    setPageCount={(item: any) => setPageCount(Math.ceil(Number(item.recordsTotal) / paramsUser.count))}
                    handerSortItem={(event) => setParamsUser(event)}
                    handerChange={handerChange}
                />
            </div>
        </div>
    );
};

export default User;
