import { useState, useEffect } from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import Consultas from '../components/shared/Consultas';
import { useSelector } from 'react-redux';

const { Meta } = Card;
const { Title } = Typography;

// Agrupamos las consultas por tipo
const groupedCards = [
    {
        group: "Pagos",
        cards: [
            { id: 4, title: 'Resumen de pagos por fecha', imageUrl: '/placeholder.svg?height=200&width=300' }
        ]
    },
    {
        group: "Consultas",
        cards: [
            { id: 2, title: 'Últimos 100 pedidos', imageUrl: '/placeholder.svg?height=200&width=300' },
            { id: 3, title: 'Pedidos por parada y por cliente', imageUrl: '/placeholder.svg?height=200&width=300' },
            { id: 1, title: 'Productos por parada', imageUrl: '/placeholder.svg?height=200&width=300' },
            { id: 8, title: 'Información del vendedor', imageUrl: '/placeholder.svg?height=200&width=300' }
        ]
    },
    {
        group: "Control",
        cards: [
            { id: 7, title: 'Clientes con más de una dirección', imageUrl: '/placeholder.svg?height=200&width=300' },
            { id: 5, title: 'Productos sin fotos', imageUrl: '/placeholder.svg?height=200&width=300' }
        ]
    },
    {
        group: "Cierres",
        cards: [
            { id: 9, title: 'Resumen anual por paradas', imageUrl: '/placeholder.svg?height=200&width=300' },
            { id: 10, title: 'Resumen anual por meses', imageUrl: '/placeholder.svg?height=200&width=300' }
        ]
    }
];

const ConsultasPage = () => {
    const [consulta, setConsulta] = useState(0);
    const user = useSelector((state) => state.user);
    const [allowedGroupedCards, setAllowedGroupedCards] = useState([]);

    useEffect(() => {
        if (user.role === "1") {
            setAllowedGroupedCards(groupedCards);
        } else {
            // Solo mostrar la consulta de id 2 para otros roles
            setAllowedGroupedCards([
                {
                    group: "Consultas",
                    cards: [
                        { id: 2, title: 'Últimos 100 pedidos', imageUrl: '/placeholder.svg?height=200&width=300' }
                    ]
                }
            ]);
        }
    }, [user.role]);

    const handleCardClick = (card) => {
        setConsulta(card.id);
    };

    // Para mostrar el título de la consulta seleccionada
    const allCards = groupedCards.flatMap(g => g.cards);
    const selectedTitle = allCards.find(card => card.id === consulta)?.title;

    return (
        <div>
            <Title level={2} className="mb-6">
                Consultas {consulta !== 0 && ` - ${selectedTitle}`}
            </Title>
            {consulta === 0 ? (
                <>
                    {allowedGroupedCards.map(({ group, cards }) => (
                        <div key={group}>
                            <Divider orientation="left">{group}</Divider>
                            <Row gutter={[16, 16]}>
                                {cards.map((card) => (
                                    <Col xs={24} sm={12} md={8} lg={6} key={card.id}>
                                        <Card
                                            className="shadow-lg rounded-lg transition-transform duration-200 hover:scale-105 cursor-pointer bg-blue-100"
                                            hoverable
                                            onClick={() => handleCardClick(card)}
                                        >
                                            <Meta title={card.title} />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>
                    ))}
                </>
            ) : (
                <div>
                    <Consultas id={consulta} setConsulta={setConsulta} />
                </div>
            )}
        </div>
    );
}

export default ConsultasPage;