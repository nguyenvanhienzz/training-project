import React from 'react';
import './Button.scss';
interface Props {
    title?: string | any;
    children?: React.ReactNode;
    classes?: string;
    onClick?: () => void;
    disabled?: boolean;
}
const Button = (props: Props) => {
    const { classes, onClick, title, children, disabled } = props;
    return (
        <button className={classes} onClick={onClick} disabled={disabled}>
            {children}
            {title}
        </button>
    );
};

export default Button;
