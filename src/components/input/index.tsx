import { title } from 'process';
import './Input.scss';
interface Props {
    placeholder?: string;
    type: string;
    title?: string;
    value?: string;
    classes?: string;
    onChange?: (e: any) => void;
    name?: string;
}

const Input = (props: Props) => {
    const { placeholder, type, value, classes, onChange, name, title } = props;

    return (
        <>
            <label className="lableinput">{title}</label>
            <input
                placeholder={placeholder}
                type={type}
                value={value}
                className={classes}
                onChange={onChange}
                name={name}
            />
        </>
    );
};

export default Input;
