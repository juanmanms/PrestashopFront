import { useEffect, useState, useMemo } from 'react';
import { Table, Select, message } from 'antd';
import ConsultService from '../../common/service/consultService';


const { Option } = Select;

const SinFotos = () => {
    const consultService = useMemo(() => ConsultService(), []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            message.warning('este proceso puede tardar un poco')
            try {
                const data = await consultService.getProductsSinFoto
                    ();
                setProducts(data);
                setFilteredProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                message.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        if (filter) {
            setFilteredProducts(products.filter(product => product.seller_name === filter));
        } else {
            setFilteredProducts(products);
        }
    }, [filter, products]);

    const handleFilterChange = (value) => {
        setFilter(value);
    };

    const columns = [
        {
            title: 'ID Producto',
            dataIndex: 'id_product',
            key: 'id_product',
        },
        {
            title: 'Nombre del Producto',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'ID Vendedor',
            dataIndex: 'id_seller',
            key: 'id_seller',
        },
        {
            title: 'Nombre del Vendedor',
            dataIndex: 'seller_name',
            key: 'seller_name',
        },
    ];

    const uniqueSellers = [...new Set(products.map(product => product.seller_name))];

    return (
        <div className="container mx-auto mt-4">
            <h2>Sin fotos</h2>
            {loading ? (
                <p>Cargando...</p>
            ) : (
                <>
                    {products.length === 0 ? (
                        <p>No hay productos sin imagen</p>
                    ) : (
                        <>
                            <Select
                                style={{ width: 200, marginBottom: 20 }}
                                placeholder="Filtrar por vendedor"
                                onChange={handleFilterChange}
                                allowClear
                            >
                                {uniqueSellers.map(seller => (
                                    <Option key={seller} value={seller}>
                                        {seller}
                                    </Option>
                                ))}
                            </Select>
                            <Table dataSource={filteredProducts} columns={columns} rowKey="id_product" />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SinFotos;