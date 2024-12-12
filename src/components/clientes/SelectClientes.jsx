import { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Table, Input } from 'antd';


import ClientesService from './ClientesService';

const SelectClientes = ({ visible, onClose, setSelectedClient }) => {
    const [searchTerm, setSearchTerm] = useState('');


    const [clients, setClients] = useState([]);

    const clientsService = useMemo(() => ClientesService(), []);

    useEffect(() => {
        clientsService.getClients(setClients);
    }, [clientsService]);




    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.apellidos.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelect = () => {
        onClose();
    };

    return (
        <Modal
            width={800}
            title="Seleccionar Cliente"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Cancelar
                </Button>,
                <Button
                    key="select"
                    type="primary"
                    onClick={handleSelect}
                >
                    Seleccionar
                </Button>,
            ]}
        >
            <Input
                placeholder="Buscar cliente por nombre, apellido o correo"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                style={{ marginBottom: 16 }}
            />
            <Table
                dataSource={filteredClients}
                rowKey="id"
                columns={[
                    { title: 'Nombre', dataIndex: 'name', key: 'name' },
                    { title: 'Apellidos', dataIndex: 'apellidos', key: 'apellidos' },
                    { title: 'Email', dataIndex: 'email', key: 'email' },
                ]}
                rowSelection={{
                    type: 'radio',
                    onChange: (_, selectedRows) => setSelectedClient(selectedRows[0]),
                    onSelect: handleSelect
                }}
            />
        </Modal>
    );
};


SelectClientes.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    setSelectedClient: PropTypes.func,
};

export default SelectClientes;