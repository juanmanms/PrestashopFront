
export const ClientesService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const getClients = async (callback) => {
        await fetch(`${apiUrl}clients`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get clients failed');
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error('Error getting clients:', error);
            });
    };

    const getAddresses = async (id_client, callback) => {
        await fetch(`${apiUrl}clients/adresses/${id_client}`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get addresses failed');
            })
            .then((data) => {
                callback(data);
            })
            .catch((error) => {
                console.error('Error getting addresses:', error);
            });
    }

    return {
        getClients,
        getAddresses,
    };
}

export default ClientesService;
