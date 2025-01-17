import { useEffect, useState, useMemo } from 'react';
import { Table, message } from 'antd';
import ConsultService from '../../common/service/consultService';

const SinCategorias = () => {
    const consultService = useMemo(() => ConsultService(), []);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await consultService.getProductSinCategoria();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
                message.error('Error fetching products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const columns = [
        {
            title: 'ID Producto',
            dataIndex: 'id_product',
            key: 'id_product',
        },
        {
            title: 'Nombre Producto',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'ID Categoría Default',
            dataIndex: 'id_category_default',
            key: 'id_category_default',
        }
    ]
    return (
        <div className="container mx-auto mt-4">
            <div>Sin Categoria</div>
            {loading ? (
                <p className="text-center">Cargando...</p>
            ) : (
                products.length > 0 ? (
                    <Table dataSource={products} columns={columns} />
                ) : (
                    <p>No hay productos sin categoría</p>
                )
            )}
        </div>
    )
}

export default SinCategorias