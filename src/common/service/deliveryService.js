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



    return {
        getDeliveryDays,
        updateActiveDay,
    };




}

export default DeliveryService;