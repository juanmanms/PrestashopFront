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

    return (
        <div>
            <h1>Direcciones</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>

                {addresses.map((address) => (
                    <div key={address.id_address} style={{ display: 'flex', alignItems: 'center' }}>
                        <input
                            type="radio"
                            name="selectedAddress"
                            value={address.id_address}
                            onChange={() => handleAddressSelect(address)}
                        />
                        <CardAddress {...address} />
                    </div>
                ))}
            </div>
        </div>
    )
}

ClientAddresses.propTypes = {
    id_cliente: PropTypes.number.isRequired,
    setSelectedAddress: PropTypes.func.isRequired,
}

export default ClientAddresses;
