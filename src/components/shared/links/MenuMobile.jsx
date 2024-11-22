import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuMobile = ({ to, label, disabled, toggleMenu }) => {
    return (
        <li>
            <Link to={to} className={`text-gray-900 dark:text-white hover:underline ${disabled ? 'pointer-events-none opacity-50' : ''}`} onClick={toggleMenu}>{label}</Link>
        </li>
    )
}
MenuMobile.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    toggleMenu: PropTypes.func
};

export default MenuMobile