import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, message } from 'antd';
import ClientesService from '../clientes/ClientesService';

const ClientAddressesModal = ({ visible, onClose, idCliente }) => {
    const [addresses, setAddresses] = useState([]);
    const clienteService = ClientesService();

    useEffect(() => {
        console.log(idCliente)
        const fetchAddresses = async () => {
            try {
                await clienteService.getAddresses(idCliente, setAddresses);
            } catch (error) {
                console.error('Error fetching addresses:', error);
                message.error('Error fetching addresses');
            }
        };

        if (visible) {
            fetchAddresses();
        }
    }, [visible, idCliente, clienteService]);

    const columns = [
        {
            title: 'Dirección 1',
            dataIndex: 'address1',
            key: 'address1',
        },
        {
            title: 'Dirección 2',
            dataIndex: 'address2',
            key: 'address2',
        },
        {
            title: 'Código Postal',
            dataIndex: 'postcode',
            key: 'postcode',
        },
        {
            title: 'Teléfono',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Teléfono Móvil',
            dataIndex: 'phone_mobile',
            key: 'phone_mobile',
        },

    ];

    return (
        <Modal
            visible={visible}
            title="Direcciones del Cliente"
            onCancel={onClose}
            footer={null}
        >
            <Table
                columns={columns}
                dataSource={addresses}
                rowKey="IDDireccion"
                pagination={false}
            />
        </Modal>
    );
};
ClientAddressesModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    idCliente: PropTypes.number.isRequired,
};


export default ClientAddressesModal;