import { Card, Button, Row, Col, message } from 'antd';
import { useState } from 'react';
import SelectClientes from '../components/clientes/SelectClientes';
import CustomerAddressForm from '../components/clientes/CustomerAddressForm';


const ClientesPage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedClient, setSelectedClient] = useState();




    const showModal = () => {
        // setIsModalVisible(true);
        message.error('Funcionalidad no implementada');
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleNew = () => {
        setSelectedClient(-5);
    }




    return (
        <div>
            {!selectedClient &&

                <>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Ver/modificar Cliente">
                                <Button type="primary" onClick={showModal}>Seleccionar Cliente</Button>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Crear Cliente">
                                <Button type="primary" onClick={handleNew}>Crear Cliente</Button>
                            </Card>
                        </Col>
                    </Row>
                    <SelectClientes
                        visible={isModalVisible}
                        onClose={handleCancel}
                        setSelectedClient={setSelectedClient}
                    />
                </>
            }

            {selectedClient && <CustomerAddressForm cliente={selectedClient} setSelectedClient={setSelectedClient} />}
            {/* <CustomerAddressForm  /> */}
        </div>
    );
}

export default ClientesPage;
