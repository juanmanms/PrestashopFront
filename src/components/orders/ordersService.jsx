
export const OrdersService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;
    const getProductID = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/comanda`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            //console.log(data); // 1"Product updated"
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    };

    const createCart = async (id_customer, id_address, product, price, date, carrier, payment) => {
        try {
            const response = await fetch(`${apiUrl}orders/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ id_customer, id_address, product, price, date, carrier, payment }),
            });

            const data = await response.json();
            console.log(data); // 1"Product updated"
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    const getOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/orders`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    const cancelOrder = async (id_order) => {
        const response = await fetch(`${apiUrl}orders/cancel`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ id_order }),
        });

        const data = await response.json();
        return data;
    }

    const getRepartos = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/reparto`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    const getRepartosFuturo = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/repartoFuturo`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    const getPedidosReparto = async (customer) => {
        try {
            const response = await fetch(`${apiUrl}orders/reparto/pedidos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ customer }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }
    const getPedidosRepartoFuturo = async (customer) => {
        try {
            const response = await fetch(`${apiUrl}orders/reparto/pedidosFuturo`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ customer }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    const getCienOrders = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/historico`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    const changeStateOrder = async (id_order, state) => {
        const response = await fetch(`${apiUrl}orders/change-state`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ id_order, state }),
        });

        const data = await response.json();
        return data;
    }

    const changePaymentOrders = async (id_order, payment) => {
        console.log('Forma de pago seleccionada:', payment, 'para el pedido:', id_order);
        const response = await fetch(`${apiUrl}orders/change-forma-pago`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ id_order, payment }),
        });

        const data = await response.json();
        return data
    }

    const getOrdersOnline = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/pedidos-online`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json() // This will log the data to the console
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }

    }

    const getOrdersOnlineBySeller = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/pedidos-online-vendedor`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }

    }

    const getLineasPedido = async (id_order) => {
        try {
            const response = await fetch(`${apiUrl}orders/lineas-pedido/${id_order}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }

    }

    const getParadasConPedidos = async () => {
        try {
            const response = await fetch(`${apiUrl}orders/repartos-parada`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }

    return {
        getProductID,
        createCart,
        getOrders,
        cancelOrder,
        getRepartos,
        getPedidosReparto,
        getCienOrders,
        getRepartosFuturo,
        getPedidosRepartoFuturo,
        changeStateOrder,
        changePaymentOrders,
        getOrdersOnlineBySeller,
        getOrdersOnline,
        getLineasPedido,
        getParadasConPedidos
    };

}

export default OrdersService;
