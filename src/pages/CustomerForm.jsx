import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Card, Form, Input, Button, message } from 'antd';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import ClientesService from '../components/clientes/ClientesService';

const formSchema = z.object({
    firstName: z.string().min(2, {
        message: "El nombre debe tener al menos 2 caracteres.",
    }),
    lastName: z.string().min(2, {
        message: "El apellido debe tener al menos 2 caracteres.",
    }),
    email: z.string().email({
        message: "Debe ser un correo electrónico válido.",
    }),
    address: z.string().min(5, {
        message: "La dirección debe tener al menos 5 caracteres.",
    }),
    city: z.string().min(2, {
        message: "La ciudad debe tener al menos 2 caracteres.",
    }),
    postalCode: z.string().min(5, {
        message: "El código postal debe tener al menos 5 caracteres.",
    }),
    phone: z.string().min(9, {
        message: "El teléfono debe tener al menos 10 caracteres.",
    }),
});

const CustomerForm = () => {
    const clienteService = ClientesService();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { handleSubmit, control, formState: { errors }, reset } = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            postalCode: "",
        },
    });

    async function onSubmit(values) {
        setIsSubmitting(true);
        // Simular envío de datos
        await new Promise((resolve) => setTimeout(resolve, 2000));
        clienteService.sendEmail(values);
        setIsSubmitting(false);
        message.success("El cliente y su dirección han sido creados exitosamente.");
        reset();
    }

    return (
        <Card title="Crear nuevo cliente" extra="Ingrese los datos del cliente y su dirección de envío." style={{ width: '100%', maxWidth: 800, margin: '0 auto' }}>
            <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label="Nombre" validateStatus={errors.firstName ? "error" : ""} help={errors.firstName?.message}>
                                <Input {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label="Apellido" validateStatus={errors.lastName ? "error" : ""} help={errors.lastName?.message}>
                                <Input {...field} />
                            </Form.Item>
                        )}
                    />
                </div>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Correo electrónico" validateStatus={errors.email ? "error" : ""} help={errors.email?.message}>
                            <Input {...field} type="email" />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Teléfono" validateStatus={errors.phone ? "error" : ""} help={errors.phone?.message}>
                            <Input {...field} />
                        </Form.Item>
                    )}
                />
                <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                        <Form.Item label="Dirección" validateStatus={errors.address ? "error" : ""} help={errors.address?.message}>
                            <Input {...field} />
                        </Form.Item>
                    )}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label="Ciudad" validateStatus={errors.city ? "error" : ""} help={errors.city?.message}>
                                <Input {...field} />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="postalCode"
                        control={control}
                        render={({ field }) => (
                            <Form.Item label="Código postal" validateStatus={errors.postalCode ? "error" : ""} help={errors.postalCode?.message}>
                                <Input {...field} />
                            </Form.Item>
                        )}
                    />
                </div>
                <Form.Item>
                    <Button type="primary" htmlType="submit" loading={isSubmitting} block>
                        {isSubmitting ? "Creando..." : "Crear cliente"}
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CustomerForm;