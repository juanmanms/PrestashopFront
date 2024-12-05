import { useEffect, useState, useMemo } from 'react';
import ProductService from '../products/ProductService'
import SellerSelect from '../seller/SellerSelect'
import { Table } from "antd";
const ProductosParadas = () => {
    const [products, setProducts] = useState([]);
    const [productsFilter, setProductsFilter] = useState([]);

    const [parada, setParada] = useState(0);
    const [loading, setLoading] = useState(true);

    const productsService = useMemo(() => ProductService(), []);

    useEffect(() => {
        const fetchData = async () => {
            console.log(parada);
            try {
                const data = await productsService.getProductsBySeller(parada); // Reemplaza 1 con el ID del vendedor
                setProducts(data);
                setProductsFilter(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [parada]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 w-full">
            <SellerSelect setParada={setParada} />
            <div className="mt-4">
                {parada === 0 ? (
                    <strong>Elige una parada para empezar</strong>
                ) : (
                    <strong>Total de productos: {productsFilter.length}</strong>
                )}
            </div>
            <div className="mb-4 mt-4 flex flex-col space-y-4 w-full md:flex-row md:space-y-0 md:space-x-4">
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    className="p-2 border rounded flex-grow"
                    onChange={(e) => {
                        const value = e.target.value;
                        setProductsFilter(products.filter(product => product.id_product.toString().includes(value)));
                    }}
                />
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="p-2 border rounded flex-grow"
                    onChange={(e) => {
                        const value = e.target.value;
                        setProductsFilter(products.filter(product => product.product_name.toLowerCase().includes(value.toLowerCase())));
                    }}
                />
                <select
                    className="p-2 border rounded flex-grow"
                    onChange={(e) => {
                        const value = e.target.value;
                        setProductsFilter(value === '' ? products : products.filter(product => product.active === (value === 'active' ? 1 : 0)));
                    }}
                >
                    <option value="">Todos</option>
                    <option value="active">Activos</option>
                    <option value="inactive">Inactivos</option>
                </select>
            </div>
            <div className="overflow-x-auto"></div>
            <Table dataSource={productsFilter} rowKey="id_product" className="w-full md:w-auto mx-auto">
                <Table.Column title="ID" dataIndex="id_product" key="id_product" />
                <Table.Column title="Nombre" dataIndex="product_name" key="product_name" />
                <Table.Column
                    title="Activo"
                    dataIndex="active"
                    key="active"
                    render={(text, record) => (record.active === 1 ? '✔' : '❌')}
                />
            </Table>
        </div>
    );
};

export default ProductosParadas;