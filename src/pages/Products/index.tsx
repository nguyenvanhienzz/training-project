import './Product.scss';

import Button from 'components/button';
import ProductSearch from './ProductSearch';
import TableProduct from './TableProduct';
import { useState } from 'react';
import { productParams } from 'interface';
import { Link } from 'react-router-dom';

const Products = () => {
    const [paramsProduct, setParamsProduct] = useState<productParams>({
        availability: 'all',
        category: '0',
        count: 10,
        order_by: 'ASC',
        page: 1,
        search: '',
        search_type: '',
        sort: 'name',
        stock_status: 'all',
        vendor: '',
    });

    //phan trang
    const [pageCount, setPageCount] = useState<number>(1);
    //tong san pham trong product
    const [TotalItem, setTotalItem] = useState<number>(0);
    //hanh dong click vao tran trang

    const handerChange = (event: any) => {
        setParamsProduct({ ...paramsProduct, [event.target.name]: event.target.value });
    };

    return (
        <div className="products">
            <div className="product-item">
                <p>Products</p>
                <ProductSearch
                    paramsProduct={paramsProduct}
                    handerChange={handerChange}
                    setTotalItem={(item: any) => setTotalItem(item.recordsTotal)}
                    setPageCount={(item: any) =>
                        setPageCount(Math.ceil(Number(item.recordsTotal) / paramsProduct.count))
                    }
                />
                <Link to="/pages/products/new-product">
                    <Button title="Add Products" classes="btn-add" />
                </Link>
                <TableProduct
                    handlePageClick={(event: any) => {
                        setParamsProduct({ ...paramsProduct, page: event.selected + 1 });
                    }}
                    setParamsProduct={(event: any) => setParamsProduct(event)}
                    paramsProduct={paramsProduct}
                    pageCount={pageCount}
                    TotalItem={TotalItem}
                    setTotalItem={(item: any) => setTotalItem(item.recordsTotal)}
                    setPageCount={(item: any) =>
                        setPageCount(Math.ceil(Number(item.recordsTotal) / paramsProduct.count))
                    }
                    handerSortItem={(event) => setParamsProduct(event)}
                    handerChange={handerChange}
                />
            </div>
        </div>
    );
};

export default Products;
