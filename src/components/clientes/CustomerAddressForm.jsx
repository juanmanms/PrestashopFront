import { useEffect, useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Form, Input, Select, Checkbox, Button, message, Row, Col, DatePicker, Radio } from 'antd';
import { customerAddressSchema } from './schemas/customerAddressSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import ClientesService from './ClientesService';
import PropTypes from 'prop-types';


const { Option } = Select;

const CustomerAddressForm = ({ cliente, setSelectedClient }) => {
    const clientsService = useMemo(() => ClientesService(), []);
    const { control, handleSubmit, setValue, formState: { errors } } = useForm({
        resolver: zodResolver(customerAddressSchema),
        defaultValues: {
            id_state: 334,
            id_country: 6,
            firstname: cliente.name || '',
            lastname: cliente.apellidos || '',
            email: cliente.email || '',
            alias: 'Mi dirección',
            terms: false,
            gender: '0',
            newsletter: false,
            optin: false,
        }
    });

    const [addresses, setAddresses] = useState([]);
    const [address, setAddress] = useState(null);

    useEffect(() => {
        if (cliente.id > 0) {
            clientsService.getAddresses(cliente.id, setAddresses);
        }
    }, [cliente, clientsService]);

    useEffect(() => {
        if (addresses.length > 0) {
            setAddress(addresses[0]);
        }
    }, [addresses]);

    useEffect(() => {
        if (address) {
            setValue('address1', address.address1);
            setValue('postcode', address.postcode);
            setValue('city', address.city);
            setValue('phone', address.phone);
            setValue('phone_mobile', address.phone_mobile);
            setValue('firstname', cliente.name);
            setValue('lastname', cliente.apellidos);
            setValue('email', cliente.email);
            setValue('passwd', '123456');
        }
    }, [address, setValue, cliente]);

    const onSubmitCreate = (data) => {
        console.log('Create');
        console.log('Datos validados:', data);
        // Aquí puedes enviar los datos a tu API de PrestaShop
        clientsService.createClient(data);
        setSelectedClient(null);
        message.success('Formulario enviado con éxito');
    };

    const onSubmitUpdate = (data) => {
        console.log('Update');
        // Aquí puedes enviar los datos a tu API de PrestaShop
        clientsService.createClient(data);

        message.success('Formulario enviado con éxito');
    };

    return (
        <Form layout="vertical" className="mt-4 mx-4" onFinish={handleSubmit(cliente.id ? onSubmitUpdate : onSubmitCreate)}>
            <Button
                onClick={() => {
                    setSelectedClient(null);
                    message.success('Selecione un cliente o cree uno nuevo para continuar');
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "

            >
                Volver a la selección de cliente
            </Button>
            <h2 className="text-2xl font-bold mb-4">Cliente y Dirección</h2>
            <Row gutter={16}>
                <Col span={12}>
                    <h2 className="text-xl font-semibold mb-2">Información del Cliente</h2>
                    <Controller
                        name="gender"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Género"
                                validateStatus={errors.gender ? 'error' : ''}
                                help={errors.gender?.message}
                            >
                                <Radio.Group {...field}>
                                    <Radio value="1">Hombre</Radio>
                                    <Radio value="2">Mujer</Radio>
                                    <Radio value="0">No especificado</Radio>
                                </Radio.Group>
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="firstname"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Nombre"
                                validateStatus={errors.firstname ? 'error' : ''}
                                help={errors.firstname?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="lastname"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Apellidos"
                                validateStatus={errors.lastname ? 'error' : ''}
                                help={errors.lastname?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Email"
                                validateStatus={errors.email ? 'error' : ''}
                                help={errors.email?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    {/* {!cliente.id && ( */}
                    <Controller
                        name="passwd"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Contraseña"
                                validateStatus={errors.passwd ? 'error' : ''}
                                help={errors.passwd?.message}
                            >
                                <Input.Password {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    {/* )} */}
                    <Controller
                        name="birthday"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Fecha de Nacimiento"
                                validateStatus={errors.birthday ? 'error' : ''}
                                help={errors.birthday?.message}
                            >
                                <DatePicker {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="newsletter"
                        control={control}
                        render={({ field }) => (
                            <Form.Item>
                                <Checkbox {...field}>Suscribirse al boletín</Checkbox>
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="optin"
                        control={control}
                        render={({ field }) => (
                            <Form.Item>
                                <Checkbox {...field}>Recibir ofertas de nuestros socios</Checkbox>
                            </Form.Item>
                        )}
                    />
                </Col>
                <Col span={12}>
                    <h2 className="text-xl font-semibold mb-2">Dirección</h2>
                    <Controller
                        name="address1"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Dirección"
                                validateStatus={errors.address1 ? 'error' : ''}
                                help={errors.address1?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="postcode"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Código Postal"
                                validateStatus={errors.postcode ? 'error' : ''}
                                help={errors.postcode?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="city"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Ciudad"
                                validateStatus={errors.city ? 'error' : ''}
                                help={errors.city?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="id_country"
                        control={control}
                        defaultValue={6}
                        render={({ field }) => (
                            <Form.Item
                                label="País"
                                validateStatus={errors.id_country ? 'error' : ''}
                                help={errors.id_country?.message}
                            >
                                <Select {...field} placeholder="Seleccione un país" className="w-full">
                                    <Option value={6}>España</Option>
                                </Select>
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="id_state"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Estado/Provincia"
                                validateStatus={errors.id_state ? 'error' : ''}
                                help={errors.id_state?.message}
                            >
                                <Select {...field} placeholder="Seleccione un estado/provincia" allowClear className="w-full">
                                    <Option value={334}>Barcelona</Option>
                                </Select>
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Teléfono"
                                validateStatus={errors.phone ? 'error' : ''}
                                help={errors.phone?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                    <Controller
                        name="phone_mobile"
                        control={control}
                        render={({ field }) => (
                            <Form.Item
                                label="Otro Teléfono"
                                validateStatus={errors.phone_mobile ? 'error' : ''}
                                help={errors.phone_mobile?.message}
                            >
                                <Input {...field} className="w-full" />
                            </Form.Item>
                        )}
                    />
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="mt-4">
                    {!cliente.id ? 'Crear Cliente y Dirección' : 'Actualizar Cliente y Dirección'}
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CustomerAddressForm;

CustomerAddressForm.propTypes = {
    cliente: PropTypes.object,
    setSelectedClient: PropTypes.func,
};