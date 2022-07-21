import { selectRoles } from 'pages/redux/roleSlice';
import { useState } from 'react';
import { useAppSelector } from 'redux/hook';
import '../AccessInfor.scss';
import { Checkbox, FormControl, ListItemText, MenuItem } from '@mui/material';
import { ListItem, Select } from '@material-ui/core';
interface Props {
    value: any;
    setvalues: any;
}
const AccessInforAdd = (props: Props) => {
    const { value, setvalues } = props;
    const [check, setcheck] = useState(false);
    const selectRole = useAppSelector(selectRoles); //goi tu redux
    console.log(value);
    if (value.access_level === '100') {
        value['role'] = ['1'];
    } else {
        delete value?.role;
    }
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

        selectRole.administrator.map((item) => {
            if (value.role.some((type: any) => item.id === type)) {
                nameTypes.push(item.name);
            }
        });
        return nameTypes.join(', ');
    };
    return (
        <>
            <div className="infor-select">
                <label>Access level *</label>
                <select
                    onChange={(e: any) => {
                        setvalues({ ...value, access_level: e.target.value });
                    }}
                >
                    <option value="10">Vendor</option>
                    <option value="100">Admin</option>
                </select>
            </div>
            {value.access_level === '100' ? (
                <FormControl>
                    <Select
                        name="role"
                        value={value.role}
                        multiple
                        displayEmpty
                        onChange={(e: any) => setvalues({ ...value, role: e.target.value })}
                        renderValue={showUserRole}
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {selectRole.administrator.map((item: any) => (
                            <ListItem value={item.id}>
                                <MenuItem value={item.id}>{item.title}</MenuItem>
                                <MenuItem value={item.id}>
                                    <Checkbox checked={value?.role.indexOf(item.id) > -1} />
                                    <ListItemText primary={item.name} />
                                </MenuItem>
                            </ListItem>
                        ))}
                    </Select>
                </FormControl>
            ) : (
                ''
            )}
            <div className="infor-select">
                <label>Membership</label>
                <select onChange={(e: any) => setvalues({ ...value, membership_id: e.target.value })}>
                    <option value="">Ignore Membership</option>
                    <option value="4">General</option>
                </select>
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

export default AccessInforAdd;
