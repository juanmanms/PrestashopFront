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
        console.log(data)
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
      key: 'IDPedido'
    },
    {
      title: 'Cliente',
      dataIndex: 'Cliente',
      key: 'Cliente'
    },
    {
      title: 'CP',
      dataIndex: 'CP',
      key: 'CP'
    },
    {
      title: 'Coste Transporte',
      dataIndex: 'CosteTransporte',
      key: 'CosteTransporte'
    },
    {
      title: 'Dirección',
      dataIndex: 'Dirección',
      key: 'Dirección'
    },
    {
      title: 'Estado',
      dataIndex: 'Estado',
      key: 'Estado',
      render: (text) => stateMapping[text] || text
    },
    {
      title: 'Fecha Pedido',
      dataIndex: 'FechaPedido',
      key: 'FechaPedido'
    },
    {
      title: 'Población',
      dataIndex: 'Población',
      key: 'Población'
    },
    {
      title: 'Teléfono Fijo',
      dataIndex: 'TeléfonoFijo',
      key: 'TeléfonoFijo'
    },
    {
      title: 'Teléfono Móvil',
      dataIndex: 'TeléfonoMóvil',
      key: 'TeléfonoMóvil'
    },
    {
      title: 'Total Compra',
      dataIndex: 'TotalCompra',
      key: 'TotalCompra'
    },
    {
      title: 'Total Pagado',
      dataIndex: 'TotalPagado',
      key: 'TotalPagado'
    },
    {
      title: 'Total Transporte',
      dataIndex: 'TotalTransporte',
      key: 'TotalTransporte'
    },
    {
      title: 'Transportista',
      dataIndex: 'Transportista',
      key: 'Transportista'
    }
  ];


  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Repartos pendientes</h2>
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
  )
}



export default HistoricoCien