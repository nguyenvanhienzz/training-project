import { Checkbox, FormControl, ListItemText, MenuItem } from '@mui/material';
import { ListItem, Select } from '@material-ui/core';
import { useState } from 'react';
import '../AccessInfor.scss';
import { selectRoles } from 'pages/redux/roleSlice';
import { useAppSelector } from 'redux/hook';

interface Props {
    value: any;
    setvalues: any;
    dataUpdate: any;
}

const AccessInforUpdate = (props: Props) => {
    const { value, setvalues, dataUpdate } = props;
    const [check, setcheck] = useState(false);
    const selectRole = useAppSelector(selectRoles); //goi tu redux

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 220,
                border: 'none',
                fontSize: 14,
            },
        },
    };
    const showUserRole = () => {
        var nameTypes: any = [];
        selectRole.administrator.map((item: any) => {
            if (value?.role?.some((type: any) => item.id === type)) {
                nameTypes.push(item.name);
            }
        });
        return nameTypes.join(', ');
    };

    return (
        <>
            <div className="infor-select">
                <label>Access level *</label>
                {value.access_level === '100' ? <span>Administrator</span> : <span>Vendor</span>}
            </div>
            <div className="infor-select">
                <label>Roles</label>

                {value.access_level === '100' ? (
                    <FormControl>
                        <Select
                            name="role"
                            value={value?.role}
                            multiple
                            displayEmpty
                            onChange={(e: any) => setvalues({ ...value, role: [...e.target.value] })}
                            renderValue={showUserRole}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            {dataUpdate.account_roles.map((item: any) => (
                                <ListItem value={item.id}>
                                    <MenuItem value={item.id}>{item.title}</MenuItem>
                                    <MenuItem value={item.id}>
                                        <Checkbox checked={value?.role?.indexOf(item.id) > -1} />
                                        <ListItemText primary={item.name} />
                                    </MenuItem>
                                </ListItem>
                            ))}
                        </Select>
                    </FormControl>
                ) : (
                    ''
                )}
            </div>

            <div className="infor-select">
                <label>Account status *</label>
                <select onChange={(e: any) => setvalues({ ...value, membership_id: e.target.value })}>
                    <option value="">Ignore Membership</option>
                    <option value="4">General</option>
                </select>
            </div>
            <div className="infor-select">
                <label>Status comment (reason)</label>
                <textarea></textarea>
            </div>
            <div className="infor-select">
                <label>Membership</label>
                <select onChange={(e: any) => setvalues({ ...value, membership_id: e.target.value })}>
                    <option value="">Ignore Membership</option>
                    <option value="4">General</option>
                </select>
            </div>
            <div className="infor-select">
                <label>Pending membership</label>
                <p>none</p>
            </div>
            <div className="infor-select">
                <label>Require to change password on next log in</label>
                <input
                    type="checkbox"
                    value={!check ? 1 : 0}
                    checked={check}
                    onChange={(e: any) => {
                        setcheck(!check);
                        setvalues({ ...value, forceChangePassword: Number(e.target.value) });
                    }}
                />
            </div>
        </>
    );
};

export default AccessInforUpdate;
