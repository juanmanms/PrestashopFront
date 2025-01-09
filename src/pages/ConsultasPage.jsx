import { useState } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import Consultas from '../components/shared/Consultas';


const { Meta } = Card;
const { Title } = Typography;

// Datos de ejemplo para las cards
const cardData = [
    {
        id: 1,
        title: 'Listados de productos de parada',
        description: 'Elige parada y ve todos los productos que se venden en ella',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 2,
        title: 'Historico, ultimos 100 pedidos',
        description: 'Pedidos no cancelados',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 3,
        title: 'Resumen generico',
        description: 'Resumen de pedidos por fecha',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    // {
    //     id: 3,
    //     title: 'Card 3',
    //     description: 'This is the description for Card 3',
    //     imageUrl: '/placeholder.svg?height=200&width=300',
    // },
    // {
    //     id: 4,
    //     title: 'Card 4',
    //     description: 'This is the description for Card 4',
    //     imageUrl: '/placeholder.svg?height=200&width=300',
    // },
];
const ConsultasPage = () => {
    const [consulta, setConsulta] = useState(0);
    const handleCardClick = (card) => {
        setConsulta(card.id);
    };

    return (
        <div >
            <Title level={2} className="mb-6">Consultas {consulta !== 0 && ` - ${cardData.find(card => card.id === consulta).title}`}</Title>
            {consulta === 0 ? (
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
                    <Consultas id={consulta} setConsulta={setConsulta} />
                </div>
            )}
        </div>
    );
}

export default ConsultasPage