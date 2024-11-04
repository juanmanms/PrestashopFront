import { useEffect, useState } from 'react';
import { Table } from 'antd';
import OrdersService from './ordersService';

const TableOrders = () => {
    const ordersService = OrdersService();

    const [orders, setOrders] = useState([]);

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
    }, [ordersService]);


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
            title: 'Total Pagado',
            dataIndex: 'Total Pagado',
            key: 'Total Pagado',
            render: (text) => `${parseFloat(text).toFixed(2)}€`,
        },
        {
            title: 'Estado',
            dataIndex: 'current_state',
            key: 'current_state',
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