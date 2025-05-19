import { useEffect, useState, useMemo } from 'react';
import { Table } from 'antd';
import OrdersService from '../orders/ordersService';

const RepartosPorParada = () => {
    const ordersService = useMemo(() => OrdersService(), []);
    const [paradas, setParadas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchParadas = async () => {
            try {
                const data = await ordersService.getParadasConPedidos();
                setParadas(data);
            } catch (error) {
                console.error('Error fetching paradas:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchParadas();
    }, [ordersService]);

    // Calcular el máximo de clientes para las columnas dinámicas
    const maxClientes = Math.max(
        ...paradas.map(parada =>
            parada.clientes
                ? parada.clientes.split(',').length
                : 0
        ),
        0
    );

    // Definir columnas para la tabla de Ant Design
    const columns = [
        {
            title: 'Nombre Vendedor',
            dataIndex: 'nombre_vendedor',
            key: 'nombre_vendedor',
        },
        {
            title: 'Total Pedidos',
            dataIndex: 'total_pedidos',
            key: 'total_pedidos',
        },
        ...Array.from({ length: maxClientes }).map((_, idx) => ({
            title: `Cliente ${idx + 1}`,
            dataIndex: `cliente_${idx + 1}`,
            key: `cliente_${idx + 1}`,
        })),
    ];

    // Adaptar los datos para la tabla de Ant Design
    const dataSource = paradas.map(parada => {
        const clientes = parada.clientes
            ? parada.clientes.split(',').map(c => c.trim())
            : [];
        const clienteColumns = {};
        for (let i = 0; i < maxClientes; i++) {
            clienteColumns[`cliente_${i + 1}`] = clientes[i] || '';
        }
        return {
            key: parada.id_seller,
            id_seller: parada.id_seller,
            nombre_vendedor: parada.nombre_vendedor,
            total_pedidos: parada.total_pedidos,
            ...clienteColumns,
        };
    });

    return (
        <div>
            <h2>Repartos por Parada</h2>
            <Table
                columns={columns}
                dataSource={dataSource}
                loading={loading}
                pagination={false}
                bordered
            />
        </div>
    );
};

export default RepartosPorParada;