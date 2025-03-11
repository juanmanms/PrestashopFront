import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Table, message } from 'antd';
import OrdersService from './ordersService';

const ClientAddressesModal = ({ visible, onClose, idCliente }) => {
    const [addresses, setAddresses] = useState([]);
    const ordersService = OrdersService();

    useEffect(() => {
        console.log(idCliente)
        const fetchAddresses = async () => {
            try {
                const data = await ordersService.getAddresses(idCliente);
                setAddresses(data);
            } catch (error) {
                console.error('Error fetching addresses:', error);
                message.error('Error fetching addresses');
            }
        };

        if (visible) {
            fetchAddresses();
        }
    }, [visible, idCliente, ordersService]);

    const columns = [
        {
            title: 'ID Dirección',
            dataIndex: 'id_address',
            key: 'id_address',
        },
        {
            title: 'Alias',
            dataIndex: 'alias',
            key: 'alias',
        },
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
            title: 'Ciudad',
            dataIndex: 'city',
            key: 'city',
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
        {
            title: 'Otro',
            dataIndex: 'other',
            key: 'other',
        },
        {
            title: 'Fecha de Creación',
            dataIndex: 'date_add',
            key: 'date_add',
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