// src/components/products/TableCombination.jsx
import { useState, useLayoutEffect, useMemo, useEffect } from 'react';
import ProductService from './ProductService'; // Adjust the import path as necessary
import SearchProduct from './SearchProduct';

const TableCombination = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const productsService = useMemo(() => ProductService(), []);
    const [searchTerm, setSearchTerm] = useState("");

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

    const deleteCombination = (id_product_attribute) => {
        console.log('Borrando combinación:', id_product_attribute);
    };

    const changePriceSinIva = (e, id_product_attribute) => {
        e.preventDefault();
        console.log('Cambiando precio sin IVA:', id_product_attribute, 'nuevo precio:', e.target.value);
        const newProducts = products.map((product) => {
            if (product.id_product_attribute === id_product_attribute) {
                productsService.updatePriceCombinationInDB(product.id_product_attribute, parseFloat(e.target.value));
                return { ...product, combination_price: parseFloat(e.target.value), price_with_tax: parseFloat(e.target.value) * (product.tax_rate * 0.01 + 1) };
            }
            return product;
        }
        );
        setProducts(newProducts);
    };

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
        setProducts(newProducts);
    }

    return (
        <div>
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
                        <th className="py-2 px-4 border-b border-gray-200">Atributo</th>
                        <th className="py-2 px-4 border-b border-gray-200">Sin IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200">Con IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200">Borrar combinación</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => {
                        const isNewProduct = index > 0 && product.id_product !== filteredProducts[index - 1].id_product;

                        return (
                            <>
                                {isNewProduct && (
                                    <tr key={`spacer-${index}`}>
                                        <td colSpan={6} className="py-2 px-4 border-b border-gray-200 bg-yellow-200 "></td>
                                    </tr>
                                )}
                                <tr key={product.id_product_attribute} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : '#ffffff' }}>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.id_product}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.product_name}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.attribute_names}</td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <input
                                            type="number"
                                            value={product.combination_price ? parseFloat(product.combination_price).toFixed(2) : '0.00'}
                                            onChange={(e) => changePriceSinIva(e, product.id_product_attribute)}
                                            onFocus={(e) => e.target.select()}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">
                                        <input
                                            type="number"
                                            value={product.price_with_tax ? parseFloat(product.price_with_tax).toFixed(2) : '0.00'}
                                            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                            onChange={(e) => changePriceConIva(e, product.id_product_attribute)}
                                            onFocus={(e) => e.target.select()}
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200"><button onClick={() => deleteCombination(product.id_product_attribute)} disabled >🗑</button></td>
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