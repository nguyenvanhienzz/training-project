import { UserParams } from 'interface/Params/userParams';
import './ProductSearch.scss';

import SearchBottom from './SearchBottom';
import SearchTop from './SearchTop';
interface Props {
    setParamsUser?: any;
    paramsUser: UserParams;
    setTotalItem: (e: any) => void;
    handerChange: (event: any) => void;
    setPageCount: (e: any) => void;
    setUserItem: (e: any) => void;
}

const UserSearch = (props: Props) => {
    const { setTotalItem, handerChange, paramsUser, setPageCount, setParamsUser, setUserItem } = props;

    return (
        <div className="product-search">
            <SearchTop
                setUserItem={(e: any) => setUserItem(e)}
                setParamsUser={setParamsUser}
                paramsUser={paramsUser}
                handerChange={(event: any) => handerChange(event)}
                setTotalItem={setTotalItem}
                setPageCount={setPageCount}
            />
            <SearchBottom
                paramsUser={paramsUser}
                handerChange={(event: any) => handerChange(event)}
                setParamsUser={setParamsUser}
            />
        </div>
    );
};

export default UserSearch;
