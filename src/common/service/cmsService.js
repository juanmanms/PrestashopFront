const CmsService = {
    getImages: async () => {
        try {
            const apiUrl = process.env.REACT_APP_URL_API;
            const response = await fetch(`${apiUrl}cms/images`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching images:', error);
            throw error;
        }
    },

    addImage: async (imageData) => {
        try {
            const apiUrl = process.env.REACT_APP_URL_API;
            const response = await fetch(`${apiUrl}cms/images`, {
                method: 'POST',
                body: imageData,
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${response.status} - ${errorText}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding image:', error);
            throw error;
        }
    },

};

export default CmsService;