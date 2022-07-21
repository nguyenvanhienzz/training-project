import { useState } from 'react';
import { Input } from 'reactstrap';
import { ControlLabel, Switchs } from '../ProductInfor/Style';
import './Marketing.scss';
interface Props {
    updateProduct: any;
    setUpdateProduct: (e: any) => void;
}
const Marketing = (props: Props) => {
    const [toggled, setToggled] = useState(false);
    const { updateProduct, setUpdateProduct } = props;

    const [selectMaketing, setSelectMaketing] = useState({
        metatag: '',
        metadescription: '',
    });
    return (
        <div className="marketing">
            <div className="seperated-space"></div>
            <div className="contanner-make">
                <p>Marketing</p>
                <div className="flex-input">
                    <text className="meta-span">Open Graph meta tags</text>
                    <div className="right-input ">
                        <select
                            value={selectMaketing.metatag}
                            onChange={(e: any) => setSelectMaketing({ ...selectMaketing, metatag: e.target.value })}
                        >
                            <option value="autogenrated">Autogenrated</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                <div className="textarea-input">
                    {selectMaketing.metatag === 'custom' ? (
                        <textarea
                            value={updateProduct.og_tags}
                            onChange={(e: any) => setUpdateProduct({ ...updateProduct, og_tags: e.target.value })}
                            spellCheck
                        ></textarea>
                    ) : (
                        ''
                    )}
                </div>
                <div className="flex-input">
                    <text className="description-span">Meta description</text>
                    <div className="right-input ">
                        <select
                            value={selectMaketing.metadescription}
                            onChange={(e: any) =>
                                setSelectMaketing({ ...selectMaketing, metadescription: e.target.value })
                            }
                        >
                            <option value="autogenrated">Autogenrated</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>
                </div>
                <div className="textarea-input">
                    {selectMaketing.metadescription === 'custom' ? (
                        <textarea
                            value={updateProduct.meta_description}
                            onChange={(e: any) =>
                                setUpdateProduct({ ...updateProduct, meta_description: e.target.value })
                            }
                            spellCheck
                        ></textarea>
                    ) : (
                        ''
                    )}
                </div>
                <div className="flex-input">
                    <text className="keywords-span">Meta keywords</text>
                    <div className="right-input ">
                        <Input
                            value={updateProduct?.meta_keywords}
                            onChange={(e: any) => setUpdateProduct({ ...updateProduct, meta_keywords: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex-input">
                    <text className="page-span">Product page title</text>
                    <div className="right-input ">
                        <Input
                            value={updateProduct?.product_page_title}
                            onChange={(e: any) =>
                                setUpdateProduct({ ...updateProduct, product_page_title: e.target.value })
                            }
                        />
                    </div>
                </div>
                <div className="flex-input">
                    <div className="right-input ">
                        <ControlLabel
                            label="Add to Facebook product feed"
                            control={
                                <Switchs
                                    color="primary"
                                    checked={!toggled}
                                    onChange={(e) => setToggled(!e.target.checked)}
                                />
                            }
                        />
                    </div>
                </div>
                <div className="flex-input">
                    <div className="right-input ">
                        <ControlLabel
                            label="Add to Google product feed"
                            control={
                                <Switchs
                                    color="primary"
                                    checked={!toggled}
                                    onChange={(e: any) => setToggled(!e.target.checked)}
                                />
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketing;
