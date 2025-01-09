export const ConsultService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const getReportsGeneric = async (from, to) => {
        try {
            const response = await fetch(`${apiUrl}utiles/report-resumen-generico`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: from,
                    to: to,
                }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating delivery time:', error);
            throw error;
        }

    };






    return {
        getReportsGeneric,
    };




}

export default ConsultService;