import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

const SelectPay = ({ paymentMethod, setPaymentMethod }) => {
    const handleChange = (value) => {
        setPaymentMethod(value);
    };

    return (
        <div>
            <h2>Opciones de pago</h2>
            <Select value={paymentMethod} onChange={handleChange}>
                <Option value="tpv" default >Tarjeta</Option>
                <Option value="efectivo">Efectivo</Option>
                <Option value="parada">En parada</Option>
            </Select>
        </div>
    );
};

SelectPay.propTypes = {
    paymentMethod: PropTypes.string.isRequired,
    setPaymentMethod: PropTypes.func.isRequired,
};

export default SelectPay;