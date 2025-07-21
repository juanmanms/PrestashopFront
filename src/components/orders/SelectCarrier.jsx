import { useEffect, useState, useMemo } from "react";
import { Select } from "antd";
import PropTypes from 'prop-types';
import DeliveryService from '../../common/service/deliveryService';

const SelectDelivery = ({ isDelivery, setIsDelivery }) => {
    const deliveryService = useMemo(() => DeliveryService(), []); // Usar useMemo para evitar crear nuevas instancias
    const [carrierOptions, setCarrierOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCarriers = async () => {
            try {
                const data = await deliveryService.getCarriers();

                const options = data.map((carrier) => ({
                    value: carrier.id_carrier,
                    label: carrier.name,
                }));
                setCarrierOptions(options);

                // Find the carrier with name "Servici domicili"
                const serviciDomicili = data.find(carrier => carrier.name === "Servici domicili");
                if (serviciDomicili) {
                    setIsDelivery(serviciDomicili.id_carrier);
                } else if (options.length > 0) {
                    setIsDelivery(options[0].value); // Fallback to the first carrier if "Servici domicili" is not found
                }
            } catch (error) {
                console.error('Error fetching carriers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCarriers();

    }, [deliveryService, setIsDelivery]); // Ahora deliveryService será estable


    return (
        <div>
            <h2 className="mb-1">Opciones de entrega</h2>
            {loading ? (
                <p>Cargando opciones de entrega...</p>
            ) : (
                <div>
                    {carrierOptions.length > 0 ? (
                        <Select
                            defaultValue={isDelivery}
                            options={carrierOptions}
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
    isDelivery: PropTypes.number,
    setIsDelivery: PropTypes.func.isRequired,
};

export default SelectDelivery;

