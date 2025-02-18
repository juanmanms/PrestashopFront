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
    {
        id: 4,
        title: 'Resumen de pagos',
        description: 'Resumen de pagos por fecha',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 5,
        title: 'Productos sin fotos',
        description: 'Productos que no tienen fotos, por parada',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 6,
        title: 'Productos sin categoria',
        description: 'Productos que no están bien categorizados',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 7,
        title: 'Clientes - direcciones',
        description: 'Clientes con más de una dirección',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 8,
        title: 'Info vendedor',
        description: 'Información del vendedor',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 9,
        title: 'Resumen de paradas',
        description: 'Resumen de pedidos por parada',
        imageUrl: '/placeholder.svg?height=200&width=300',
    }

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