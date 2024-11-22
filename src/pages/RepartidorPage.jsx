import { useEffect, useState } from 'react';
import OrdersService from '../components/orders/ordersService';

const RepartidorPage = () => {
    const ordersService = OrdersService();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersService.getRepartos();
                setOrders(data)
                console.log(data)
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
        console.log(orders)
    }, [])


    return (

        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold text-center">Pedidos</h1>
            {orders >= 0 ? (
                <p>No hay pedidos</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Fecha de entrega</th>
                            <th>Cliente</th>
                            <th>Nº Pedidos</th>
                            <th>Total Pagado</th>
                            <th>CP</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id_customer}>
                                <td>{order.FechaEntrega}</td>
                                <td>{order.Cliente}</td>
                                <td>{order.Pedidos}</td>
                                <td>{order.TotalPagarCliente}</td>
                                <td>{order.CP}</td>
                                <td>{order.Direccion}</td>
                                <td>{order.Fijo}--{order.Movil}</td>
                                <td>
                                    <button>Ver Pedidos</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default RepartidorPage