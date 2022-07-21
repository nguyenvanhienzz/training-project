import './TableUser.scss';
import { useEffect, useState } from 'react';
import { Checkbox, Table, TableHead, TableRow, TableSortLabel } from '@material-ui/core';

import Notification from 'components/notification';
import Paginate from 'components/paginate';
import { RemoveTableUser } from 'interface';

import Button from 'components/button';
import { StyledTableCell } from './Style';
import { thUser } from 'pages/Data';
import userApi from 'services/auth.service';
import UserItem from './TableUserItem';
import { UserParams } from 'interface/Params/userParams';

interface Props {
    handlePageClick: (e: any) => void;
    paramsUser: UserParams;
    pageCount: number;
    TotalItem: number;
    handerChange: (event: any) => void;
    handerSortItem: (event: any) => void;
    setPageCount: (e: any) => void;
    setTotalItem: (e: any) => void;
    setParamsProduct: (e: any) => void;
    userItem: any;
    setUserItem: (e: any) => void;
}
const TableUser = (props: Props) => {
    const {
        handlePageClick,
        paramsUser,
        pageCount,
        TotalItem,
        handerChange,
        handerSortItem,
        setPageCount,
        setTotalItem,
        userItem,
        setUserItem,
    } = props;

    const [state, setState] = useState<boolean>(true);
    const [remove, setRemove] = useState<boolean>(true);
    const [notification, setNotification] = useState<boolean>(false);
    const [order, setOder] = useState<string>('asc');
    const [removeItem, setRemoveItem] = useState<RemoveTableUser[] | []>([]);
    // const [userItem, setUserItem] = useState<UserTable[] | []>([]);
    const [upload, setUpload] = useState<boolean>(true);

    //săp xep theo từng th
    const handerSort = (item: string) => {
        const isAsc = paramsUser.sort === item && order === 'asc'; //xac dinh id cua tung cot
        setOder(isAsc ? 'desc' : 'asc');
        handerSortItem({ ...paramsUser, order_by: isAsc ? 'DESC' : 'ASC', sort: item });
    };
    // goi api user lít
    const confirmPage = async () => {
        const valuesUser = await userApi.Getuser(paramsUser);
        setUserItem(valuesUser.data);
        setPageCount(valuesUser);
        setTotalItem(valuesUser);
    };
    //ham  xoa item
    const confirmDelete = async () => {
        await userApi.deleteUser({ params: [...removeItem] });
        confirmPage();
    };

    useEffect(() => {
        confirmPage();
    }, [paramsUser.page, paramsUser.count, paramsUser.sort, paramsUser.order_by, upload]);

    return (
        <div className="table-products">
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell padding="checkbox" style={{ borderBottom: 'none' }}>
                            <Checkbox style={{ color: 'blue' }} />
                        </StyledTableCell>
                        {thUser.map((headCell) => (
                            <StyledTableCell key={headCell.id} style={{ fontWeight: 600, borderBottom: 'none' }}>
                                {headCell.id === 'products' ||
                                headCell.id === 'orders' ||
                                headCell.id === 'wishlist' ? (
                                    headCell.name
                                ) : (
                                    <TableSortLabel
                                        active={headCell.id === paramsUser.sort} //mac dinh
                                        //chieu mui ten
                                        direction={paramsUser.sort === headCell.id && order === 'asc' ? 'desc' : 'asc'}
                                        onClick={() => handerSort(headCell.id)} //sap xep
                                    >
                                        {headCell.name}
                                    </TableSortLabel>
                                )}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <UserItem
                    upload={upload}
                    userItem={userItem}
                    setState={setState}
                    state={state}
                    setRemove={setRemove}
                    remove={remove}
                    setRemoveItem={setRemoveItem}
                    removeItem={removeItem}
                />

                <StyledTableCell colSpan={9}>
                    <Paginate
                        handlePageClick={handlePageClick}
                        pageCount={pageCount}
                        onChange={(event: any) => handerChange(event)}
                        TotalItem={TotalItem}
                    />
                </StyledTableCell>
            </Table>
            <div className="flex-bottom">
                <Button
                    title="Remove selected"
                    classes={!remove ? 'btn-save' : 'btn-none'}
                    disabled={remove}
                    onClick={() => setNotification(true)}
                />
            </div>

            {notification ? (
                <Notification
                    title="Confirm Delete"
                    p="Do you want to delete this user?"
                    onClick={() => setNotification(!notification)}
                    confirmClick={confirmDelete}
                />
            ) : null}
        </div>
    );
};

export default TableUser;
