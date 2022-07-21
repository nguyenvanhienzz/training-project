import Header from 'Layouts/components/Header';
import Sidebar from 'Layouts/components/Sidebar';
import './DefaultLayout.scss';

const DefaultLayout = ({ children }: any) => {
    return (
        <div className="default-layout">
            <Header />
            <div className="contains">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};

export default DefaultLayout;
