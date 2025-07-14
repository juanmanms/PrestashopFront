const CmsService = {
    getImages: async () => {
        try {
            const apiUrl = process.env.REACT_APP_URL_API;
            const response = await fetch(`${apiUrl}cms/images`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },// Default to 'horarios' if no type is provided
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
            const formData = new FormData();
            formData.append('image', imageData);
            const response = await fetch(`${apiUrl}cms/images`, {
                method: 'POST',
                body: formData,
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
    deleteImage: async (imageName) => {
        try {
            const apiUrl = process.env.REACT_APP_URL_API;
            const response = await fetch(`${apiUrl}cms/images/${imageName}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error deleting image:', error);
            throw error;
        }
    },

};

export default CmsService;