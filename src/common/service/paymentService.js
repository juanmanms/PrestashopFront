export const PaymentService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const getPaymentOptions = async () => {
        try {
            const response = await fetch(`${apiUrl}utiles/payment-methods`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Network response was not ok:', errorText);
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error fetching payment options:', error);
            throw error;
        }
    };

    const updatePaymentOption = async (id, active) => {
        try {
            const response = await fetch(`${apiUrl}utiles/payment-methods`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    active: active,
                    id: id
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error('Network response was not ok:', errorText);
                throw new Error('Network response was not ok');
            }

            return response;
        } catch (error) {
            console.error('Error updating payment option:', error);
            throw error;
        }
    }




    return {
        getPaymentOptions,
        updatePaymentOption
    };
};

export default PaymentService;



