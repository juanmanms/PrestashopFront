import { useEffect, useState, useMemo } from 'react';
import { Table, Select, message, Button } from 'antd';
import ConsultService from '../../common/service/consultService';
import * as XLSX from 'xlsx';

const { Option } = Select;

const SinFotos = () => {
    const consultService = useMemo(() => ConsultService(), []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            message.warning('este proceso puede tardar un poco');
            try {
                const data = await consultService.getProductsSinFoto();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                message.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [consultService]);

    const filteredProducts = useMemo(() => {
        if (filter) {
            return products.filter(product => product.seller_name === filter);
        }
        return products;
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
            title: 'Activo',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (active === 1 ? '✔' : '❌'),
        },
        {
            title: 'Nombre del Vendedor',
            dataIndex: 'seller_name',
            key: 'seller_name',
        },
    ];

    const uniqueSellers = useMemo(
        () => [...new Set(products.map(product => product.seller_name))],
        [products]
    );

    const downloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filteredProducts);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Products Without Photos');
        XLSX.writeFile(workbook, 'products_without_photos.xlsx');
    };

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
                            <Button type="primary" onClick={downloadExcel}>
                                Descargar Excel
                            </Button>
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default SinFotos;