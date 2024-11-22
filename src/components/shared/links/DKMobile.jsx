import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const DKMobile = ({ to, label, disabled }) => {
    return (
        <li>
            <Link to={to} className={`text-gray-900 dark:text-white hover:underline ${disabled ? 'pointer-events-none opacity-50' : ''}`} aria-current="page">
                {label}
            </Link>
        </li>
    )
}

DKMobile.propTypes = {
    to: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};

export default DKMobile;
