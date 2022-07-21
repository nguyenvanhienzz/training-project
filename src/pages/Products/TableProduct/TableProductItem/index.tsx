import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import Button from 'components/button';
import './ProductItem.scss';
import InBootstrap from 'components/inBootstrap';
import { EditTableProduct, RemoveTableProduct } from 'interface';
import { Checkbox, TableBody, TableRow } from '@material-ui/core';
import { StyledTableCell } from '../Style';
import { useAppSelector } from 'redux/hook';
import { selectProduct } from 'pages/redux/productSlice';

interface Props {
    setState: any;
    editItem: EditTableProduct;
    setEditItem: any;
    state: boolean;
    setRemove: any;
    remove: boolean;
    removeItem: RemoveTableProduct[];
    setRemoveItem: any;
}
const ProductItem = (props: Props) => {
    const { state, setState, editItem, setEditItem, setRemove, removeItem, setRemoveItem } = props;
    const numberFormat = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

    const productItem = useAppSelector(selectProduct);

    const haderClick = (event: any, item: any) => {
        event.stopPropagation();
        setState(false);
        setEditItem({
            id: item.id,
            price: parseFloat(item.price).toFixed(2),
            stock: item.amount,
        });
    };
    //onclick icon remove
    const DeleteItem = (item: RemoveTableProduct) => {
        //kiêm tra xem mang phan tu da ton tai hay chưa
        if (!removeItem.some((data) => item.id === data.id)) {
            setRemoveItem([...removeItem, { id: item.id, delete: 1 }]);
            setState(false);
            setRemove(false);
        } else {
            //tim id de xoa
            const index = removeItem.findIndex((data) => item.id === data.id);
            if (index >= 0) {
                //xoa khi click vao 2 lan
                removeItem.splice(index, 1);
            }
            if (removeItem.length <= 0) {
                setRemove(true);
            }
            setRemoveItem([...removeItem]);
        }
    };

    return (
        <TableBody
            onClick={() => {
                setEditItem({ id: '', price: '', stock: '' });
                setState(true);
                setRemove(true);
            }}
        >
            {productItem
                ? productItem.map((item: any) => (
                      <TableRow
                          key={item.id}
                          style={{
                              opacity:
                                  removeItem[removeItem.findIndex((data) => item.id === data.id)]?.id === item.id
                                      ? 0.5
                                      : 1,
                          }}
                      >
                          <StyledTableCell padding="checkbox">
                              <Checkbox style={{ color: 'blue' }} />
                          </StyledTableCell>
                          <StyledTableCell style={{ maxWidth: 60 }}>{item.sku}</StyledTableCell>
                          <StyledTableCell>
                              <Link to={`/pages/products/product-detail/${item.id}`}>{item.name}</Link>
                          </StyledTableCell>
                          <StyledTableCell>{item.category}</StyledTableCell>

                          <StyledTableCell onClick={(event: any) => haderClick(event, item)}>
                              {item.id === editItem.id && !state ? (
                                  <InBootstrap
                                      classes="input-group"
                                      types="$"
                                      title={editItem.price}
                                      onChange={(event) => setEditItem({ ...editItem, price: event.target.value })}
                                  />
                              ) : (
                                  <Button classes="hover-btn">{numberFormat.format(item.price)}</Button>
                              )}
                          </StyledTableCell>

                          <StyledTableCell onClick={(event: any) => haderClick(event, item)}>
                              {item.id === editItem.id && !state ? (
                                  <InBootstrap
                                      types=""
                                      classes="input-group"
                                      title={editItem.stock}
                                      onChange={(event) => setEditItem({ ...editItem, stock: event.target.value })}
                                  />
                              ) : (
                                  <Button classes="hover-btn">{item.amount} </Button>
                              )}
                          </StyledTableCell>

                          <StyledTableCell style={{ maxWidth: 150 }}>
                              <Link to={`/pages/user/user-detail/${item.id}`}>{item.vendor}</Link>
                          </StyledTableCell>
                          <StyledTableCell>
                              {moment(item.arrivalDate).format('ll') !== 'Invalid date'
                                  ? moment(item.arrivalDate).format('ll')
                                  : '--'}
                          </StyledTableCell>
                          <StyledTableCell
                              onClick={(event: any) => {
                                  event.stopPropagation();
                                  setState(true);
                              }}
                          >
                              <Button
                                  title={<FontAwesomeIcon icon={faTrashCan} />}
                                  classes="btn-contant"
                                  onClick={() => DeleteItem(item)}
                              />
                          </StyledTableCell>
                      </TableRow>
                  ))
                : null}
        </TableBody>
    );
};

export default ProductItem;
