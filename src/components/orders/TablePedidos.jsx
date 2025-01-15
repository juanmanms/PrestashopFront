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
            title: 'FormaPago',
            dataIndex: 'FormaPago',
            key: 'FormaPago',
            render: (text) => text || 'tpv',
        },
        {
            title: 'Transporte',
            dataIndex: 'TransporteMenosDescuentos',
            key: 'TransporteMenosDescuentos',
            render: (text) => {
                const value = parseFloat(text).toFixed(2);
                return value !== '0.00' ? <span style={{ backgroundColor: 'yellow' }}>{value}</span> : value;
            },
        },
        {
            title: 'Total Pagado',
            dataIndex: 'TotalPagarCliente',
            key: 'TotalPagarCliente',
            render: (text) => parseFloat(text).toFixed(2),
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
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Repartos pendientes para hoy</h2>
            {orders.length === 0 ? (
                <p>No hay pedidos</p>
            ) : (
                <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey="id_customer"
                    scroll={{ x: '100%' }}
                    className="w-full overflow-x-auto"
                />
            )}
        </div>
    );
}

TablePedidos.propTypes = {
    setCliente: PropTypes.func.isRequired,
}

export default TablePedidos