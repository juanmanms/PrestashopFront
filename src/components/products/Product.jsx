import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, message, Tabs, Table } from 'antd';

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
    const [bulkInput, setBulkInput] = useState('');

    const handleSubmit = async (values) => {
        setIsSubmitting(true);
        try {
            await onSubmit(values);
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
            bulkData.map(async (product) => {
                await onSubmit(product);
            });
            message.success('Productos guardados exitosamente');
            setBulkData([]);
        } catch (error) {
            message.error('Error al guardar los productos');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const validateBulkData = (text) => {
        const lines = text.split('\n');
        const data = [];
        const errors = [];

        lines.forEach((line, index) => {
            const [name, price, taxRateId] = line.split(',');

            if (!name || !price || !taxRateId) {
                errors.push(`Línea ${index + 1}: Faltan campos`);
                return;
            }

            const priceNumber = parseFloat(price);
            const taxRateIdNumber = parseInt(taxRateId, 10);

            if (isNaN(priceNumber) || priceNumber <= 0) {
                errors.push(`Línea ${index + 1}: Precio inválido`);
                return;
            }

            if (!TAX_RATES.some(rate => rate.id === taxRateIdNumber)) {
                errors.push(`Línea ${index + 1}: IVA inválido`);
                return;
            }

            data.push({
                name: name.trim(),
                price: priceNumber,
                taxRate: taxRateIdNumber,
            });
        });

        setBulkData(data);
        setValidationErrors(errors);

        if (errors.length === 0) {
            message.success('Datos validados correctamente');
        } else {
            message.error('Errores encontrados en la validación');
        }
    };

    const handleCopyExample = () => {
        const example = `fresa,10.99,1\nmanzana,15.50,2\npera,20.00,3`;
        setBulkInput(example);
        validateBulkData(example);
    };

    const columns = [
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Precio', dataIndex: 'price', key: 'price' },
        { title: 'IVA', dataIndex: 'taxRate', key: 'taxRate' },
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
                    <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="mb-4">
                            <h4>Ejemplo de formato CSV:</h4>
                            <pre>
                                {`fresa,10.99,1\nmanzana,15.50,2\npera,20.00,3`}
                            </pre>
                            <Button type="primary"
                                htmlType="submit"
                                className='my-4'
                                onClick={handleCopyExample}>
                                Copiar Ejemplo
                            </Button>
                        </div>
                        <div className="mb-4">
                            <h4>Tipos de IVA</h4>
                            <pre>
                                {`0: 0%\n1: 21%\n2: 10%\n3: 4%\n10: 2%\n11: 7.5%`}
                            </pre>
                        </div>
                    </div>
                    <div className="grid gap-4">
                        <Input.TextArea
                            value={bulkInput}
                            onChange={(e) => {
                                setBulkInput(e.target.value);
                                validateBulkData(e.target.value);
                            }}
                            rows={6}
                            placeholder="Pegue aquí los productos en formato CSV: nombre,precio,ivaId (un producto por línea)"
                        />
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
                        {bulkData.length > 0 && (
                            <>
                                <Table
                                    columns={columns}
                                    dataSource={bulkData}
                                    rowKey={(record) => record.name}
                                    pagination={false}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleBulkSubmit}
                                    loading={isSubmitting}
                                    className="w-full"
                                >
                                    Crear Productos
                                </Button>
                            </>
                        )}
                    </div>
                </TabPane>
            </Tabs>
        </div>
    );
};

ProductForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;