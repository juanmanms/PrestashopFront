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

export const DataComanda = ({ setStartDate, startDate, carrier }) => {
    const deliveryService = useMemo(() => DeliveryService(), []);
    const [dias, setDias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setStartDate(dayjs().tz('Europe/Madrid').set('hour', 2).set('minute', 0).set('second', 0));
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

    const disabledDays = useMemo(() => {
        if (carrier === parseInt(process.env.REACT_APP_recogida)) {
            return [0]; // Solo deshabilitar domingos
        } else {
            return dias
                .filter(day => day.is_active === 0)
                .map(day => dayjs().day(day.id_delivery_day).day());
        }
    }, [carrier, dias]);

    const disabledDate = current => {
        if (!current) return false;
        return disabledDays.includes(current.day());
    };

    const now = dayjs().tz('Europe/Madrid');
    const currentHour = now.hour();
    const currentDay = now.day();

    const minDate = (() => {
        const today = dias.find(day => day.id_delivery_day === currentDay);
        if (today && currentHour < dayjs(today.end_time, 'HH:mm').hour()) {
            return now;
        }
        return now.add(1, 'day');
    })();

    const handleDate = (date) => {
        if (date && !date.isSame(dayjs(), 'day')) {
            if (confirm('Has seleccionado una fecha diferente a la de hoy. ¿Quieres continuar?')) {
                setStartDate(date ? date.tz('Europe/Madrid').add(2, 'hour') : null);
            } else {
                // Si el usuario cancela, puedes restablecer la fecha al valor actual o hacer otra cosa
                // Por ejemplo, restablecer la fecha al día actual:
                setStartDate(dayjs().tz('Europe/Madrid').set('hour', 2).set('minute', 0).set('second', 0));
            }
        } else {
            setStartDate(date ? date.tz('Europe/Madrid').add(2, 'hour') : null);
        }
        document.activeElement.blur();
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
                    value={startDate}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            )}
        </div>
    )
}

DataComanda.propTypes = {
    setStartDate: PropTypes.func.isRequired,
    startDate: PropTypes.object,
    carrier: PropTypes.number,
}

