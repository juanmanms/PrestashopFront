import { useLayoutEffect, useState, useEffect, useMemo } from "react"
import ProductService from "../components/products/ProductService";
import { Table, Button } from 'antd';
import SearchProduct from "../components/products/SearchProduct";
import ImageProduct from "../components/products/ImageProduct";
import UploadImage from "../components/products/UpLoadImage";

import UploadImageModal from "../components/products/UploadImageModal";



const ImagesPage = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [fileLists, setFileLists] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const showModal = (product) => {
        setSelectedProduct(product);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedProduct(null);
    };

    const productsService = useMemo(() => ProductService(), []);


    const deleteImage = (id_product, id_image) => {
        productsService.deleteImage(id_product, id_image);
        //modificar products
        const newProducts = products.filter(product => product.id_image !== id_image);
        setProducts(newProducts);
        productsService.getImagenes(setProducts);
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
                <ImageProduct text={text} record={record} setFileLists={setFileLists} />
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
                    <Button type="primary" onClick={() => showModal(record)}>
                        Cargar imagen
                    </Button>

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
            {/* <UploadImage fileList={fileLists} setFileList={setFileLists} /> */}
            <Table
                dataSource={filteredProducts}
                columns={columns}
                rowKey={record => record.id_image || record.id_product}
                rowClassName={(record, index) => (index % 2 === 0 ? 'bg-green-200' : 'bg-orange-100')}
            />
            {selectedProduct && (
                <UploadImageModal
                    visible={modalVisible}
                    onClose={handleCloseModal}
                    product={selectedProduct}
                />
            )}
        </div>
    );
}

export default ImagesPage