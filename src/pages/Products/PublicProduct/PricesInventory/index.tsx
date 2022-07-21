import moment from 'moment';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { Input } from 'reactstrap';
import { useParams } from 'react-router-dom';
import Tippy from '@tippyjs/react/headless';

import './PricesInventory.scss';
import 'react-calendar/dist/Calendar.css';

import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InBootstrap from 'components/inBootstrap';
interface Props {
    updateProduct: any;
    setUpdateProduct: (e: any) => void;
}
const PricesInventory = (props: Props) => {
    const { updateProduct, setUpdateProduct } = props;

    // chi cho nhap so
    function validate(evt: any) {
        var theEvent = evt || window.event;

        // Handle paste
        if (theEvent.type === 'paste') {
            key = evt.clipboardData.getData('text/plain');
        } else {
            // Handle key press
            var key = theEvent.keyCode || theEvent.which;
            key = String.fromCharCode(key);
        }
        var regex = /[0-9]|\./;
        if (!regex.test(key)) {
            theEvent.returnValue = false;
            if (theEvent.preventDefault) theEvent.preventDefault();
        }
    }
    const [disDate, setDisDate] = useState(false);
    const handerClick = () => setDisDate(false);

    return (
        <>
            <div className="seperated-space"></div>
            <div className="price-inven">
                <label>Prices Inventory</label>
                <div className="input-price">
                    <div className="flex-input">
                        <text className="ships-span">Memberships</text>
                        <select className="right-input">
                            <option>General</option>
                        </select>
                    </div>
                    <div className="flex-input">
                        <text className="tax-span">Tax class</text>
                        <div className="right-input">
                            <span>Default</span>
                        </div>
                    </div>
                    <div className="flex-input">
                        <text className="price-span">Price *</text>
                        <div className="right-input">
                            <InBootstrap
                                title={updateProduct?.price}
                                types="$"
                                onChange={(e) => setUpdateProduct({ ...updateProduct, price: e.target.value })}
                                placeholder="0.00"
                                classes="input-group input-price"
                            />
                        </div>
                    </div>
                    <div className="flex-input">
                        <text className="dates-span">Arrival date</text>
                        <Tippy
                            interactive={true}
                            visible={disDate}
                            placement="right"
                            onClickOutside={handerClick}
                            render={(attrs) => (
                                <div className="calendar-container" tabIndex={-1} {...attrs}>
                                    {updateProduct ? (
                                        <Calendar
                                            onChange={(e: any) =>
                                                setUpdateProduct({
                                                    ...updateProduct,
                                                    arrival_date: new Date(e * 1000),
                                                })
                                            }
                                            value={
                                                updateProduct.arrival_date
                                                    ? new Date(updateProduct.arrival_date * 1000)
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
                            <div className="right-input" onFocus={() => setDisDate(true)}>
                                <InBootstrap
                                    readOnly={true}
                                    classes="input-group input-date"
                                    types={<FontAwesomeIcon icon={faBoxOpen} className="icon-box" />}
                                    title={
                                        updateProduct?.arrival_date
                                            ? moment(new Date(updateProduct?.arrival_date * 1000)).format('YYYY-MM-DD')
                                            : moment(new Date()).format('YYYY-MM-DD')
                                    }
                                    onChange={(e) => console.log(e)}
                                />
                            </div>
                        </Tippy>
                    </div>
                    <div className="flex-input">
                        <text className="instock-span">Quantity in stock *</text>
                        <div className="right-input">
                            <Input
                                type="text"
                                onKeyPress={(event) => validate(event)}
                                value={updateProduct?.quantity}
                                onChange={(e) => setUpdateProduct({ ...updateProduct, quantity: e.target.value })}
                                className="input-instock "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PricesInventory;
