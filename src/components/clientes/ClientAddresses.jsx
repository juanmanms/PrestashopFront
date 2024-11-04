import { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import ClientesService from './ClientesService';
import CardAddress from './CardAddress';

const ClientAddresses = ({ id_cliente, setSelectedAddress }) => {

    const [addresses, setAddresses] = useState([]);
    const clientsService = useMemo(() => ClientesService(), []);

    useEffect(() => {
        clientsService.getAddresses(id_cliente, setAddresses);
    }, [id_cliente, clientsService]);

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
    };
    const handleClick = async () => {
        window.location.reload();
    }


    useEffect(() => {
        if (addresses.length > 0) {
            setSelectedAddress(addresses[0]);
        }
    }, [addresses]);

    return (
        <div>
            <h1>Direcciones</h1>
            {addresses.length < 1 ? (
                <div>
                    <p>Este cliente no tiene direcciones disponibles, recargar pedidp</p>
                    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 mt-3 rounded hover:bg-blue-600">
                        Seleciona otra cliente
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
                    {addresses.map((address, index) => (
                        <div key={address.id_address} style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="radio"
                                name="selectedAddress"
                                value={address.id_address}
                                checked={index === 0}
                                onChange={() => handleAddressSelect(address)}
                            />
                            <CardAddress {...address} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

ClientAddresses.propTypes = {
    id_cliente: PropTypes.number.isRequired,
    setSelectedAddress: PropTypes.func.isRequired,
}

export default ClientAddresses;
