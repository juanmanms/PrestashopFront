import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrdersService from './ordersService';
import { Table, Dropdown, message } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { stateMappingEntrega } from '../../common/utils/OrderUtils';


const TableOrdersPendientes = ({ cliente, setCliente }) => {
    const ordersService = OrdersService();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersService.getPedidosReparto(cliente);
                setOrders(data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        if (cliente) {
            fetchOrders();
        }
    }, [cliente]);

    const handleStateChange = async (id_order, state) => {
        try {
            await ordersService.changeStateOrder(id_order, state);
            const data = await ordersService.getPedidosReparto(cliente);
            setOrders(data);
        } catch (error) {
            message.error('Error al cambiar el estado del pedido');
            console.error('Error changing order state:', error);
        }
    };

    const handlePaymentChange = async (id_order, payment) => {
        try {
            await ordersService.changePaymentOrders(id_order, payment);
            const data = await ordersService.getPedidosReparto(cliente);
            setOrders(data);
        } catch (error) {
            message.error('Error al cambiar la forma de pago del pedido');
            console.error('Error changing order payment:', error);
        }
        // console.log('Forma de pago seleccionada:', payment, 'para el pedido:', id_order);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'IDPedido',
            key: 'IDPedido',
        },
        {
            title: 'Producto',
            dataIndex: 'Producto',
            key: 'Producto',
        },
        {
            title: 'Precio',
            dataIndex: 'TotalPagado',
            key: 'TotalPagado',
        },
        {
            title: 'Entrega',
            dataIndex: 'Transportista',
            key: 'Transportista',
            render: (text) => {
                if (typeof text === 'string' && text.toLowerCase().startsWith('zona 4')) {
                    return 'A domicilio';
                }
                return text;
            },
        },
        {
            title: 'Transporte',
            dataIndex: 'TotalTransporte',
            key: 'TotalTransporte',
        },
        {
            title: 'FormaPago',
            dataIndex: 'FormaPago',
            key: 'FormaPago',
            render: (text, record) => {
                const paymentMethods = ['tpv', 'efectivo', 'parada'];
                const menuItems = paymentMethods.map((method) => ({
                    key: method,
                    label: method,
                }));
                const menuProps = {
                    items: menuItems,
                    onClick: ({ key }) => handlePaymentChange(record.IDPedido, key),
                };
                return (
                    <Dropdown menu={menuProps}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {text || 'tpv'} <DownOutlined />
                        </a>
                    </Dropdown>
                );
            },
        },
        {
            title: 'Estado',
            dataIndex: 'Estado',
            key: 'Estado',
            render: (text, record) => {
                const menuItems = Object.keys(stateMappingEntrega).map((state) => ({
                    key: state,
                    label: stateMappingEntrega[state],
                }));
                const menuProps = {
                    items: menuItems,
                    onClick: ({ key }) => handleStateChange(record.IDPedido, key),
                };
                return (
                    <Dropdown menu={menuProps}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                            {stateMappingEntrega[text] || text} <DownOutlined />
                        </a>
                    </Dropdown>
                );
            },
        },
    ];

    const totalSum = orders.reduce((sum, order) => sum + parseFloat(order.TotalPagado || 0), 0);

    return (
        <div className='mt-4 px-4'>
            <h2 className='text-2xl font-semibold text-center'>Pedidos pendientes por id de cliente: {cliente}</h2>
            {orders.length === 0 ? (
                <p className='text-center'>No hay pedidos pendientes</p>
            ) : (
                <Table
                    dataSource={orders}
                    columns={columns}
                    rowKey="IDPedido"
                    summary={() => (
                        <Table.Summary.Row>
                            <Table.Summary.Cell index={0} colSpan={2}>Total</Table.Summary.Cell>
                            <Table.Summary.Cell index={2}>{totalSum.toFixed(2)}</Table.Summary.Cell>
                            <Table.Summary.Cell index={3} />
                        </Table.Summary.Row>
                    )}
                    scroll={{ x: '100%' }}
                />
            )}
            <button
                onClick={() => setCliente(null)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded w-full sm:w-auto"
            >
                Volver a Repartos pendientes
            </button>
        </div>
    );
};

TableOrdersPendientes.propTypes = {
    cliente: PropTypes.number,
    setCliente: PropTypes.func.isRequired,
};

export default TableOrdersPendientes;