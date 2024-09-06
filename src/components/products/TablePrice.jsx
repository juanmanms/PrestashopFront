import { useLayoutEffect, useState, useEffect, useMemo } from "react"
import ProductService from "./ProductService"
import SearchProduct from './SearchProduct';
import CreateCombination from "./CreateCombination";


const TablePrice = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar el modal
    const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado

    // Estado para el orden de clasificación
    const productsService = useMemo(() => ProductService(), []);

    const tiposIVA = [
        { id: 0, value: 0 },
        { id: 3, value: 4 },
        { id: 2, value: 10 },
        { id: 1, value: 21 },
    ];

    const InputSinIVAChange = (e, productId) => {
        e.preventDefault();
        console.log('productId:', productId, 'cambio precio a:', e.target.value);
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
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductIVAInDB(product.id_product, parseInt(e.target.value));
                return { ...product, id_tax_rules_group: parseInt(e.target.value), precio_IVA: product.price * (tiposIVA.find(tipo => tipo.id === parseInt(e.target.value)).value * 0.01 + 1) };
            }
            return product;
        });
        setProducts(newProducts);
    }

    const changeActive = (e, productId, productActive) => {
        e.preventDefault();
        productActive === 0 ? productActive = 1 : productActive = 0;
        console.log('productId:', productId, 'cambio activo a:', productActive);
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductActiveInDB(product.id_product, productActive);
                return { ...product, active: !product.active };
            }
            return product;
        });
        setProducts(newProducts);
    }

    const changeName = (e, productId) => {
        e.preventDefault();
        console.log('productId:', productId, 'cambio nombre a:', e.target.value);
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductNameInDB(product.id_product, e.target.value);
                return { ...product, product_name: e.target.value };
            }
            return product;
        });
        setProducts(newProducts);
    }

    const handleSort = () => {
        const sortedProducts = [...filteredProducts].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.price - b.price;
            } else {
                return b.price - a.price;
            }
        });
        setFilteredProducts(sortedProducts);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const openModal = (product) => {
        console.log('Producto seleccionado:', product);
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    useLayoutEffect(() => {
        productsService.getProducts(setProducts);
    }, [productsService]);

    useEffect(() => {
        const results = products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id_product.toString().includes(searchTerm)
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);


    if (products.length === 0) {
        return <div>Sin resultados</div>;
    }

    return (
        <div>
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b border-gray-200">ID</th>
                        <th className="py-2 px-4 border-b border-gray-200">Nombre</th>
                        <th className="py-2 px-4 border-b border-gray-200">Sin IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={handleSort}>Con IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200">IVA</th>
                        <th className="py-2 px-4 border-b border-gray-200">Activo</th>
                        <th className="py-2 px-4 border-b border-gray-200">Crear combinación</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredProducts.map((product, index) => (
                        <tr key={product.id_product} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-blue-100'}>
                            <td className="py-2 px-4 border-b border-gray-200">{product.id_product}</td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <input type="text" value={product.product_name} onChange={(e) => changeName(e, product.id_product)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <input type="number" value={product.price.toFixed(2)} onChange={(e) => InputSinIVAChange(e, product.id_product)}
                                    className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                />
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <input type="number" value={product.precio_IVA.toFixed(2) || 0} onChange={(e) => InputConIvaChange(e, product.id_product)}
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
                            <td className="py-2 px-4 border-b border-gray-200">
                                <button onClick={(e) => changeActive(e, product.id_product, product.active)}>
                                    {product.active ? '✔' : '❌'}
                                </button>
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                                <button
                                    className={` font-bold py-2 px-4 rounded ${product.id_tax_rules_group === 0 ? 'bg-blue-100 cursor-not-allowed ' : 'bg-blue-500 hover:bg-blue-700 text-white'}`}
                                    onClick={() => openModal(product)}
                                    disabled={product.id_tax_rules_group === 0}
                                >
                                    Crear
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedProduct && (
                <CreateCombination
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    selectedProduct={selectedProduct}
                />
            )}
        </div>
    );
}

export default TablePrice;