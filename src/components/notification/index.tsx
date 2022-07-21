import Button from 'components/button';
import { EditTableProduct, productParams } from 'interface';
import { productlist } from 'pages/redux/productSlice';
import { useCallback } from 'react';
import { useAppDispatch } from 'redux/hook';
import productApi from 'services/product.service';
import './Notification.scss';
interface Props {
    title: string;
    onClick?: () => void;
    p?: string;
    confirmClick?: () => void;
}
const Notification = (props: Props) => {
    const { title, p, onClick, confirmClick } = props;

    return (
        <div className="noti-constant" onClick={onClick}>
            <div className="noti-content">
                <h4>{title}</h4>
                <div className="border-noti"></div>
                <div>
                    <span>{p}</span>
                </div>
                <div className="border-noti"></div>

                <div className="btn-noti">
                    <Button title="Yes" classes="btn-yes" onClick={confirmClick} />
                    <Button title="No" classes="btn-no" />
                </div>
            </div>
        </div>
    );
};

export default Notification;
