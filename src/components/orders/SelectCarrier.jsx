import { Switch } from "antd";
import PropTypes from 'prop-types';

const SelectDelivery = ({ isDelivery, setIsDelivery }) => {
    const handleSwitchChange = (checked) => {
        setIsDelivery(checked);
    };

    return (
        <div>
            <h2>Opciones de entrega</h2>
            <Switch
                id="delivery-option"
                checked={isDelivery}
                onChange={handleSwitchChange}
                aria-label="Cambiar entre recogida en tienda y envío a domicilio"
                checkedChildren="🚚"
                unCheckedChildren="📍"
            />
        </div>
    );
};
SelectDelivery.propTypes = {
    isDelivery: PropTypes.bool.isRequired,
    setIsDelivery: PropTypes.func.isRequired,
};

export default SelectDelivery;

