export const DeliveryService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const getDeliveryDays = async () => {
        try {
            const response = await fetch(`${apiUrl}repartos`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        } catch (error) {
            console.error('Error fetching delivery days:', error);
            throw error;
        }
    };

    const updateActiveDay = async (id) => {
        try {
            const response = await fetch(`${apiUrl}repartos/activo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        } catch (error) {
            console.error('Error updating delivery day:', error);
            throw error;
        }
    };

    const getCarriers = async () => {
        try {
            const response = await fetch(`${apiUrl}repartos/carrier`, {
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
            console.error('Error fetching carriers:', error);
            throw error;
        }
    };

    const updateDeliveryTime = async (dia, tipo, hora) => {
        try {
            const response = await fetch(`${apiUrl}repartos/update-time`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: dia,
                    tipo: tipo,
                    hora: hora,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        } catch (error) {
            console.error('Error updating delivery time:', error);
            throw error;
        }
    }



    return {
        getDeliveryDays,
        updateActiveDay,
        getCarriers,
        updateDeliveryTime,
    };




}

export default DeliveryService;