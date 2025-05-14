import { useEffect, useState, useMemo } from 'react';
import OrdersService from '../orders/ordersService';
import { stateMapping } from '../../common/utils/OrderUtils';
import { Table } from 'antd';

const HistoricoCien = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const ordersService = useMemo(() => OrdersService(), []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ordersService.getCienOrders();
        setOrders(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [ordersService]);

  const columns = [
    {
      title: 'ID Pedido',
      dataIndex: 'IDPedido',
      key: 'IDPedido',
      sorter: (a, b) => a.IDPedido - b.IDPedido,
    },
    {
      title: 'Cliente',
      dataIndex: 'Cliente',
      key: 'Cliente',
      sorter: (a, b) => a.Cliente.localeCompare(b.Cliente),
    },
    {
      title: 'CP',
      dataIndex: 'CP',
      key: 'CP',
      sorter: (a, b) => a.CP.localeCompare(b.CP),
    },
    {
      title: 'Coste Transporte',
      dataIndex: 'CosteTransporte',
      key: 'CosteTransporte',
      sorter: (a, b) => a.CosteTransporte - b.CosteTransporte,
    },
    {
      title: 'Dirección',
      dataIndex: 'Dirección',
      key: 'Dirección',
      sorter: (a, b) => a.Dirección.localeCompare(b.Dirección),
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      key: 'Estado',
      render: (text) => stateMapping[text] || text,
      sorter: (a, b) => a.Estado.localeCompare(b.Estado),
    },
    {
      title: 'Fecha Pedido',
      dataIndex: 'Fecha Pedido',
      key: 'Fecha Pedido',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a['Fecha Pedido']) - new Date(b['Fecha Pedido']),
    },
    {
      title: 'Fecha Entrega',
      dataIndex: 'Fecha Entrega',
      key: 'Fecha Entrega',
      render: (text) => new Date(text).toLocaleDateString(),
      sorter: (a, b) => new Date(a['Fecha Entrega']) - new Date(b['Fecha Entrega']),
    },
    {
      title: 'Población',
      dataIndex: 'Población',
      key: 'Población',
      sorter: (a, b) => a.Población.localeCompare(b.Población),
    },
    {
      title: 'Teléfono Fijo',
      dataIndex: 'TeléfonoFijo',
      key: 'TeléfonoFijo',
      sorter: (a, b) => a.TeléfonoFijo.localeCompare(b.TeléfonoFijo),
    },
    {
      title: 'Teléfono Móvil',
      dataIndex: 'TeléfonoMóvil',
      key: 'TeléfonoMóvil',
      sorter: (a, b) => a.TeléfonoMóvil.localeCompare(b.TeléfonoMóvil),
    },
    {
      title: 'Total Compra',
      dataIndex: 'TotalCompra',
      key: 'TotalCompra',
      sorter: (a, b) => a.TotalCompra - b.TotalCompra,
    },
    {
      title: 'Total Pagado',
      dataIndex: 'TotalPagado',
      key: 'TotalPagado',
      sorter: (a, b) => a.TotalPagado - b.TotalPagado,
    },
    {
      title: 'Total Transporte',
      dataIndex: 'TotalTransporte',
      key: 'TotalTransporte',
      sorter: (a, b) => a.TotalTransporte - b.TotalTransporte,
    },
    {
      title: 'Transportista',
      dataIndex: 'Transportista',
      key: 'Transportista',
      sorter: (a, b) => a.Transportista.localeCompare(b.Transportista),
    },
  ];

  return (
    <div className="p-4">

      {loading ? (
        <p>No hay pedidos</p>
      ) : (
        <Table
          dataSource={orders}
          columns={columns}
          rowKey="IDPedido"
          scroll={{ x: '100%' }}
          className="w-full overflow-x-auto"
        />
      )}
    </div>
  );
};

export default HistoricoCien;