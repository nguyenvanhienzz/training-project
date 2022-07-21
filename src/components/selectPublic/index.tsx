import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ReactNode } from 'react';
import './SelectPublic.scss';
interface Props {
    title?: string;
    children: ReactNode;
    classes?: string;
    value?: any;
    onChange?: (event: any) => void;
    name: string;
    label?: string;
    placeholder?: string;
    multiple?: boolean;
}
const SelectPublic = (props: Props) => {
    const { title, children, classes, onChange, placeholder, value, name, label, multiple } = props;
    return (
        <form>
            <label className="label-select">{label}</label>
            <select name={name} className={classes} onChange={onChange} required multiple={multiple}>
                <option value={value} disabled selected>
                    {title}
                </option>
                {children}
            </select>
            <br />
        </form>
    );
};

export default SelectPublic;
