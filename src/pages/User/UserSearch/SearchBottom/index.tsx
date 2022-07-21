import './SearchBottom.scss';

import { UserParams } from 'interface/Params/userParams';
import { FormControl, Select } from '@material-ui/core';
import { selectCountrys } from 'pages/redux/countrySlice';
import { useAppSelector } from 'redux/hook';
import { ListItemText, MenuItem } from '@mui/material';
import Tippy from '@tippyjs/react/headless';
import Calendar from 'react-calendar';
import { useState } from 'react';
import { defaultnumber } from 'ultil/defaultnumber';
import { Input as Inputs } from 'reactstrap';
import Input from 'components/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
interface Props {
    paramsUser: UserParams;
    handerChange: (event: any) => void;
    setParamsUser: any;
}
const SearchBottom = (props: Props) => {
    const { paramsUser, handerChange, setParamsUser } = props;
    const [disDate, setDisDate] = useState(false);
    const [showDate, setShowDate] = useState([]);
    const handerClick = () => setDisDate(false);
    const selectCountry = useAppSelector(selectCountrys); //goi tu redux
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

    return (
        <div className="search-bottom-user">
            <div className="search-block">
                <div className="flex-input">
                    <label>Country</label>
                    <FormControl>
                        <Select
                            name="country"
                            value={paramsUser.country}
                            displayEmpty
                            onChange={handerChange}
                            renderValue={() => {
                                let nameTypes: any = [];

                                if (paramsUser.country.length === 0) {
                                    return <em>Select country</em>;
                                }
                                selectCountry.filter((item) =>
                                    paramsUser.country === item.code ? nameTypes.push(item.country) : '',
                                );
                                return nameTypes;
                            }}
                            MenuProps={MenuProps}
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="">Select country</MenuItem>
                            {selectCountry.map((item) => (
                                <MenuItem value={item.code}>
                                    <ListItemText primary={item.country} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div className="flex-input">
                    <Input
                        name="state"
                        type="text"
                        title="State"
                        classes="search-vendor"
                        onChange={(event: any) => handerChange(event)}
                    />
                </div>
                <div className="flex-input">
                    <Input
                        title="Address"
                        name="address"
                        type="text"
                        classes="search-vendor"
                        onChange={(event: any) => handerChange(event)}
                    />
                </div>
                <div className="flex-input">
                    <Input
                        title="Phone"
                        name="phone"
                        type="text"
                        classes="search-vendor"
                        onChange={(event: any) => handerChange(event)}
                    />
                </div>
            </div>
            <div className="search-right-user">
                <li>
                    <div className="title-register">
                        <span className="title-pri">User activity</span>
                        <input type="radio" value="R" name="date_type" onChange={(e: any) => handerChange(e)} />
                        <span className="span-reg"> Register</span>
                        <input type="radio" value="L" name="date_type" onChange={(e: any) => handerChange(e)} />
                        <span> Last logged in</span>
                    </div>
                    <div className="flex-input">
                        <span className="span-li">
                            <Tippy
                                interactive={true}
                                visible={disDate}
                                placement="right"
                                onClickOutside={handerClick}
                                render={(attrs) => (
                                    <div className="calendar-container" tabIndex={-1} {...attrs}>
                                        {paramsUser ? (
                                            <Calendar
                                                selectRange={true}
                                                onChange={(e: any) => {
                                                    setShowDate(
                                                        e
                                                            .toString()
                                                            .split(',')
                                                            .map((item: any) => moment(new Date(item)).format('ll'))
                                                            .join('-'),
                                                    );
                                                    setParamsUser({
                                                        ...paramsUser,
                                                        date_range: e.map((item: any) =>
                                                            moment(new Date(item)).format('YYYY-MM-DD'),
                                                        ),
                                                    });
                                                }}
                                                value={
                                                    showDate.length > 0
                                                        ? [
                                                              new Date(paramsUser?.date_range[1]),
                                                              new Date(paramsUser?.date_range[0]),
                                                          ]
                                                        : new Date()
                                                }
                                                calendarType="US"
                                                locale="en"
                                            />
                                        ) : (
                                            ''
                                        )}
                                    </div>
                                )}
                            >
                                <div className="flex-input">
                                    <div className="right-input" onFocus={() => setDisDate(true)}>
                                        <Inputs
                                            multiple
                                            placeholder="Enter date range"
                                            classes="input-group input-date"
                                            types={<FontAwesomeIcon icon={faBoxOpen} className="icon-box" />}
                                            value={showDate.length > 0 ? showDate.toString() : ''}
                                            onChange={(e: any) => {
                                                setShowDate(e.target.value);
                                                setParamsUser({
                                                    ...paramsUser,
                                                    date_range: [],
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                            </Tippy>
                        </span>
                    </div>
                </li>
            </div>
        </div>
    );
};

export default SearchBottom;
