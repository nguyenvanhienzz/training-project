import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faUser, faBell } from '@fortawesome/free-regular-svg-icons';
import './Header.scss';
const Header = () => {
    return (
        <div className="header">
            <div className="header-left">
                <FontAwesomeIcon icon={faBars} className="icon-bar" />
                <p>
                    Gear Focus Admin
                    <span>
                        <FontAwesomeIcon icon={faBell} className="icon-nofi" />
                    </span>
                </p>
            </div>
            <div className="header-right">
                <FontAwesomeIcon icon={faUser} />
            </div>
        </div>
    );
};

export default Header;
