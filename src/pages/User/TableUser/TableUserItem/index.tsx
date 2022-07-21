import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';

import Button from 'components/button';
import './UserItem.scss';
import { RemoveTableUser, UserTable } from 'interface';
import { Checkbox, TableBody, TableRow } from '@material-ui/core';
import { StyledTableCell } from '../../TableUser/Style';

interface Props {
    setState: any;
    state: boolean;
    setRemove: any;
    remove: boolean;
    removeItem: RemoveTableUser[];
    setRemoveItem: any;
    userItem: UserTable[];
    upload: any;
}
const UserItem = (props: Props) => {
    const { setState, setRemove, removeItem, setRemoveItem, userItem, upload } = props;
    //onclick icon remove item=[{id,delete}]
    const DeleteItem = (item: UserTable) => {
        //kiêm tra xem mang phan tu da ton tai hay chưa
        if (!removeItem.some((data) => item.profile_id === data.id)) {
            setRemoveItem([...removeItem, { id: item.profile_id, delete: 1 }]);
            setState(false);
            setRemove(false);
        } else {
            //tim id de xoa
            const index = removeItem.findIndex((data) => item.profile_id === data.id);
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
        <TableBody>
            {userItem
                ? userItem.map((item: any) => (
                      <TableRow
                          key={item.profile_id}
                          style={{
                              opacity:
                                  removeItem[removeItem.findIndex((data) => item.profile_id === data.id)]?.id ===
                                  item.profile_id
                                      ? 0.5
                                      : 1,
                          }}
                      >
                          <StyledTableCell padding="checkbox">
                              <Checkbox style={{ color: 'blue' }} />
                          </StyledTableCell>
                          <StyledTableCell style={{ width: 300 }}>
                              <Link to={`/pages/user/user-detail/${item.profile_id}`}>{item.vendor}</Link>
                              <br />
                              <span>{item.storeName}</span>
                          </StyledTableCell>
                          <StyledTableCell style={{ width: 300 }}>
                              <Link to="">
                                  {item.fistName} {item.lastName}
                              </Link>
                          </StyledTableCell>
                          <StyledTableCell>{item.access_level}</StyledTableCell>

                          <StyledTableCell>{item.product}</StyledTableCell>

                          <StyledTableCell>{item.order.order_as_buyer}</StyledTableCell>

                          <StyledTableCell style={{ maxWidth: 150 }}>
                              <Link to="">{item.wishlist}</Link>
                          </StyledTableCell>
                          <StyledTableCell>{moment(Number(item.created)).format('lll')}</StyledTableCell>
                          <StyledTableCell>{moment(Number(item.last_login)).format('lll')}</StyledTableCell>
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

export default UserItem;
