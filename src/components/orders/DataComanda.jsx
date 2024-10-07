import { DatePicker } from 'antd';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import es from 'antd/es/date-picker/locale/es_ES';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);



dayjs.extend(customParseFormat);

export const DataComanda = ({ setStartDate }) => {
    const disabledDate = (current) => {
        return current && current.day() === 0;
    }

    const minDate = dayjs().tz('Europe/Madrid').hour() < 17 && dayjs().tz('Europe/Madrid').day() >= 1 && dayjs().tz('Europe/Madrid').day() <= 5
        ? dayjs().tz('Europe/Madrid')
        : dayjs().tz('Europe/Madrid').day() === 5 && dayjs().tz('Europe/Madrid').hour() >= 17
            ? dayjs().tz('Europe/Madrid').add(3, 'day')
            : dayjs().tz('Europe/Madrid').day() === 6
                ? dayjs().tz('Europe/Madrid').add(2, 'day')
                : dayjs().tz('Europe/Madrid').day() === 0
                    ? dayjs().tz('Europe/Madrid').add(1, 'day')
                    : dayjs().tz('Europe/Madrid').add(1, 'day');

    const handleDate = (date) => {
        setStartDate(date ? date.add(2, 'hour') : null);
    }

    const spanishLocale = {
        ...es,
        DatePicker: {
            lang: es,
        }
    };



    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
                Fecha en entrega
            </label>
            <DatePicker
                aria-label='Fecha de Comanda'
                label="Fecha de Comanda"
                onChange={(date) => handleDate(date)}
                format={{
                    format: 'DD-MM-YYYY',
                    type: 'mask',
                }}
                defaultValue={minDate}
                minDate={minDate}
                disabledDate={disabledDate}
                locale={spanishLocale}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    )
}

DataComanda.propTypes = {
    setStartDate: PropTypes.func.isRequired,
}

