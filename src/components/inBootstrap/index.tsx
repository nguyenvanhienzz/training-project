import React from 'react';

interface Props {
    types: string | React.ReactNode;
    title?: string | number | undefined;
    onChange: (e: any) => void;
    placeholder?: string;
    classes?: string;
    readOnly?: boolean;
}

const InBootstrap = (props: Props) => {
    const { title, onChange, types, placeholder, classes, readOnly } = props;
    return (
        <div className={classes}>
            <span className="input-group-text" id="basic-addon1">
                {types}
            </span>
            <input
                readOnly={readOnly}
                type="text"
                className="form-control"
                aria-describedby="basic-addon1"
                value={title}
                onChange={(e) => onChange(e)}
                placeholder={placeholder}
            />
        </div>
    );
};

export default InBootstrap;
