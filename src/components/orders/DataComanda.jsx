import { DatePicker, message } from 'antd';
import DeliveryService from '../../common/service/deliveryService';
import PropTypes from 'prop-types';
import { useEffect, useState, useMemo, useCallback } from 'react';
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

const initialTime = dayjs().tz('Europe/Madrid').set({ 'hour': 2, 'minute': 0, 'second': 0 });

export const DataComanda = ({ setStartDate, startDate, carrier }) => {
    const deliveryService = useMemo(() => DeliveryService(), []);
    const [dias, setDias] = useState([]);
    const [loading, setLoading] = useState(true);
    const now = dayjs().tz('Europe/Madrid');
    const currentHour = now.hour();
    const currentDay = now.day();

    const fetchDeliveryDays = useCallback(async () => {
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
    }, [deliveryService]);

    useEffect(() => {
        fetchDeliveryDays();
        setStartDate(initialTime.hour(2).minute(0).second(0));

    }, [fetchDeliveryDays, setStartDate]);

    const disabledDays = useMemo(() => {
        const isRecogida = carrier === parseInt(process.env.REACT_APP_recogida);
        return isRecogida ? [0] : dias.filter(day => !day.is_active).map(day => dayjs().day(day.id_delivery_day).day());
    }, [carrier, dias]);

    const disabledDate = useCallback(current => {
        return current && disabledDays.includes(current.day());
    }, [disabledDays]);

    const minDate = useMemo(() => {
        const today = dias.find(day => day.id_delivery_day === currentDay);
        const endTimeHour = today ? dayjs(today.end_time, 'HH:mm').hour() : 0;
        return (today && currentHour < endTimeHour) ? now : now.add(1, 'day');
    }, [currentDay, currentHour, dias, now]);

    const handleDate = useCallback((date) => {
        const isDifferentDay = date && !date.isSame(now, 'day');

        const confirmChange = () => {
            setStartDate(date ? date.tz('Europe/Madrid').add(2, 'hour') : null);
            document.activeElement?.blur();
        };

        if (isDifferentDay) {
            confirm('Has seleccionado una fecha diferente a la de hoy. ¿Quieres continuar?') ? confirmChange() : setStartDate(initialTime.hour(2).minute(0).second(0));
        } else {
            confirmChange();
        }
        document.activeElement.blur();
    }, [setStartDate, now]);

    const spanishLocale = useMemo(() => ({
        ...es,
        DatePicker: { lang: es }
    }), []);

    return (
        <div>
            <h2>Fecha de entrega</h2>
            {loading ? (<p>Cargando...</p>) : (
                <DatePicker
                    aria-label='Fecha de Comanda'
                    label="Fecha de Comanda"
                    onChange={handleDate}
                    format="DD-MM-YYYY"
                    minDate={minDate}
                    disabledDate={disabledDate}
                    locale={spanishLocale}
                    value={startDate}
                    className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            )}
        </div>
    );
};

DataComanda.propTypes = {
    setStartDate: PropTypes.func.isRequired,
    startDate: PropTypes.object,
    carrier: PropTypes.number,
};

