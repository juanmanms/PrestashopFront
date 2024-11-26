import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrdersService from './ordersService';
import { Table } from 'antd';

const TablePedidos = ({ setCliente }) => {
    const ordersService = OrdersService();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersService.getRepartos();
                setOrders(data)
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
        console.log(orders)
    }, [])

    const handleSetCliente = (id_customer) => {
        setCliente(id_customer);
    };

    const columns = [
        {
            title: 'Fecha de entrega',
            dataIndex: 'FechaEntrega',
            key: 'FechaEntrega',
        },
        {
            title: 'Cliente',
            dataIndex: 'Cliente',
            key: 'Cliente',
        },
        {
            title: 'Nº Pedidos',
            dataIndex: 'Pedidos',
            key: 'Pedidos',
        },
        {
            title: 'Total Pagado',
            dataIndex: 'TotalPagarCliente',
            key: 'TotalPagarCliente',
        },
        {
            title: 'CP',
            dataIndex: 'CP',
            key: 'CP',
        },
        {
            title: 'Dirección',
            dataIndex: 'Direccion',
            key: 'Direccion',
        },
        {
            title: 'Teléfono',
            dataIndex: 'Telefono',
            key: 'Telefono',
            render: (text, record) => `${record.Fijo}--${record.Movil}`,
        },
        {
            title: 'Acciones',
            key: 'Acciones',
            render: (text, record) => (
                <button
                    className="text-indigo-600 hover:text-indigo-900"
                    onClick={() => handleSetCliente(record.id_customer)}
                >
                    Ver Pedidos
                </button>
            ),
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Repartos pendientes</h2>
            {orders.length === 0 ? (
                <p>No hay pedidos</p>
            ) : (
                <Table dataSource={orders} columns={columns} rowKey="id_customer" />
            )}
        </div>
    );
}

TablePedidos.propTypes = {
    setCliente: PropTypes.func.isRequired,
}

export default TablePedidos