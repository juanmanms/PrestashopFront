import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import PaymentService from '../../common/service/paymentService'
import { Select } from 'antd';

const { Option } = Select;

const SelectPay = ({ paymentMethod, setPaymentMethod }) => {

    const paymentService = useMemo(() => PaymentService(), [])

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await paymentService.getPaymentOptions()
                setOptions(response)
            } catch (error) {
                console.error('Error fetching payment options:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOptions()
    }, [paymentService])
    const handleChange = (value) => {
        setPaymentMethod(value);
    };

    useEffect(() => {
        if (options.length > 0 && !paymentMethod) {
            const defaultOption = options.find(option => option.payment_name.toLowerCase() === 'tpv');
            if (defaultOption) {
                setPaymentMethod(defaultOption.payment_name.toLowerCase());
            }
        }
    }, [options, paymentMethod, setPaymentMethod]);

    return (
        <div>
            <h2>Opciones de pago</h2>
            {loading ? (
                <p>Cargando opciones...</p>
            ) : (
                <Select value={paymentMethod} onChange={handleChange}>
                    {options.filter(option => option.is_active === 1).map((option) => {
                        let displayName;
                        switch (option.payment_name.toLowerCase()) {
                            case 'tpv':
                                displayName = 'Tarjeta';
                                break;
                            case 'efectivo':
                                displayName = 'Efectivo';
                                break;
                            case 'parada':
                                displayName = 'En parada';
                                break;
                            default:
                                displayName = option.payment_name;
                        }
                        return (
                            <Option key={option.id_payment_method} value={option.payment_name.toLowerCase()}>
                                {displayName}
                            </Option>
                        );
                    })}
                </Select>
            )}
        </div>
    );
};

SelectPay.propTypes = {
    paymentMethod: PropTypes.string.isRequired,
    setPaymentMethod: PropTypes.func.isRequired,
};

export default SelectPay;