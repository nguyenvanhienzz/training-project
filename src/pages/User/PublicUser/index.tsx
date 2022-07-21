import { useEffect, useState } from 'react';
import AccessInformation from './AccessInfor';
import AccountForm from './AccountForm';
import TaxInformation from './TaxInfor';
import './PublicUser.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import userApi from 'services/auth.service';
const PublicUser = () => {
    const { id }: any = useParams();
    const [dataUpdate, setDataUpdate] = useState<any>();
    const [value, setvalues] = useState<any>({
        access_level: '10',
        confirm_password: '',
        email: '',
        firstName: '',
        forceChangePassword: 0,
        lastName: '',
        membership_id: '',
        password: '',
        paymentRailsType: 'individual',
        taxExempt: 0,
    });
    useEffect(() => {
        const updateUser = async () => {
            const valueUpdate = await userApi.Updateuser({ id });
            setDataUpdate(valueUpdate.data);
            let keys: any = Object.keys(value);
            let valueDefault: any = {};
            keys.forEach((item: any) => {
                if (valueUpdate.data.info.hasOwnProperty(item)) {
                    valueDefault[item] = valueUpdate.data.info[item];
                }
            });
            if (valueDefault) {
                setvalues({ ...valueDefault });
            }
        };
        updateUser();
    }, [id]);
    return (
        <div className="public-user">
            <div className="title-close">
                <FontAwesomeIcon icon={faArrowLeft} className="icon-arrowleft" />
                {id ? <p>{dataUpdate?.info.email}</p> : <p>Create profile</p>}
            </div>

            <AccountForm value={value} setvalues={setvalues} />
            <AccessInformation value={value} setvalues={setvalues} dataUpdate={dataUpdate} />
            <TaxInformation value={value} setvalues={setvalues} />
        </div>
    );
};

export default PublicUser;
