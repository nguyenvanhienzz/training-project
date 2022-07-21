import { useAppDispatch, useAppSelector } from 'redux/hook';
import { useCallback, useEffect, useState } from 'react';

import './TableProduct.scss';
import Notification from 'components/notification';
import Paginate from 'components/paginate';
import { EditTableProduct, productParams, RemoveTableProduct } from 'interface';
import productApi from 'services/product.service';
import ProductItem from './TableProductItem';
import Button from 'components/button';
import { productlist, selectProduct } from 'pages/redux/productSlice';
import { Checkbox, Table, TableHead, TableRow, TableSortLabel } from '@material-ui/core';
import { StyledTableCell } from './Style';
import { thtable } from 'pages/Data';

interface Props {
    handlePageClick: (e: any) => void;
    paramsProduct: productParams;
    pageCount: number;
    TotalItem: number;
    handerChange: (event: any) => void;
    handerSortItem: (event: any) => void;
    setPageCount: (e: any) => void;
    setTotalItem: (e: any) => void;
    setParamsProduct: (e: any) => void;
}
const TableProduct = (props: Props) => {
    const {
        handlePageClick,
        paramsProduct,
        pageCount,
        TotalItem,
        handerChange,
        handerSortItem,
        setPageCount,
        setTotalItem,
    } = props;
    const productItem = useAppSelector(selectProduct);
    const dispatch = useAppDispatch();

    const [state, setState] = useState<boolean>(true);
    const [remove, setRemove] = useState<boolean>(true);
    const [notification, setNotification] = useState<boolean>(false);
    const [order, setOder] = useState<string>('asc');
    const [editItem, setEditItem] = useState<EditTableProduct>({ id: '', price: '', stock: '' });
    const [removeItem, setRemoveItem] = useState<RemoveTableProduct[] | []>([]);
    //săp xep theo từng th
    const handerSort = (item: string) => {
        const isAsc = paramsProduct.sort === item && order === 'asc'; //xac dinh id cua tung cot
        setOder(isAsc ? 'desc' : 'asc');
        handerSortItem({ ...paramsProduct, order_by: isAsc ? 'DESC' : 'ASC', sort: item });
    };
    const saveChanges = () => {
        setNotification(true);
        setState(true);
    };
    const confirmPage = async () => {
        const valuesProduct = await productApi.getProduct(paramsProduct);
        dispatch(productlist(valuesProduct.data));
        setPageCount(valuesProduct);
        setTotalItem(valuesProduct);
    };
    const confirmEdit = async () => {
        await productApi.editProduct({ params: [{ ...editItem }] });
        confirmPage();
    };

    const confirmDelete = async () => {
        await productApi.deleteProduct({ params: [...removeItem] });
        confirmPage();
    };

    useEffect(() => {
        confirmPage();
    }, [paramsProduct.page, paramsProduct.count, paramsProduct.sort, paramsProduct.order_by]);

    return (
        <div className="table-products">
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell padding="checkbox" style={{ borderBottom: 'none' }}>
                            <Checkbox style={{ color: 'blue' }} />
                        </StyledTableCell>
                        {thtable.map((headCell) => (
                            <StyledTableCell key={headCell.id} style={{ fontWeight: 600, borderBottom: 'none' }}>
                                {headCell.id === 'category' ? (
                                    headCell.name
                                ) : (
                                    <TableSortLabel
                                        active={headCell.id === paramsProduct.sort} //mac dinh
                                        //chieu mui ten
                                        direction={
                                            paramsProduct.sort === headCell.id && order === 'asc' ? 'desc' : 'asc'
                                        }
                                        onClick={() => handerSort(headCell.id)} //sap xep
                                    >
                                        {headCell.name}
                                    </TableSortLabel>
                                )}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>

                <ProductItem
                    setState={setState}
                    state={state}
                    editItem={editItem}
                    setEditItem={setEditItem}
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
                {remove ? (
                    <Button
                        title="Save changes"
                        classes={!state ? 'btn-save' : 'btn-none'}
                        onClick={saveChanges}
                        disabled={state}
                    />
                ) : (
                    <Button
                        title="Remove selected"
                        classes={!remove ? 'btn-save' : 'btn-none'}
                        disabled={remove}
                        onClick={() => setNotification(true)}
                    />
                )}
            </div>

            {notification ? (
                remove ? (
                    <Notification
                        title="Confirm Update"
                        p="Do you want to update this product?"
                        onClick={() => setNotification(!notification)}
                        confirmClick={confirmEdit}
                    />
                ) : (
                    <Notification
                        title="Confirm Delete"
                        p="Do you want to delete this product?"
                        onClick={() => setNotification(!notification)}
                        confirmClick={confirmDelete}
                    />
                )
            ) : null}
        </div>
    );
};

export default TableProduct;
