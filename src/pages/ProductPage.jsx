import { useState } from 'react';
import ProductForm from '../components/products/Product';
import ProductService from '../components/products/ProductService';

const App = () => {
    const [products, setProducts] = useState([]);
    const productService = ProductService();

    const handleSubmit = async (product) => {
        await productService.createProduct(product);
        setProducts([...products, product]);
        console.log(product);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Gestión de Productos</h1>
            <ProductForm onSubmit={handleSubmit} />
        </div>
    );
};

export default App;