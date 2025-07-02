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

    const updateCategory = async (id, description, keywords, telefono, whatsapp, facebook, instagram) => {
        try {
            const response = await fetch(`${apiUrl}sellers/category-info`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    id,
                    description,
                    keywords,
                    telefono,
                    whatsapp,
                    facebook,
                    instagram,
                }),
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    }


    return {
        getSellers,
        getFamilys,
        updateCategory
    };

};

export default SellerService;