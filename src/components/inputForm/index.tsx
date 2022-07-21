import './inputForm.scss';
import { FormGroup, Input, InputProps } from 'reactstrap';
import React, { Children } from 'react';
interface IInputForm extends InputProps {
    // field: any;
    meta: any;
    children: React.ReactNode;
}

interface IErrorMessage {
    meta: any;
}
const InputForm = (props: IInputForm) => {
    const { field, meta, children } = props;
    return (
        <div className="input-form">
            <FormGroup>
                {children}
                {/* <Input {...field} {...props} /> */}
                <ErrorMessage meta={meta} />
            </FormGroup>
        </div>
    );
};
const ErrorMessage = ({ meta }: IErrorMessage) => {
    return meta.touched && meta.error && <div className="error-validate">{meta.error}</div>;
};
export default InputForm;
