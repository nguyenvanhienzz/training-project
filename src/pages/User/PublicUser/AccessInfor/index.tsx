import { useState } from 'react';
import { useParams } from 'react-router-dom';
import './AccessInfor.scss';
import AccessInforAdd from './AccessInforAdd';
import AccessInforUpdate from './AccessInforUpdate';
interface Props {
    value: any;
    setvalues: any;
    dataUpdate: any;
}
const AccessInformation = (props: Props) => {
    const { value, setvalues, dataUpdate } = props;
    const [check, setcheck] = useState(false);
    const { id }: any = useParams();

    return (
        <div className="access-infor">
            <div className="seperated-space"></div>
            <p>Access information</p>
            {id ? (
                <AccessInforUpdate value={value} setvalues={setvalues} dataUpdate={dataUpdate} />
            ) : (
                <AccessInforAdd value={value} setvalues={setvalues} />
            )}
        </div>
    );
};

export default AccessInformation;
