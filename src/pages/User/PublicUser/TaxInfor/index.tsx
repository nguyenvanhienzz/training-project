import { useState } from 'react';
import './Taxinfor.scss';
interface Props {
    value: any;
    setvalues: any;
}
const TaxInformation = (props: Props) => {
    const { value, setvalues } = props;
    const [check, setcheck] = useState(false);
    console.log(value);
    return (
        <div className="tax-infor">
            <div className="seperated-space"></div>
            <p>Tax information</p>
            <div className="flex-tax">
                <label>Tax exempt</label>
                <input
                    type="checkbox"
                    value={value.taxExempt}
                    checked={value.taxExempt === 1 ? true : false}
                    onChange={(e: any) => {
                        setcheck(!check);
                        setvalues({ ...value, taxExempt: Number(e.target.value) });
                    }}
                />
            </div>
        </div>
    );
};

export default TaxInformation;
