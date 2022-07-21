import './SearchTop.scss';
import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hook';

import Button from 'components/button';
import Input from 'components/input';
import SelectPublic from 'components/selectPublic';
import { Category, productParams } from 'interface';
import productApi from 'services/product.service';

import { selectCategory } from 'pages/redux/categorySlice';
import { productlist } from 'pages/redux/productSlice';

interface Props {
    paramsProduct: productParams;
    setTotalItem: (item: any) => void;
    handerChange: (event: any) => void;
    setPageCount: (item: any) => void;
}
const SearchTop = (props: Props) => {
    const dispatch = useAppDispatch();
    const selectCategorys = useAppSelector(selectCategory); //goi tu redux
    const { paramsProduct, setTotalItem, handerChange, setPageCount } = props;
    //click vao nut search
    const haderSearch = useCallback(async () => {
        const valuesProduct = await productApi.getProduct(paramsProduct);
        dispatch(productlist(valuesProduct.data));
        setTotalItem(valuesProduct);
        setPageCount(valuesProduct);
    }, [paramsProduct]);
    //render category

    return (
        <div className="search-top">
            <Input
                placeholder="Search keywords"
                type="text"
                classes="search-name"
                name="search"
                onChange={(event: any) => handerChange(event)}
            />
            <SelectPublic
                title="Any category"
                classes="search-select"
                name="category"
                onChange={(event: any) => handerChange(event)}
                value="0"
            >
                {selectCategorys.map((item: Category) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
            </SelectPublic>
            <SelectPublic
                name="stock_status"
                title="Any stock status"
                classes="search-select"
                onChange={(event: any) => handerChange(event)}
                value="all"
            >
                <option value="in">In stock</option>
                <option value="low">Low stock</option>
                <option value="out">SOLD</option>
            </SelectPublic>
            <Button title="Search" classes="btn-contant" onClick={haderSearch} />
        </div>
    );
};

export default SearchTop;
