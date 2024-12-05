import { useEffect, useState, useMemo } from 'react';
import SellerService from './SellerService'
import PropTypes from 'prop-types';
import { Select } from "antd";

const SellerSelect = ({ setParada }) => {
    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(true);

    const sellerService = useMemo(() => SellerService(), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await sellerService.getSellers();
                setSellers(data);
            } catch (error) {
                console.error('Error fetching sellers:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }
        , [sellerService]);
    return (
        <div>
            {loading ? (
                <p>Cargando...</p>
            ) : sellers.length === 0 ? (
                <p>No hay vendedores</p>
            ) : (
                <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Seleccionar parada"
                    optionFilterProp="children"
                    onChange={(value) => setParada(value)}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {sellers.map(seller => (
                        <Select.Option key={seller.id_seller} value={seller.id_customer}>{seller.seller_name}</Select.Option>
                    ))}
                </Select>
            )}
        </div>
    )
}
SellerSelect.propTypes = {
    setParada: PropTypes.func.isRequired,
}

export default SellerSelect