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
                                    <td className="py-2 px-4 border-b border-gray-200">{product.combination_price}
                                        {/* <input type="number" value={product.combination_price} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" /> */}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200">{product.price_with_tax || 'NS'}
                                        {/* <input type="number" value={product.price_with_tax || 'NS'} className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" /> */}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-200"><button onClick={() => deleteCombination(product.id_product_attribute)} >🗑</button></td>
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