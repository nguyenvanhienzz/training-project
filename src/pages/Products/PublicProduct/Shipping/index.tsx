import './Shipping.scss';

import { useState } from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';

import InBootstrap from 'components/inBootstrap';
import { selectShipping } from 'pages/redux/shippingSlice';
import { useAppSelector } from 'redux/hook';
import { showAllOnClick } from 'ultil/showAllOnClick';

interface Props {
    updateProduct: any;
    setUpdateProduct: (e: any) => void;
}
const Shipping = (props: Props) => {
    const { updateProduct, setUpdateProduct } = props;
    const selectShippings = useAppSelector(selectShipping);
    const [selectedOptions, setSelectedOptions] = useState();

    return (
        <>
            <div className="seperated-space"></div>
            <div className="shipping">
                <label>Shipping</label>
                <div className="flex-input">
                    <span className="price-span">Continental U.S *</span>
                    <div className="right-input ">
                        <InBootstrap
                            title={updateProduct.shipping_to_zones ? updateProduct.shipping_to_zones[0].price : ''}
                            types="$"
                            onChange={(e: any) =>
                                setUpdateProduct({
                                    ...updateProduct,
                                    shipping_to_zones: [
                                        {
                                            ...updateProduct.shipping_to_zones[0],
                                            price: e.target.value,
                                        },
                                    ],
                                })
                            }
                            placeholder="0.00"
                            classes="input-group ship-price"
                        />
                    </div>
                    <div className="contry-select">
                        <Typeahead
                            filterBy={showAllOnClick}
                            selected={selectedOptions ? selectedOptions : selectShippings.slice(0, 1)}
                            onChange={(e: any) => setSelectedOptions(e)}
                            labelKey="name"
                            id="contry"
                            placeholder="Type Categories name to select..."
                            className="add-product"
                            options={selectShippings}
                        />
                        <div className="text-add">Add Shipping Location</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Shipping;
