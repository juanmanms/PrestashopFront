import { DatePicker, message } from 'antd';
import DeliveryService from '../../common/service/deliveryService';
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo } from 'react';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import es from 'antd/es/date-picker/locale/es_ES';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);



dayjs.extend(customParseFormat);

export const DataComanda = ({ setStartDate }) => {
    // const disabledDate = (current) => {
    //     return current && (current.day() === 0 || current.day() === 1);
    // }

    // const minDate = dayjs().tz('Europe/Madrid').hour() < 17 && dayjs().tz('Europe/Madrid').day() >= 1 && dayjs().tz('Europe/Madrid').day() <= 6
    //     ? dayjs().tz('Europe/Madrid')
    //     : dayjs().tz('Europe/Madrid').day() === 6 && dayjs().tz('Europe/Madrid').hour() >= 17
    //         ? dayjs().tz('Europe/Madrid').add(3, 'day')
    //         : dayjs().tz('Europe/Madrid').day() === 6
    //             ? dayjs().tz('Europe/Madrid').add(2, 'day')
    //             : dayjs().tz('Europe/Madrid').day() === 0
    //                 ? dayjs().tz('Europe/Madrid').add(1, 'day')
    //                 : dayjs().tz('Europe/Madrid').add(1, 'day');

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


    // Generar un mapa de días deshabilitados basados en `is_active`
    const disabledDays = dias
        .filter(day => day.is_active === 0)
        .map(day => dayjs().day(day.id_delivery_day).day());

    // Lógica para `disabledDate`
    const disabledDate = current => {
        if (!current) return false; // Validar que `current` esté definido
        return disabledDays.includes(current.day());
    };

    // Configurar la fecha mínima `minDate` dinámicamente
    const now = dayjs().tz('Europe/Madrid');
    const currentHour = now.hour();
    const currentDay = now.day();

    const minDate = (() => {
        const today = dias.find(day => day.id_delivery_day === currentDay);
        if (today && currentHour < today.end_time) {
            return now; // Hoy mismo si estamos antes de la hora de finalización
        }


        // Para otros casos, mover al siguiente día activo
        return now.add(1, 'day');
    })();

    const handleDate = (date) => {
        setStartDate(date ? date.tz('Europe/Madrid').add(1, 'hour') : null);
    }

    const spanishLocale = {
        ...es,
        DatePicker: {
            lang: es,
        }
    };



    return (
        <div>
            <h2>Fecha de entrega</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <DatePicker
                    aria-label='Fecha de Comanda'
                    label="Fecha de Comanda"
                    onChange={(date) => handleDate(date)}
                    format={{
                        format: 'DD-MM-YYYY',
                        type: 'mask',
                    }}
                    minDate={minDate}
                    disabledDate={disabledDate}
                    locale={spanishLocale}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            )}
        </div>
    )
}

DataComanda.propTypes = {
    setStartDate: PropTypes.func.isRequired,
}

