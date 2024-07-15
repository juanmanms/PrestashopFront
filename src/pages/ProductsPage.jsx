import { useEffect, useState } from 'react';

const ProductsPage = () => {

    const [products, setProducts] = useState([]);

    const InputSinIVAChange = (e, productId) => {
        e.preventDefault();
        console.log('productId:', productId, 'cambio precio a:', e.target.value);
        //actualizar el precio del producto en la array de products
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                updateProductPriceInDB(product.id_product, parseFloat(e.target.value));
                return { ...product, price: parseFloat(e.target.value), precio_IVA: parseFloat(e.target.value) * (product.tax_rate * 0.01 + 1) };
            }
            return product;
        });
        setProducts(newProducts);
    }

    const InputConIvaChange = (e, productId) => {
        e.preventDefault();
        console.log('productId:', productId, 'cambio precio a:', e.target.value);
        //actualizar el precio del producto en la array de products
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                updateProductPriceInDB(product.id_product, parseFloat(e.target.value) / (1 + product.tax_rate * 0.01));
                return { ...product, price: parseFloat(e.target.value) / (1 + product.tax_rate * 0.01), precio_IVA: parseFloat(e.target.value) };
            }
            return product;
        });
        setProducts(newProducts);

    }

    const updateProductPriceInDB = async (id_product, price) => {
        try {
            const response = await fetch('https://apiprestashoptorreblanca.onrender.com/products', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product,
                    price: price,
                }),
            });

            const data = await response.json();
            console.log(data.message); // "Product updated"
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    };


    useEffect(() => {
        const getProducts = async () => {
            await fetch('https://apiprestashoptorreblanca.onrender.com/products', {
                method: 'GET',
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                },
            })
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Get products failed');
                })
                .then((data) => {
                    setProducts(data); // Assuming the data is an array of products
                })
                .catch((error) => {
                    console.error('Get products error:', error);
                });
        };

        getProducts();
    }, []);
    return (
        <div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Product Name</th>
                        <th className="py-2 px-4 border-b border-gray-200">Price</th>
                        <th className="py-2 px-4 border-b border-gray-200">ConIva</th>
                        <th className="py-2 px-4 border-b border-gray-200">Quantity</th>
                        <th className="py-2 px-4 border-b border-gray-200">Tax Rules Group</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={product.id_product} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-100'}>
                            <td className="py-2 px-4 border-b border-gray-200">{product.id_product}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{product.product_name}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <input type="text" value={product.price} onChange={(e) => InputSinIVAChange(e, product.id_product)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <input type="text" value={product.precio_IVA || 'NS'} onChange={(e) => InputConIvaChange(e, product.id_product)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">{product.quantity}</td>
                            <td className="py-2 px-4 border-b border-gray-200">{product.tax_rate || 'NS'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}
export default ProductsPage