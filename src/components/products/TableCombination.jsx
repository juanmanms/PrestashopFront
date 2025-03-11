// src/components/products/TableCombination.jsx
import { useState, useLayoutEffect, useMemo, useEffect } from 'react';
import ProductService from './ProductService'; // Adjust the import path as necessary
import SearchProduct from './SearchProduct';
import useCustomNotification from '../../common/hooks/useCustomNotification';
import { message } from 'antd';


const TableCombination = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productsService = useMemo(() => ProductService(), []);
    const [searchTerm, setSearchTerm] = useState("");
    const { contextHolder, openNotificationWithIcon } = useCustomNotification();


    useLayoutEffect(() => {
        productsService.getCombinations(setProducts);
    }, [productsService]);


    useEffect(() => {
        const results = products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id_product.toString().includes(searchTerm)
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    if (products.length === 0) {
        return <div>Sin resultados...</div>;
    }
    const tiposIVA = [
        { id: 0, value: 0 },
        { id: 3, value: 4 },
        { id: 2, value: 10 },
        { id: 1, value: 21 },
        { id: 10, value: 2 },
        { id: 11, value: 7.5 },
    ];
    const openMessage = () => {
        message.open({
            type: 'loading',
            content: 'Actulizando IVA...',
        });
        setTimeout(() => {
            message.open({
                type: 'success',
                content: 'Iva actualizado correctamente',
                duration: 2,
            });
        }, 3000);
    };


    // const changePriceSinIva = (e, id_product_attribute) => {
    //     e.preventDefault();
    //     console.log('Cambiando precio sin IVA:', id_product_attribute, 'nuevo precio:', e.target.value);
    //     const newProducts = products.map((product) => {
    //         if (product.id_product_attribute === id_product_attribute) {
    //             productsService.updatePriceCombinationInDB(product.id_product_attribute, parseFloat(e.target.value));
    //             return { ...product, combination_price: parseFloat(e.target.value), price_with_tax: parseFloat(e.target.value) * (product.tax_rate * 0.01 + 1) };
    //         }
    //         return product;
    //     }
    //     );
    //     setProducts(newProducts);
    // };

    const changePriceConIva = (e, id_product_attribute) => {
        e.preventDefault();
        console.log('Cambiando precio con IVA:', id_product_attribute, 'nuevo precio:', e.target.value);
        const newProducts = products.map((product) => {
            if (product.id_product_attribute === id_product_attribute) {
                productsService.updatePriceCombinationInDB(product.id_product_attribute, parseFloat(e.target.value) / (1 + product.tax_rate * 0.01));
                return { ...product, price_with_tax: parseFloat(e.target.value), combination_price: parseFloat(e.target.value) / (1 + product.tax_rate * 0.01) };
            }
            return product;
        }
        );
        message.success('Precio actualizado correctamente');
        setProducts(newProducts);
    }

    const handleDeleteCombination = (id_product_attribute) => {
        productsService.deleteCombination(id_product_attribute);
        setProducts(products.filter(product => product.id_product_attribute !== id_product_attribute));
        openNotificationWithIcon('success', 'Success', 'Combination deleted successfully');
    }

    const changeIVA = (e, productId) => {
        e.preventDefault();
        const selectedIVA = tiposIVA.find(tipo => tipo.value === parseFloat(e.target.value));
        console.log('productId:', productId, 'cambio IVA a:', selectedIVA.id);
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductIVAInDB(product.id_product, selectedIVA.id);
                // return { ...product, id_tax_rules_group: parseInt(e.target.value), precio_IVA: product.price * (tiposIVA.find(tipo => tipo.id === parseInt(e.target.value)).value * 0.01 + 1) };
            }
            return product;
        });
        setProducts(newProducts);
        openMessage();
        productsService.getCombinations(setProducts);
    }


    return (
        <div>
            {contextHolder}
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
                        <th className="py-2 px-4 border-b border-gray-200">Impuesto</th>
                        <th className="py-2 px-4 border-b border-gray-200">Atributo</th>
                        <th className="py-2 px-4 border-b border-gray-200">Precio</th>
                        <th className="py-2 px-4 border-b border-gray-200">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => {
                        const isNewProduct = index === 0 || (index > 0 && product.id_product !== filteredProducts[index - 1].id_product);

                        return (
                            <>
                                {isNewProduct && (
                                    <tr key={`spacer-${index}`} className="py-2 px-4 border-b border-gray-200 bg-yellow-200 ">
                                        <td className="py-2 px-4 border-b border-gray-200">{product.id_product}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">{product.product_name}</td>
                                        <td className="py-2 px-4 border-b border-gray-200">
                                            <select value={parseInt(product.tax_rate)}
                                                className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                                onChange={(e) => changeIVA(e, product.id_product)}
                                            >
                                                {tiposIVA.map((tipo) => (
                                                    <option key={tipo.value} value={tipo.value}>{tipo.value}%</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="py-2 px-4 border-b border-gray-200" colSpan={3}></td>
                                    </tr>
                                )}
                                <tr key={product.id_product_attribute} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.id_product}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.product_name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{parseInt(product.tax_rate)}%</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.attribute_names}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <input
                                            type="number"
                                            value={product.price_with_tax || product.combination_price}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            onChange={(e) => changePriceConIva(e, product.id_product_attribute)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <button onClick={() => {
                                            handleDeleteCombination(product.id_product_attribute);
                                        }}>🗑</button>
                                    </td>
                                </tr>
                            </>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default TableCombination;