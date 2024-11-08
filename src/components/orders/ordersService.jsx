
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

    const createCart = async (id_customer, id_address, product, price, date, carrier) => {
        try {
            const response = await fetch(`${apiUrl}orders/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ id_customer, id_address, product, price, date, carrier }),
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
        console.log("llego")
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



    return {
        getProductID,
        createCart,
        getOrders,
        cancelOrder
    };

}

export default OrdersService;
