import { useState, useEffect, useMemo } from "react"
import ProductService from "../components/products/ProductService";
import SearchProduct from "../components/products/SearchProduct";
import SellerService from "../components/seller/SellerService";
import FamilySellerSelect from '../components/seller/FamilySellerSelect';
import { Table } from 'antd';

const CategoryPage = () => {
    const productService = useMemo(() => ProductService(), []);
    const sellerService = useMemo(() => SellerService(), []);
    const [products, setProducts] = useState([]);
    const [familys, setFamilys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterProduct, setFilterProduct] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await productService.getProdutsCategories();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
                setFilterProduct(products);
            }
        };

        const fetchFamilys = async () => {
            try {
                const data = await sellerService.getFamilys();
                setFamilys(data[0].Subcategorías);
            } catch (error) {
                console.error('Error fetching familys:', error);
            }
        };



        fetchProducts();
        fetchFamilys();
    }, [productService]);

    useEffect(() => {
        const filteredProducts = products.filter(product => {
            return product['Nombre Producto'].toLowerCase().includes(searchTerm.toLowerCase());
        });
        setFilterProduct(filteredProducts);
    }, [searchTerm, products]);

    const columns = [
        {
            title: 'ID Producto',
            dataIndex: 'ID Producto',
            key: 'ID Producto',
        },
        {
            title: 'Nombre Producto',
            dataIndex: 'Nombre Producto',
            key: 'Nombre Producto',
        },
        {
            title: 'ID Categoría',
            dataIndex: 'ID Categoría',
            key: 'ID Categoría',
        },
        {
            title: 'Categoría por Defecto',
            dataIndex: 'Categoría por Defecto',
            key: 'Categoría por Defecto',
        },
        // {
        //     title: 'Subcategorías',
        //     dataIndex: 'Subcategorías',
        //     key: 'Subcategorías',
        // },
        {
            title: 'Subcategorías List',
            dataIndex: 'Subcategorías',
            key: 'Subcategorías List',
            render: (text, record) => {
                const subcategories = text.split(',').map(subcategory => {
                    const [name, id] = subcategory.split('*').map(item => item.trim());
                    return { name, id };
                });
                return (
                    // <ul>
                    <FamilySellerSelect productId={record['ID Producto']} subcategories={subcategories} familys={familys} />

                );
            },
        },
    ];



    return (
        <div className="container mx-auto mt-4">
            <h2>Category Page</h2>
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Table
                dataSource={filterProduct}
                columns={columns}
                rowKey="ID Producto"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />
        </div>
    )
}

export default CategoryPage