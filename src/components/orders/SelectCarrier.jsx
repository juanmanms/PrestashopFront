import { Switch } from "antd";
import PropTypes from 'prop-types';

const SelectDelivery = ({ isDelivery, setIsDelivery }) => {
    const handleSwitchChange = (checked) => {
        setIsDelivery(checked);
    };

    return (
        <div className="w-full max-w-sm p-6 space-y-6 bg-card rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center">Opciones de entrega</h2>
            <div className="flex items-center justify-between">
                <p htmlFor="delivery-option" className="text-lg cursor-pointer">
                    {isDelivery ? "Envío a domicilio" : "Recogida en mercado"}
                </p>
                <Switch
                    id="delivery-option"
                    checked={isDelivery}
                    onChange={handleSwitchChange}
                    aria-label="Cambiar entre recogida en tienda y envío a domicilio"
                    checkedChildren="🚚"
                    unCheckedChildren="📍"
                />
            </div>
        </div>
    );
};
SelectDelivery.propTypes = {
    isDelivery: PropTypes.bool.isRequired,
    setIsDelivery: PropTypes.func.isRequired,
};

export default SelectDelivery;

