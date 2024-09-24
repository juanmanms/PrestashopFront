
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
            console.log(data); // 1"Product updated"
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    };

    const createCart = async (id_customer, id_address, product, price, date) => {
        try {
            const response = await fetch(`${apiUrl}orders/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ id_customer, id_address, product, price, date }),
            });

            const data = await response.json();
            console.log(data); // 1"Product updated"
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }



    return {
        getProductID,
        createCart,
    };

}

export default OrdersService;
