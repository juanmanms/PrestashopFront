import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Select, Button, message } from 'antd';

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

    return (
        <div className="container mx-auto p-4">
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

                {/* <Form.Item
                    name="description"
                    label="Descripción"
                    rules={[
                        { required: true, message: 'La descripción es obligatoria' },
                        { min: 10, message: 'La descripción debe tener al menos 10 caracteres' },
                    ]}
                    className="md:col-span-2"
                >
                    <Input.TextArea
                        rows={4}
                        placeholder="Descripción detallada del producto"
                    />
                </Form.Item> */}

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
        </div>
    );
};
ProductForm.propTypes = {
    initialData: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
};

export default ProductForm;
