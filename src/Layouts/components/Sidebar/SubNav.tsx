import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SubNav = ({ item }: any) => {
    const [subNav, setSubnav] = useState(false);
    const showNav = () => {
        setSubnav(!subNav);
    };

    return (
        <div>
            <li className={item.cName} onClick={showNav}>
                <NavLink to={item.path}>
                    <div className="nav-primary">
                        <span>
                            <FontAwesomeIcon icon={item.icon} className="icon-sidebar" />
                            <span>{item.title}</span>
                        </span>
                        <FontAwesomeIcon icon={item.icon_down} className="icon-arrows" />
                    </div>
                    {subNav ? (
                        <div className="sub-nav">
                            {item.subNav.map((sub: any) => (
                                <li>
                                    <NavLink to={sub.path}>{sub.title}</NavLink>
                                </li>
                            ))}
                        </div>
                    ) : null}
                </NavLink>
            </li>
        </div>
    );
};

export default SubNav;
