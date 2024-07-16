import { useEffect, useState } from 'react';
import TablePrice from '../components/products/TablePrice';

const ProductsPage = () => {

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    // const tiposIVA = [
    //     { id: 0, value: 0 },
    //     { id: 3, value: 4 },
    //     { id: 2, value: 10 },
    //     { id: 1, value: 21 },
    // ];

    // const InputSinIVAChange = (e, productId) => {
    //     e.preventDefault();
    //     console.log('productId:', productId, 'cambio precio a:', e.target.value);
    //     //actualizar el precio del producto en la array de products
    //     const newProducts = products.map((product) => {
    //         if (product.id_product === productId) {
    //             updateProductPriceInDB(product.id_product, parseFloat(e.target.value));
    //             return { ...product, price: parseFloat(e.target.value), precio_IVA: parseFloat(e.target.value) * (product.tax_rate * 0.01 + 1) };
    //         }
    //         return product;
    //     });
    //     setProducts(newProducts);
    // }

    // const InputConIvaChange = (e, productId) => {
    //     e.preventDefault();
    //     console.log('productId:', productId, 'cambio precio a:', e.target.value);
    //     //actualizar el precio del producto en la array de products
    //     const newProducts = products.map((product) => {
    //         if (product.id_product === productId) {
    //             updateProductPriceInDB(product.id_product, parseFloat(e.target.value) / (1 + product.tax_rate * 0.01));
    //             return { ...product, price: parseFloat(e.target.value) / (1 + product.tax_rate * 0.01), precio_IVA: parseFloat(e.target.value) };
    //         }
    //         return product;
    //     });
    //     setProducts(newProducts);

    // }

    // const changeIVA = (e, productId) => {
    //     e.preventDefault();
    //     console.log('productId:', productId, 'cambio IVA a:', e.target.value);
    //     //actualizar el IVA del producto en la array de products
    //     const newProducts = products.map((product) => {
    //         if (product.id_product === productId) {
    //             updateProductIVAInDB(product.id_product, parseInt(e.target.value));
    //             return { ...product, id_tax_rules_group: parseInt(e.target.value), precio_IVA: product.price * (tiposIVA.find(tipo => tipo.id === parseInt(e.target.value)).value * 0.01 + 1) };

    //         }
    //         return product;
    //     });
    //     setProducts(newProducts);
    // }

    // const updateProductPriceInDB = async (id_product, price) => {
    //     try {
    //         const response = await fetch('http://localhost:3000/products', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
    //             },
    //             body: JSON.stringify({
    //                 id: id_product,
    //                 price: price,
    //             }),
    //         });

    //         const data = await response.json();
    //         console.log(data.message); // "Product updated"
    //     } catch (error) {
    //         console.error('Error updating product price:', error);
    //     }
    // };

    // const updateProductIVAInDB = async (id_product, id_tax_rules_group) => {
    //     try {
    //         const response = await fetch('http://localhost:3000/products/iva', {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
    //             },
    //             body: JSON.stringify({
    //                 id: id_product,
    //                 iva: id_tax_rules_group,
    //             }),
    //         });

    //         const data = await response.json();
    //         console.log(data.message); // "Product updated"
    //     } catch (error) {
    //         console.error('Error updating product IVA:', error);
    //     }
    // }


    // useEffect(() => {
    //     const getProducts = async () => {
    //         await fetch('http://localhost:3000/products', {
    //             method: 'GET',
    //             headers: {
    //                 Authorization: `${localStorage.getItem('token')}`,
    //             },
    //         })
    //             .then((response) => {
    //                 if (response.ok) {
    //                     return response.json();
    //                 }
    //                 throw new Error('Get products failed');
    //             })
    //             .then((data) => {
    //                 setProducts(data); // Assuming the data is an array of products
    //                 setFilteredProducts(data); // Inicialmente, todos los productos están "filtrados"
    //             })
    //             .catch((error) => {
    //                 console.error('Get products error:', error);
    //             });
    //     };

    //     getProducts();
    // }, []);

    // useEffect(() => {
    //     const results = products.filter(product =>
    //         product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //         product.id_product.toString().includes(searchTerm)
    //     );
    //     setFilteredProducts(results);
    // }, [searchTerm, products]);

    return (
        <TablePrice />
    );

}
export default ProductsPage