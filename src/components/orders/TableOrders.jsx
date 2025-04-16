import { useEffect, useState } from 'react';
import { Table, message } from 'antd';
import OrdersService from './ordersService';
import { stateMapping } from '../../common/utils/OrderUtils';

const TableOrders = () => {
    const ordersService = OrdersService();

    const [orders, setOrders] = useState([]);


    const changeState = (order) => {
        console.log("cambio de estado en el pedido", order)
        ordersService.cancelOrder(order);
        const updatedOrders = orders.map(o =>
            o['Id Pedido'] === order ? { ...o, current_state: 6 } : o
        );
        setOrders(updatedOrders);
        message.success('Pedido cancelado correctamente');
    }

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersService.getOrders();
                setOrders(data)
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
    }, []);


    const columns = [
        {
            title: "Pedido",
            dataIndex: 'Id Pedido',
            key: 'Id Pedido',
        },
        {
            title: 'Cliente',
            dataIndex: 'Nombre Cliente',
            key: 'Nombre Cliente',
        },
        {
            title: 'Fecha Pedido',
            dataIndex: 'Fecha Pedido',
            key: 'Fecha Pedido',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Fecha Entrega',
            dataIndex: 'Fecha Entrega',
            key: 'Fecha Entrega',
            render: (text) => new Date(text).toLocaleDateString(),
        },

        {
            title: 'Total Pagado',
            dataIndex: 'Total Pagado',
            key: 'Total Pagado',
            render: (text) => `${parseFloat(text).toFixed(2)}€`,
        },
        {
            title: 'Estado',
            dataIndex: 'current_state',
            key: 'current_state',
            render: (state, order) => {
                const isDisabled = [6, 26, 27, 30].includes(state);
                return (
                    <button
                        disabled={isDisabled}
                        className={`px-2 py-1 rounded ${isDisabled ? 'bg-gray-300' : 'bg-blue-500 text-white'}`}
                        onClick={() => changeState(order['Id Pedido'])}
                    >
                        {stateMapping[state] || 'Desconocido'}
                    </button>
                );
            }
        }
    ];

    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className=" text-xl">
                Últimos pedidos
            </h2>
            <div style={{ overflowX: 'auto' }}>

                <Table dataSource={orders} columns={columns} rowKey="Fecha Pedido" />
            </div>
        </div>
    );
};

export default TableOrders;