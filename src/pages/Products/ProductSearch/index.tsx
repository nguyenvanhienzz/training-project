import './ProductSearch.scss';

import { productParams } from 'interface';
import SearchBottom from './SearchBottom';
import SearchTop from './SearchTop';
interface Props {
    paramsProduct: productParams;
    setTotalItem: (e: any) => void;
    handerChange: (event: any) => void;
    setPageCount: (e: any) => void;
}
const ProductSearch = (props: Props) => {
    const { setTotalItem, handerChange, paramsProduct, setPageCount } = props;

    return (
        <div className="product-search">
            <SearchTop
                paramsProduct={paramsProduct}
                handerChange={(event: any) => handerChange(event)}
                setTotalItem={setTotalItem}
                setPageCount={setPageCount}
            />
            <SearchBottom paramsProduct={paramsProduct} handerChange={(event: any) => handerChange(event)} />
        </div>
    );
};

export default ProductSearch;
