import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import OrdersService from './ordersService';
import { Table, Checkbox } from 'antd';

const TablePedidos = ({ setCliente }) => {
    const ordersService = OrdersService();
    const [orders, setOrders] = useState([]);
    const [entregados, setEntregados] = useState({}); // Estado para almacenar los valores de entregado

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await ordersService.getRepartos();
                setOrders(data);

                // Cargar el estado de entregado desde localStorage
                const storedEntregados = JSON.parse(localStorage.getItem('entregados')) || {};
                setEntregados(storedEntregados);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };
        fetchOrders();
    }, []);

    const handleSetCliente = (id_customer) => {
        setCliente(id_customer);
    };

    const handleEntregadoChange = (id_customer, checked) => {
        // Actualizar el estado local
        const updatedEntregados = { ...entregados, [id_customer]: checked };
        setEntregados(updatedEntregados);

        // Guardar en localStorage
        localStorage.setItem('entregados', JSON.stringify(updatedEntregados));
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
            title: 'Entregado',
            key: 'Entregado',
            render: (text, record) => (
                <Checkbox
                    checked={entregados[record.id_customer] || false}
                    onChange={(e) => handleEntregadoChange(record.id_customer, e.target.checked)}
                >
                    Entregado
                </Checkbox>
            ),
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
                    rowClassName={(record) =>
                        entregados[record.id_customer] ? 'bg-green-100' : ''
                    } // Colorear la fila de verde si está entregado
                />
            )}
        </div>
    );
};

TablePedidos.propTypes = {
    setCliente: PropTypes.func.isRequired,
};

export default TablePedidos;