import './SearchTop.scss';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';

import Button from 'components/button';
import Input from 'components/input';

import { productlist } from 'pages/redux/productSlice';
import userApi from 'services/auth.service';
import { UserParams } from 'interface/Params/userParams';
import { selectCountrys } from 'pages/redux/countrySlice';
import { selectRoles } from 'pages/redux/roleSlice';
import { Checkbox, FormControl, ListItemText, MenuItem } from '@mui/material';
import { ListItem, Select } from '@material-ui/core';

interface Props {
    setParamsUser?: any;
    paramsUser: UserParams;
    setUserItem: (e: any) => void;
    setTotalItem: (item: any) => void;
    handerChange: (event: any) => void;
    setPageCount: (item: any) => void;
}

const SearchTop = (props: Props) => {
    const selectRole = useAppSelector(selectRoles); //goi tu redux
    const { paramsUser, setTotalItem, handerChange, setPageCount, setParamsUser, setUserItem } = props;
    const confirmPage = async () => {
        const valuesUser = await userApi.Getuser(paramsUser);
        setUserItem(valuesUser.data);
        setPageCount(valuesUser);
        setTotalItem(valuesUser);
    };
    //click vao nut search
    const haderSearch = async () => {
        confirmPage();
    };

    //render category
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

    const showUserTypes = () => {
        const showValue = [...selectRole.administrator, ...selectRole.customer];
        let nameTypes: any = [];
        if (paramsUser.types.length === 0) {
            return <em>All memberships</em>;
        }
        showValue.map((item) => {
            if (paramsUser.types.some((type) => item.id === type)) {
                nameTypes.push(item.name);
            }
        });
        return nameTypes.join(', ');
    };

    const Memberships = [
        {
            id: 'M_4',
            title: 'Memberships',
            value: 'General',
        },
        {
            id: 'P_4',
            title: 'Pendding Memberships',
            value: 'General',
        },
    ];
    const showUserMemberships = () => {
        var nameTypes: any = [];
        if (paramsUser.memberships.length === 0) {
            return <em>All user types</em>;
        }
        Memberships.map((item) => {
            if (paramsUser.memberships.some((type) => item.id === type)) {
                nameTypes.push(item.value);
            }
        });
        return nameTypes.join(', ');
    };
    const Userstatus = [
        {
            id: 'E',
            value: 'Enable',
        },
        {
            id: 'D',
            value: 'Disable',
        },
        {
            id: 'U',
            value: 'Unapproved vendor',
        },
    ];
    const showUserstatus = () => {
        var nameTypes: any = [];
        if (paramsUser.status.length === 0) {
            return <em>Any status</em>;
        }
        Userstatus.map((item) => {
            if (paramsUser.status.some((type) => item.id === type)) {
                nameTypes.push(item.value);
            }
        });
        return nameTypes.join(', ');
    };
    return (
        <div className="search-top">
            <Input
                placeholder="Search keywords"
                type="text"
                classes="search-name"
                name="search"
                onChange={(event: any) => handerChange(event)}
            />

            <FormControl>
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
                    {Memberships.map((item) => (
                        <ListItem value={item.id}>
                            <MenuItem value={item.id}>{item.title}</MenuItem>
                            <MenuItem value={item.id}>
                                <Checkbox checked={paramsUser.memberships.indexOf(item.id) > -1} />
                                <ListItemText primary={item.value} />
                            </MenuItem>
                        </ListItem>
                    ))}
                </Select>
            </FormControl>

            <FormControl>
                <Select
                    name="types"
                    value={paramsUser.types}
                    multiple
                    displayEmpty
                    onChange={handerChange}
                    renderValue={showUserTypes}
                    MenuProps={MenuProps}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem>Memberships</MenuItem>
                    {selectRole.administrator.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                            <Checkbox checked={paramsUser.types.indexOf(item.id) > -1} />
                            <ListItemText primary={item.name} />
                        </MenuItem>
                    ))}
                    <MenuItem>Pendding Memberships</MenuItem>
                    {selectRole.customer.map((customer) => (
                        <MenuItem key={customer.id} value={customer.id}>
                            <Checkbox checked={paramsUser.types.indexOf(customer.id) > -1} />
                            <ListItemText primary={customer.name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {
                <FormControl>
                    <Select
                        name="status"
                        value={paramsUser.status}
                        onChange={(e) => setParamsUser({ ...paramsUser, status: [e.target.value] })}
                        renderValue={showUserstatus}
                        displayEmpty
                        MenuProps={MenuProps}
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        {Userstatus.map((item) => (
                            <MenuItem value={item.id}>
                                <ListItemText primary={item.value} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            }
            <Button title="Search" classes="btn-contant" onClick={haderSearch} />
        </div>
    );
};

export default SearchTop;
