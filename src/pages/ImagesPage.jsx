import { useLayoutEffect, useState, useEffect, useMemo } from "react"
import ProductService from "../components/products/ProductService";
import { Table, Button } from 'antd';
import SearchProduct from "../components/products/SearchProduct";



const ImagesPage = () => {
    const apiUrl = process.env.REACT_APP_URL_API;
    //const apiUrl = 'https://botiga.mercattorreblanca.cat/';
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const productsService = useMemo(() => ProductService(), []);

    const uploadImage = (id_product) => {
        input.click();
        console.log('Subir imagen para el producto:', id_product);
        productsService.uploadImage();
    };

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            console.log('Archivo seleccionado:', file.name);
            // Aquí puedes agregar la lógica para manejar el archivo seleccionado
        }
    };
    const deleteImage = (id_product, id_image) => {
        productsService.deleteImage(id_product, id_image);
        //modificar products
        const newProducts = products.filter(product => product.id_image !== id_image);
        setProducts(newProducts);
    };

    useLayoutEffect(() => {
        productsService.getImagenes(setProducts);
    }, []);

    const columns = [
        {
            title: 'ID Product',
            dataIndex: 'id_product',
            key: 'id_product',
        },
        {
            title: 'Image URL',
            dataIndex: 'image_url',
            key: 'image_url',
            render: (text, record) => (
                <img src={`${apiUrl}${text}`} alt={record.product_name} width="100" />
            ),
        },
        {
            title: 'Product Name',
            dataIndex: 'product_name',
            key: 'product_name',
        },
        {
            title: 'Acción',
            key: 'action',
            render: (text, record) => (
                record.image_url ? (
                    <Button type="primary" onClick={() => deleteImage(record.id_product, record.id_image)}>Borrar</Button>
                ) : (
                    <Button type="primary" onClick={() => uploadImage(record.id_product)} disabled>Cargar imagen</Button>
                )
            ),
        }
    ];

    useEffect(() => {
        const results = products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id_product.toString().includes(searchTerm)
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    return (
        <div>
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey="id_image"
                rowClassName={(record, index) => (index % 2 === 0 ? 'bg-green-200' : 'bg-orange-100')}
            />
        </div>
    );
}

export default ImagesPage