import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/button';
import _ from 'lodash';
import moment from 'moment';
import Marketing from 'pages/Products/PublicProduct/Marketing';
import PricesInventory from 'pages/Products/PublicProduct/PricesInventory';
import ProductInfor from 'pages/Products/PublicProduct/ProductInfor';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import productApi from 'services/product.service';

import './PublicProduct.scss';
import Shipping from './Shipping';
const PublicProduct = () => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const [updateProduct, setUpdateProduct] = useState<any>({
        vendor_id: '',
        name: '',
        brand_id: '',
        condition_id: '',
        categories: [],
        description: '',
        enabled: 0,
        memberships: [],
        shipping_to_zones: [{ id: 1, price: '' }],
        tax_exempt: 0,
        price: '',
        sale_price_type: '$',
        arrival_date: '',
        inventory_tracking: 0,
        quantity: '',
        sku: '',
        participate_sale: 0,
        sale_price: '',
        og_tags_type: '',
        og_tags: '',
        meta_desc_type: '',
        meta_description: '',
        meta_keywords: '',
        product_page_title: '',
        facebook_marketing_enabled: 0,
        google_feed_enabled: 0,
        imagesOrder: [],
        deleted_images: [],
    });

    useEffect(() => {
        // if (id) {
        const haderUpdates = async () => {
            const itemProduct = await productApi.updateProduct({ id });
            let keys: any = Object.keys(updateProduct);
            let valueDefault: any = {};
            keys.forEach((item: any) => {
                if (itemProduct.data.hasOwnProperty(item)) {
                    valueDefault[item] = itemProduct.data[item];
                }
            });
            if (valueDefault) {
                setUpdateProduct({
                    ...valueDefault,
                    id: itemProduct.data.id,
                    price: itemProduct.data.price ? parseFloat(itemProduct.data.price).toFixed(2) : '0.00',
                    categories: [...itemProduct.data.categories.map((item: any) => Number(item.category_id))],
                    imagesOrder: [...itemProduct.data.images.map((item: any) => item.file)],
                    shipping_to_zones: [
                        {
                            id: itemProduct.data.shipping[0].id,
                            price: parseFloat(itemProduct.data.shipping[0].price).toFixed(2),
                        },
                    ],
                });
            }
        };
        haderUpdates();
        // }
    }, [id]);

    //post item product
    const haderAddProduct = async () => {
        const formData = new FormData();
        const ImgData = new FormData();
        const postData = JSON.stringify(updateProduct);
        formData.append('productDetail', postData);
        const value = await productApi.addProduct(formData);
        ImgData.append('productId', `${Number(value.data)}`);
        ImgData.append('order', '0');
        updateProduct.imagesOrder.map((item: any) => {
            ImgData.append('images[]', item);
        });
        await productApi.updateImg(ImgData);
        await productApi.updateProduct({ id: value.data });
        navigate(`/pages/products/product-detail/${value.data}`);
    };
    const haderUpdateProduct = async () => {
        const formData = new FormData();
        const ImgData = new FormData();
        const postData = JSON.stringify(updateProduct);
        formData.append('productDetail', postData);
        const value = await productApi.addProduct(formData);
        ImgData.append('productId', `${Number(value.data)}`);
        ImgData.append('order', '0');
        updateProduct.imagesOrder.map((item: any) => {
            ImgData.append('images[]', item);
        });
        await productApi.updateImg(ImgData);
        await productApi.updateProduct({ id: value.data });
        navigate(`/pages/products`);
    };

    return (
        <div className="public-product">
            <div className="title-close">
                <FontAwesomeIcon icon={faArrowLeft} className="icon-arrowleft" />
                {id ? <p>{updateProduct.name}</p> : <p>Add Product</p>}
            </div>
            <div className="product-additem">
                <ProductInfor updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
                <PricesInventory updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
                <Shipping updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
                <Marketing updateProduct={updateProduct} setUpdateProduct={setUpdateProduct} />
                <div className="flex-bottom">
                    {id ? (
                        <Button title="Update Product" classes="btn-save" onClick={haderUpdateProduct} />
                    ) : (
                        <Button title="Add Product" classes="btn-save" onClick={haderAddProduct} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicProduct;
