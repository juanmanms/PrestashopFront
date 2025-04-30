import { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, message, Tabs, Table, Modal } from 'antd';
import * as XLSX from 'xlsx';

const { TabPane } = Tabs;

const TAX_RATES = [
    { id: 0, value: 0 },
    { id: 3, value: 4 },
    { id: 2, value: 10 },
    { id: 1, value: 21 },
    { id: 10, value: 2 },
    { id: 11, value: 7.5 },
];

const ProductForm = ({ initialData, onSubmit }) => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bulkData, setBulkData] = useState([]);
    const [validationErrors, setValidationErrors] = useState([]);
    const [validateBulk, setValidateBulk] = useState(false);
    const [isInstructionsModalVisible, setIsInstructionsModalVisible] = useState(false);

    const calculateNetPrice = useCallback((price, taxRateId) => {
        const taxRate = TAX_RATES.find(rate => rate.id === taxRateId)?.value || 0;
        return price / (1 + taxRate / 100);
    }, []);

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            const netPrice = calculateNetPrice(values.price, values.taxRate);
            const productData = { ...values, netPrice };
            await onSubmit(productData);
            message.success('Producto guardado exitosamente');
            form.resetFields();
        } catch (error) {
            message.error('Error al guardar el producto');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBulkSubmit = async () => {
        setIsSubmitting(true);
        try {
            const bulkDataWithNetPrice = bulkData.map(product => ({
                ...product,
                netPrice: calculateNetPrice(product.price, product.taxRate),
            }));
            for (const product of bulkDataWithNetPrice) {
                await onSubmit(product);
            }
            message.success('Productos guardados exitosamente');
            setBulkData([]);
        } catch (error) {
            message.error('Error al guardar los productos');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const addRow = () => {
        setBulkData([...bulkData, { name: '', price: 0, taxRate: TAX_RATES[0].id }]);
        setValidateBulk(false);
    };

    const deleteRow = (index) => {
        const updatedBulkData = [...bulkData];
        updatedBulkData.splice(index, 1);
        setBulkData(updatedBulkData);
    };

    const updateRow = (index, field, value) => {
        const updatedBulkData = [...bulkData];
        updatedBulkData[index][field] = value;
        setBulkData(updatedBulkData);
    };

    const validateBulkData = () => {
        const errors = [];

        bulkData.forEach((item, index) => {
            if (!item.name) {
                errors.push(`Línea ${index + 1}: El nombre es obligatorio`);
            }
            if (isNaN(item.price) || item.price <= 0) {
                errors.push(`Línea ${index + 1}: El precio debe ser un número positivo`);
            }
            if (!TAX_RATES.some(rate => rate.id === item.taxRate)) {
                errors.push(`Línea ${index + 1}: El tipo de IVA es inválido`);
            }
        });

        setValidationErrors(errors);

        if (errors.length === 0) {
            message.success('Datos validados correctamente');
            setValidateBulk(true);
        } else {
            message.error('Errores encontrados en la validación');
            setValidateBulk(false);
        }
    };

    const handleCopyExample = () => {
        const exampleData = [
            { name: 'fresa', price: 10.99, taxRate: 1 },
            { name: 'manzana', price: 15.50, taxRate: 2 },
            { name: 'pera', price: 20.00, taxRate: 3 },
        ];
        setBulkData(exampleData);
    };

    const downloadExcelExample = () => {
        const exampleData = [
            { name: 'fresa', price: 10.99, taxRate: 1 },
            { name: 'manzana', price: 15.50, taxRate: 2 },
            { name: 'pera', price: 20.00, taxRate: 3 },
        ];

        const worksheet = XLSX.utils.json_to_sheet(exampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Example');
        XLSX.writeFile(workbook, 'example.xlsx');
        setIsInstructionsModalVisible(true);
    };

    const handleInstructionsModalOk = () => {
        setIsInstructionsModalVisible(false);
    };

    const handleInstructionsModalCancel = () => {
        setIsInstructionsModalVisible(false);
    };

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'name',
            key: 'name',
            render: (text, record, index) => (
                <Input
                    value={text}
                    onChange={(e) => updateRow(index, 'name', e.target.value)}
                />
            ),
        },
        {
            title: 'Precio',
            dataIndex: 'price',
            key: 'price',
            render: (text, record, index) => (
                <Input
                    type="number"
                    value={text}
                    onChange={(e) => updateRow(index, 'price', parseFloat(e.target.value) || 0)}
                />
            ),
        },
        {
            title: 'IVA',
            dataIndex: 'taxRate',
            key: 'taxRate',
            render: (text, record, index) => (
                <Select
                    value={text}
                    onChange={(value) => updateRow(index, 'taxRate', value)}
                >
                    {TAX_RATES.map(rate => (
                        <Select.Option key={rate.id} value={rate.id}>
                            IVA {rate.value}%
                        </Select.Option>
                    ))}
                </Select>
            ),
        },
        {
            title: 'Acciones',
            key: 'actions',
            render: (text, record, index) => (
                <Button onClick={() => deleteRow(index)}>
                    Borrar
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <Tabs defaultActiveKey="1">
                <TabPane tab="Crear Producto" key="1">
                    <Form
                        form={form}
                        layout="vertical"
                        initialValues={initialData}
                        onFinish={handleSubmit}
                        className="grid md:grid-cols-2 gap-4"
                    >
                        <Form.Item
                            name="name"
                            label="Nombre del Producto"
                            rules={[
                                { required: true, message: 'El nombre es obligatorio' },
                                { min: 2, message: 'El nombre debe tener al menos 2 caracteres' },
                            ]}
                            className="md:col-span-2"
                        >
                            <Input placeholder="Introduzca el nombre del producto" />
                        </Form.Item>

                        <Form.Item
                            name="price"
                            label="Precio"
                            rules={[
                                { required: true, message: 'El precio es obligatorio' },
                                {
                                    validator: (_, value) =>
                                        value > 0
                                            ? Promise.resolve()
                                            : Promise.reject('El precio debe ser positivo')
                                }
                            ]}
                        >
                            <Input
                                type="number"
                                min={0}
                                step={0.01}
                                placeholder="Precio del producto"
                            />
                        </Form.Item>

                        <Form.Item
                            name="taxRate"
                            label="Tipo de IVA"
                            rules={[{ required: true, message: 'Seleccione un tipo de IVA' }]}
                        >
                            <Select placeholder="Seleccione IVA">
                                {TAX_RATES.map(rate => (
                                    <Select.Option key={rate.id} value={rate.id}>
                                        IVA {rate.value}%
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item className="md:col-span-2">
                            <Button
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                className="w-full"
                            >
                                {initialData ? 'Actualizar Producto' : 'Crear Producto'}
                            </Button>
                        </Form.Item>
                    </Form>
                </TabPane>
                <TabPane tab="Carga Masiva" key="2">
                    <div className="mb-4">
                        <Button type="primary" onClick={handleCopyExample} className="my-4">
                            Usar Ejemplo
                        </Button>
                        <Button type="primary" onClick={addRow} className="my-4 ml-2">
                            Añadir Fila
                        </Button>
                        <Button type="default" onClick={downloadExcelExample} className="ml-4 my-4">
                            Descargar Excel Ejemplo
                        </Button>
                    </div>
                    {validationErrors.length > 0 && (
                        <div className="text-red-500">
                            <h4>Errores de validación:</h4>
                            <ul>
                                {validationErrors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    <Table
                        columns={columns}
                        dataSource={bulkData}
                        rowKey={(record, index) => index.toString()}
                        pagination={false}
                    />
                    <Button type="primary" onClick={validateBulkData} className="my-4">
                        Validar Datos
                    </Button>
                    <Button
                        type="primary"
                        onClick={handleBulkSubmit}
                        loading={isSubmitting}
                        className="w-full"
                        disabled={!validateBulk}
                    >
                        Crear Productos
                    </Button>
                </TabPane>
            </Tabs>
            <Modal
                title="Instrucciones"
                visible={isInstructionsModalVisible}
                onOk={handleInstructionsModalOk}
                onCancel={handleInstructionsModalCancel}
            >
                <p>El excel esta en descargas.</p>
                <p>Abrir, rellenar, guardar y enviar por correo al gestor del mercado</p>
                <p>info@gestiodemercats.cat</p>
            </Modal>
        </div>
    );
};

ProductForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;