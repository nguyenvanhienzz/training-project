import './ProductInfor.scss';
import { useRef, useState } from 'react';

import { Input } from 'reactstrap';
import { Typeahead } from 'react-bootstrap-typeahead';
import JoditEditor from 'jodit-react';
import { useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faXmark } from '@fortawesome/free-solid-svg-icons';

import { useAppSelector } from 'redux/hook';
import { selectVendor } from 'pages/redux/vendorsSlice';
import { ControlLabel, Switchs } from './Style';
import { selectBrands } from 'pages/redux/brandsSlice';
import { selectCategory } from 'pages/redux/categorySlice';
import { showAllOnClick } from 'ultil/showAllOnClick';

interface Props {
    updateProduct: any;
    setUpdateProduct: (e: any) => void;
}
const ProductInfor = (props: Props) => {
    const { id }: any = useParams();

    const { updateProduct, setUpdateProduct } = props;
    const [sku, setSku] = useState(Math.floor(1000000000000 + Math.random() * 9000000000000));
    const [toggled, setToggled] = useState(false);
    const selectVendors = useAppSelector(selectVendor);
    const selectBrand = useAppSelector(selectBrands);
    const selectCategorys = useAppSelector(selectCategory);
    const editor = useRef(null);
    const config = {
        buttons: ['bold', 'underline', 'italic', 'ul', 'ol', 'source'],
        buttonsXS: ['bold', 'underline', 'italic', 'ul', 'ol', 'source'],
        autofocus: true,
        cursorAfterAutofocus: 'end',
        showXPathInStatusbar: false,
        showCharsCounter: false,
        showWordsCounter: false,
        toolbarAdaptive: true,
        toolbarSticky: true,
        readonly: false,
        height: '200px',
        width: '100%',
        enableDragAndDropFileToEditor: true,
        style: {
            background: '#323259',
            color: '#fff',
        },
    };
    const imgHandler = async (e: any) => {
        // const img = URL.createObjectURL(e.target.files[0]);
        if (!updateProduct.imagesOrder.some((data: any) => e.target.files[0].name === data.name)) {
            setUpdateProduct({ ...updateProduct, imagesOrder: [...updateProduct.imagesOrder, e.target.files[0]] });
        }
    };
    //xoa anh
    const handerDeleteImg = (img: any) => {
        const index = updateProduct.imagesOrder.findIndex((data: any) => img === data);
        const newImg = updateProduct.imagesOrder;
        if (index >= 0) {
            newImg.splice(index, 1);
        }
        setUpdateProduct({ ...updateProduct, imagesOrder: [...newImg] });
    };
    return (
        <div className="product-infor">
            <form className="form-li">
                <div className="product-form">
                    <div className="flex-input">
                        <span className="vendor-span">Vendor *</span>
                        <Typeahead
                            selected={selectVendors.filter((item) => item.id === updateProduct?.vendor_id && item)}
                            labelKey="name"
                            id="vendor"
                            className="add-product"
                            minLength={2}
                            options={selectVendors}
                            placeholder="Type Vendor name to select..."
                            onChange={(e: any) => setUpdateProduct({ ...updateProduct, vendor_id: e[0].id })}
                        />
                    </div>
                    <div className="flex-input">
                        <span className="title-span">Product Title *</span>
                        <Input
                            value={updateProduct.name}
                            label="title"
                            name="title"
                            style={{ color: 'gray' }}
                            className="add-product"
                            placeholder="Type Title name to select..."
                            onChange={(e: any) => setUpdateProduct({ ...updateProduct, name: e.target.value })}
                        />
                    </div>

                    <div className="flex-input">
                        <span>Brand *</span>
                        <Typeahead
                            selected={selectBrand.filter((item: any) => item.id === updateProduct?.brand_id && item)}
                            filterBy={showAllOnClick}
                            id="brand"
                            placeholder="Type Brand name to select..."
                            className="add-product"
                            options={selectBrand}
                            labelKey="name"
                            onChange={(e: any) => setUpdateProduct({ ...updateProduct, brand_id: e[0].id })}
                        />
                    </div>

                    <div className="flex-input">
                        <span>SKU</span>
                        <Input
                            name="sku"
                            style={{ color: 'gray' }}
                            className="add-product"
                            value={updateProduct?.sku}
                            onChange={(e: any) => setUpdateProduct({ ...updateProduct, sku: e.target.value })}
                        />
                    </div>

                    <div className="flex-input">
                        <div className="text-des">
                            <span>Image *</span>

                            <div className="ul-item-img">
                                {updateProduct?.imagesOrder.length > 0
                                    ? updateProduct.imagesOrder.map((img: any, index: number) => (
                                          <div className="uploadfile" key={index}>
                                              {id ? (
                                                  <img src={img} className="img-upload" />
                                              ) : (
                                                  <img src={URL.createObjectURL(img)} className="img-uploads" />
                                              )}
                                              <FontAwesomeIcon
                                                  icon={faXmark}
                                                  className="icon-xmark"
                                                  onClick={() => handerDeleteImg(img)}
                                              />
                                          </div>
                                      ))
                                    : ''}

                                <label htmlFor="file">
                                    <Input
                                        multiple
                                        id="file"
                                        label="image"
                                        name="image"
                                        accept=".png, .jpg, .jpeg"
                                        type="file"
                                        onChange={(e: any) => imgHandler(e)}
                                    />
                                    <div className="icon-camera">
                                        <FontAwesomeIcon icon={faCamera} />
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="flex-input">
                        <span>Category *</span>
                        <Typeahead
                            id="category"
                            selected={selectCategorys.filter(
                                (item) =>
                                    updateProduct.categories.some((cate: any) => Number(item.id) === cate) && item,
                            )}
                            placeholder="Type Categories name to select..."
                            multiple
                            className="add-product"
                            options={selectCategorys}
                            labelKey="name"
                            onChange={(e: any) => {
                                setUpdateProduct({
                                    ...updateProduct,
                                    categories: [...updateProduct.categories, ...e.map((item: any) => Number(item.id))],
                                });
                            }}
                        />
                    </div>

                    <div className="flex-input">
                        <span>Description *</span>
                        <JoditEditor
                            config={config}
                            ref={editor}
                            value={updateProduct?.description}
                            onChange={(e) => setUpdateProduct({ ...updateProduct, description: e })}
                        />
                    </div>
                    <ControlLabel
                        label="Available for sale:"
                        control={
                            <Switchs
                                color="primary"
                                checked={!toggled}
                                onChange={(e) => setToggled(!e.target.checked)}
                            />
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default ProductInfor;
