import { useEffect, useState } from "react"
import ProductService from "./ProductService"

const TablePrice = () => {
    const [products, setProducts] = useState([]);
    const productsService = ProductService();

    const tiposIVA = [
        { id: 0, value: 0 },
        { id: 3, value: 4 },
        { id: 2, value: 10 },
        { id: 1, value: 21 },
    ];

    const InputSinIVAChange = (e, productId) => {
        e.preventDefault();
        console.log('productId:', productId, 'cambio precio a:', e.target.value);
        //actualizar el precio del producto en la array de products
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductPriceInDB(product.id_product, parseFloat(e.target.value));
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
                productsService.updateProductPriceInDB(product.id_product, parseFloat(e.target.value) / (1 + product.tax_rate * 0.01));
                return { ...product, price: parseFloat(e.target.value) / (1 + product.tax_rate * 0.01), precio_IVA: parseFloat(e.target.value) };
            }
            return product;
        });
        setProducts(newProducts);

    }

    const changeIVA = (e, productId) => {
        e.preventDefault();
        console.log('productId:', productId, 'cambio IVA a:', e.target.value);
        //actualizar el IVA del producto en la array de products
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductIVAInDB(product.id_product, parseInt(e.target.value));
                return { ...product, id_tax_rules_group: parseInt(e.target.value), precio_IVA: product.price * (tiposIVA.find(tipo => tipo.id === parseInt(e.target.value)).value * 0.01 + 1) };

            }
            return product;
        });
        setProducts(newProducts);
    }

    useEffect(() => {
        productsService.getProducts(setProducts);
    }, []);

    if (products.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
                        <th className="py-2 px-4 border-b border-gray-200">Sin IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200">Con IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200">IVA</th>
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
                            <td className="py-2 px-4 border-b border-gray-200">
                                <select value={product.id_tax_rules_group} onChange={(e) => changeIVA(e, product.id_product)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                >
                                    {tiposIVA.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>{tipo.value}%</option>
                                    ))}
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablePrice