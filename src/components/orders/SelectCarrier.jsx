import { useEffect, useState } from "react";
import { Switch } from "antd";
import PropTypes from 'prop-types';
import DeliveryService from '../../common/service/deliveryService';

const SelectDelivery = ({ isDelivery, setIsDelivery }) => {
    const deliveryService = DeliveryService();
    const [carrier, setCarrier] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarriers = async () => {
            try {
                const data = await deliveryService.getCarriers();
                setCarrier(data);
            } catch (error) {
                //message.error('Error fetching carriers');
                console.error('Error fetching carriers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarriers();
        if (Array.isArray(carrier) && carrier.length > 1) {
            console.log('fetchCarriers', carrier);
        }
    }, []);

    const handleSwitchChange = (checked) => {
        setIsDelivery(checked);
    };

    return (
        <div>
            {loading ? (
                <p>Cargando opciones de entrega...</p>
            ) : (
                <div>
                    {carrier ? (
                        <>
                            <h2>Opciones de entrega</h2>
                            <Switch
                                id="delivery-option"
                                checked={isDelivery}
                                onChange={handleSwitchChange}
                                aria-label="Cambiar entre recogida en tienda y envío a domicilio"
                                checkedChildren="🚚"
                                unCheckedChildren="📍"
                                disabled={carrier.length <= 1}
                            />
                            <p>{isDelivery ? 'Entrega a domicilio' : 'Recogida en tienda'}</p>
                        </>
                    ) : (
                        <p>No carriers available</p>
                    )}
                </div>
            )}
        </div>
    );
};
SelectDelivery.propTypes = {
    isDelivery: PropTypes.bool.isRequired,
    setIsDelivery: PropTypes.func.isRequired,
};

export default SelectDelivery;

