import './Sidebar.scss';
import { SidebarData } from './SidebarData';
import SubNav from './SubNav';

const Sidebar = () => {
    return (
        <nav>
            <ul>
                {SidebarData.map((item, index) => (
                    <SubNav item={item} key={index} />
                ))}
            </ul>
        </nav>
    );
};

export default Sidebar;
