export const SellerService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const getSellers = async () => {
        try {
            const response = await fetch(`${apiUrl}sellers/all`, {
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

    const getFamilys = async () => {
        try {
            const response = await fetch(`${apiUrl}sellers/familys`, {
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


    return {
        getSellers,
        getFamilys
    };

};

export default SellerService;