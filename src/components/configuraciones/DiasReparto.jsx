import { useEffect, useMemo, useState } from 'react';
import { Table, Switch, message } from 'antd';
import DeliveryService from '../../common/service/deliveryService';

const DiasReparto = () => {
    const deliveryService = useMemo(() => DeliveryService(), []);

    const [dias, setDias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDias = async () => {
            try {
                const response = await deliveryService.getDeliveryDays();
                const data = await response.json();
                setDias(data);
            } catch (error) {
                console.error('Error fetching delivery days:', error);
                message.error('Error fetching delivery days');
            } finally {
                setLoading(false);
            }
        };
        fetchDias();
    }, [deliveryService]);


    const toggleDia = async (id) => {
        const dia = dias.find(dia => dia.id_delivery_day === id);
        const newStatus = dia.is_active === 1 ? 0 : 1;
        try {
            await deliveryService.updateActiveDay(id);
            setDias(prevDias =>
                prevDias.map(dia =>
                    dia.id_delivery_day === id ? { ...dia, is_active: newStatus } : dia
                )
            );
            message.success('Estado actualizado correctamente');
        } catch (error) {
            console.error('Error updating delivery day:', error);
            message.error('Error updating delivery day');
        }
        console.log(dias);
    };

    const handleTimeChange = (e, id, field) => {
        const value = e.target.value;
        setDias(prevDias =>
            prevDias.map(dia =>
                dia.id_delivery_day === id ? { ...dia, [field]: value } : dia
            )
        );
    };


    const columns = [
        {
            title: 'Día de la semana',
            dataIndex: 'day_of_week',
            key: 'day_of_week',
        },
        {
            title: 'Hora de inicio',
            dataIndex: 'start_time',
            key: 'start_time',
            render: (text, record) => (
                <input
                    type="time"
                    value={record.start_time}
                    onChange={(e) => handleTimeChange(e, record.id_delivery_day, 'start_time')}
                />
            ),
        },
        {
            title: 'Hora de fin',
            dataIndex: 'end_time',
            key: 'end_time',
            render: (text, record) => (
                <input
                    type="time"
                    value={record.end_time}
                    onChange={(e) => handleTimeChange(e, record.id_delivery_day, 'end_time')}
                />
            ),
        },
        {
            title: 'Activo',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (text, record) => (
                <Switch
                    checked={record.is_active === 1}
                    onChange={() => toggleDia(record.id_delivery_day)}
                />
            ),
        },
    ];

    return (
        <div className="container mx-auto mt-4">
            <h2>Configuración de Días de Reparto</h2>
            <Table
                dataSource={dias}
                columns={columns}
                rowKey="id_delivery_day"
                loading={loading}
                pagination={{ pageSize: 7 }}
            />
        </div>
    );
};

export default DiasReparto;