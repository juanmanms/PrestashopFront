import { useEffect, useState } from "react";
import { Select } from "antd";

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

                const carrierOptions = data.map((carrier) => ({
                    value: carrier.id_carrier,
                    label: carrier.name,
                }));
                setCarrier(carrierOptions)
                setIsDelivery(carrierOptions[0].value)
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


    return (
        <div>
            <h2 className="mb-1">Opciones de entrega</h2>
            {loading ? (
                <p>Cargando opciones de entrega...</p>
            ) : (
                <div>
                    {carrier ? (
                        <Select
                            defaultValue={isDelivery || carrier[0].value}
                            options={carrier}
                            onChange={(value) => {
                                setIsDelivery(value);
                            }}
                            style={{ width: 200 }}
                        />

                    ) : (
                        <p>No hay transportista disponible</p>
                    )}
                </div>
            )}
        </div>
    );
};
SelectDelivery.propTypes = {
    isDelivery: PropTypes,
    setIsDelivery: PropTypes.func.isRequired,
};

export default SelectDelivery;

