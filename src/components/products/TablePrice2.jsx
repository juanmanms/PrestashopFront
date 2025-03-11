import { useLayoutEffect, useState, useEffect, useMemo, useRef } from "react";
import ProductService from "./ProductService";
import SearchProduct from './SearchProduct';
import CreateCombination from "./CreateCombination";
import { Button, Table, Input, Select, message, Spin } from "antd";

const { Option } = Select;

const TablePrice = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [inputValues, setInputValues] = useState({});
    const debounceTimeout = useRef(null);

    const productsService = useMemo(() => ProductService(), []);

    const tiposIVA = [
        { id: 0, value: 0 },
        { id: 3, value: 4 },
        { id: 2, value: 10 },
        { id: 1, value: 21 },
        { id: 10, value: 2 },
        { id: 11, value: 7.5 },
    ];

    const InputConIvaChange = (e, productId) => {
        e.preventDefault();
        const newPriceIVA = parseFloat(e.target.value);

        setProducts((prevProducts) =>
            prevProducts.map((product) => {
                if (product.id_product === productId) {
                    const ivaPercentage = tiposIVA.find((tipo) => tipo.id === product.id_tax_rules_group)?.value || 0;
                    const priceWithoutIVA = newPriceIVA / (1 + ivaPercentage * 0.01);

                    productsService.updateProductPriceInDB(productId, priceWithoutIVA);
                    return { ...product, price: priceWithoutIVA, precio_IVA: newPriceIVA };
                }
                return product;
            })
        );
    };

    const changeIVA = (value, productId) => {
        const newIVA = parseInt(value);
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductIVAInDB(product.id_product, newIVA);
                return { ...product, id_tax_rules_group: newIVA, precio_IVA: product.price * (tiposIVA.find(tipo => tipo.id === newIVA).value * 0.01 + 1) };
            }
            return product;
        });
        setProducts(newProducts);
    };

    const changeActive = (e, productId, productActive) => {
        e.preventDefault();
        productActive = productActive === 0 ? 1 : 0;
        const newProducts = products.map((product) => {
            if (product.id_product === productId) {
                productsService.updateProductActiveInDB(product.id_product, productActive);
                return { ...product, active: !product.active };
            }
            return product;
        });
        setProducts(newProducts);
    };

    const changeName = (e, productId) => {
        const newValue = e.target.value;

        setInputValues((prevValues) => ({
            ...prevValues,
            [productId]: newValue,
        }));

        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }

        debounceTimeout.current = setTimeout(() => {
            const newProducts = products.map((product) => {
                if (product.id_product === productId) {
                    return { ...product, product_name: newValue };
                }
                return product;
            });
            setProducts(newProducts);

            productsService.updateProductNameInDB(productId, newValue);
        }, 500);
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    const discardProduct = (productId) => {
        console.log('Descartando producto:', productId);
        message.loading({ content: 'Todavía sin implementar', key: 'discard' });
    };

    useLayoutEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            await productsService.getProducts(setProducts);
            setIsLoading(false);
        };

        fetchProducts();
    }, [productsService]);

    useEffect(() => {
        const results = products.filter(product =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.id_product.toString().includes(searchTerm)
        );
        setFilteredProducts(results);
    }, [searchTerm, products]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id_product',
            key: 'id_product',
        },
        {
            title: 'Nombre',
            dataIndex: 'product_name',
            key: 'product_name',
            render: (text, record) => (
                <Input
                    value={inputValues[record.id_product] || text}
                    onChange={(e) => changeName(e, record.id_product)}
                    onFocus={(e) => e.target.select()}
                />
            ),
        },
        {
            title: 'Con IVA',
            dataIndex: 'precio_IVA',
            key: 'precio_IVA',
            render: (text, record) => (
                <Input
                    type="number"
                    value={text || record.price}
                    onChange={(e) => InputConIvaChange(e, record.id_product)}
                    onFocus={(e) => e.target.select()}
                />
            ),
        },
        {
            title: 'IVA',
            dataIndex: 'id_tax_rules_group',
            key: 'id_tax_rules_group',
            render: (text, record) => (
                <Select
                    value={text}
                    onChange={(value) => changeIVA(value, record.id_product)}
                >
                    {tiposIVA.map((tipo) => (
                        <Option key={tipo.id} value={tipo.id}>{tipo.value}%</Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Activo',
            dataIndex: 'active',
            key: 'active',
            render: (text, record) => (
                <Button onClick={(e) => changeActive(e, record.id_product, record.active)}>
                    {record.active ? '✔' : '❌'}
                </Button>
            ),
        },
        {
            title: 'Combinación',
            key: 'create_combination',
            render: (text, record) => (
                <Button
                    className="font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white"
                    onClick={() => openModal(record)}
                >
                    Crear
                </Button>
            ),
        },
        {
            title: 'Descartar',
            key: 'discard',
            render: (text, record) => (
                <Button
                    className="font-bold py-2 px-4 rounded bg-red-500 hover:bg-red-700 text-white"
                    onClick={() => discardProduct(record.id_product)}
                >
                    Descartar
                </Button>
            ),
        },
    ];

    return (
        <div className="p-4">
            <SearchProduct searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Spin spinning={isLoading}>
                <Table
                    columns={columns}
                    dataSource={filteredProducts}
                    rowKey="id_product"
                    pagination={{ pageSize: 10 }}
                    scroll={{ x: 800 }}
                />
            </Spin>
            {selectedProduct && (
                <CreateCombination
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    selectedProduct={selectedProduct}
                />
            )}
        </div>
    );
};

export default TablePrice;