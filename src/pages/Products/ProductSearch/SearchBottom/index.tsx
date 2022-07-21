import './SearchBottom.scss';

import Input from 'components/input';
import SelectPublic from 'components/selectPublic';
import { productParams } from 'interface';

interface Props {
    paramsProduct: productParams;
    handerChange: (event: any) => void;
}
const SearchBottom = (props: Props) => {
    const { paramsProduct, handerChange } = props;
    return (
        <div className="search-bottom">
            <li>
                Search in:
                <span className="span-li">
                    <Input type="checkbox" value="Name" />
                    <span> Name</span>
                    <br />
                    <Input type="checkbox" value="SKU" />
                    <span> SKU</span>
                    <br />
                    <Input type="checkbox" value="Full Description" />
                    <span> Full Description</span>
                </span>
            </li>
            <li>
                Availability:
                <span className="span-li">
                    <SelectPublic
                        name="availability"
                        title="Any availability status"
                        classes="search-select"
                        onChange={(event: any) => handerChange(event)}
                        value="all"
                    >
                        <option value="1"> Only enabled</option>
                        <option value="0"> Only disabled</option>
                    </SelectPublic>
                </span>
            </li>
            <li>
                Vendor:
                <span className="span-li">
                    <Input
                        name="vendor"
                        type="text"
                        classes="search-vendor"
                        onChange={(event: any) => handerChange(event)}
                    />
                </span>
            </li>
        </div>
    );
};

export default SearchBottom;
