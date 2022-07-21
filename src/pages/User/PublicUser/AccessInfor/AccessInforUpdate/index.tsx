import { Checkbox, FormControl, ListItemText, MenuItem } from '@mui/material';
import { ListItem, Select } from '@material-ui/core';
import { useState } from 'react';
import '../AccessInfor.scss';

interface Props {
    value: any;
    setvalues: any;
    dataUpdate: any;
}

const AccessInforUpdate = (props: Props) => {
    const { value, setvalues, dataUpdate } = props;
    const [check, setcheck] = useState(false);

    return (
        <>
            <div className="infor-select">
                <label>Access level *</label>
                {value.access_level === '100' ? <span>Administrator</span> : <span>Vendor</span>}
            </div>
            {/* <FormControl>
                <Select
                    name="memberships"
                    value={paramsUser.memberships}
                    multiple
                    displayEmpty
                    onChange={handerChange}
                    renderValue={showUserMemberships}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {dataUpdate.account_roles.map((item: any) => (
                        <ListItem value={item.id}>
                            <MenuItem value={item.id}>{item.title}</MenuItem>
                            <MenuItem value={item.id}>
                                {/* <Checkbox checked={value.memberships.indexOf(item.id) > -1} /> */}
            {/* <ListItemText primary={item.value} />
                            </MenuItem>
                        </ListItem>
                    ))}
                </Select>
            </FormControl> */}
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

export default AccessInforUpdate;
