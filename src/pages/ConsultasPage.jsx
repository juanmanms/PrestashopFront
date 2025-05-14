import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography } from 'antd';
import Consultas from '../components/shared/Consultas';
import { useSelector } from 'react-redux';

const { Meta } = Card;
const { Title } = Typography;

const cardData = [
    {
        id: 1,
        title: 'Productos por parada',
        description: 'Elige parada y ve todos los productos que se venden en ella',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 2,
        title: 'Últimos 100 pedidos',
        description: 'Pedidos no cancelados',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 3,
        title: 'Pedidos por parada y por cliente',
        description: 'Resumen de pedidos por fecha',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 4,
        title: 'Resumen de pagos por fecha',
        description: 'Resumen de pagos por fecha',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 5,
        title: 'Productos sin fotos',
        description: 'Productos que no tienen fotos, por parada',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    // {
    //     id: 6,
    //     title: 'Productos sin categoria',
    //     description: 'Productos que no están bien categorizados',
    //     imageUrl: '/placeholder.svg?height=200&width=300',
    // },
    {
        id: 7,
        title: 'Clientes con más de una dirección',
        description: 'Clientes con más de una dirección',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 8,
        title: 'Información del vendedor',
        description: 'Información del vendedor',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 9,
        title: 'Resumen anual por paradas',
        description: 'Resumen de pedidos por parada',
        imageUrl: '/placeholder.svg?height=200&width=300',
    },
    {
        id: 10,
        title: 'Resumen anual por meses',
        description: 'Resumen repartos mensualizados',
        imageUrl: '/placeholder.svg?height=200&width=300',
    }
];

const ConsultasPage = () => {
    const [consulta, setConsulta] = useState(0);
    const user = useSelector((state) => state.user);
    const [allowedCardData, setAllowedCardData] = useState([]);

    useEffect(() => {
        if (user.role === "1") {
            // If user has role 1, show all cards
            setAllowedCardData(cardData);
        } else {
            // If user doesn't have role 1, only show card with id 2
            setAllowedCardData(cardData.filter(card => card.id === 2));
        }
    }, [user.role]);

    const handleCardClick = (card) => {
        setConsulta(card.id);
    };

    return (
        <div >
            <Title level={2} className="mb-6">Consultas {consulta !== 0 && ` - ${cardData.find(card => card.id === consulta)?.title}`}</Title>
            {consulta === 0 ? (
                <Row gutter={[16, 16]}>
                    {allowedCardData.map((card) => (
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