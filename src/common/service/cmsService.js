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
            const formData = new FormData();
            formData.append('file', imageData.file);
            formData.append('filename', imageData.filename);
            const response = await fetch(`${apiUrl}cms/images`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('Error adding image:', error);
            throw error;
        }
    },

};

export default CmsService;