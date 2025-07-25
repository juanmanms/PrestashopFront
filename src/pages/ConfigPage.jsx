import { useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import Configuraciones from '../components/shared/Config';


const { Meta } = Card;
const { Title } = Typography;

// Datos de ejemplo para las cards
const cardData = [
    {
        id: 1,
        title: 'Días de reparto',
        description: 'Selecciona los días de reparto',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    // {
    //     id: 2,
    //     title: 'Opciones de reparto',
    //     description: 'Activar o desactivar tipos de envio',
    //     imageUrl: '/placeholder.svg?height=200&width=300',
    // },
    {
        id: 3,
        title: 'Opciones de pago',
        description: 'Activar o desactivar opciones de pago',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 4,
        title: 'Codigos postales',
        description: 'Añadir o quitar codigos postales',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 5,
        title: 'Horarios',
        description: 'Configurar horarios de reparto',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 6,
        title: 'Actividades',
        description: 'Configurar actividades de reparto',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },


];
const ConfigPage = () => {
    const [configuraciones, setConfiguraciones] = useState(0);
    const handleCardClick = (card) => {
        setConfiguraciones(card.id);
    };

    return (
        <div >
            <Title level={2} className="mb-6">Configuraciones {configuraciones !== 0 && ` - ${cardData.find(card => card.id === configuraciones).title}`}</Title>
            {configuraciones === 0 ? (
                <Row gutter={[16, 16]}>
                    {cardData.map((card) => (
                        <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                            <Card
                                hoverable
                                onClick={() => handleCardClick(card)}
                            >
                                <Meta title={card.title} description={card.description} />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <div>
                    <Configuraciones id={configuraciones} setConsfiguraciones={setConfiguraciones} />
                </div>
            )}
        </div>
    );
}

export default ConfigPage