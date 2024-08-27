


export const ProductService = () => {
    const apiUrl = process.env.REACT_APP_URL_API;

    const updateProductPriceInDB = async (id_product, price) => {
        try {
            const response = await fetch(`${apiUrl}products`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product,
                    price: price,
                }),
            });

            const data = await response.json();
            console.log(data.message); // "Product updated"
        } catch (error) {
            console.error('Error updating product price:', error);
        }
    };

    const updateProductIVAInDB = async (id_product, id_tax_rules_group) => {
        try {
            const response = await fetch(`${apiUrl}products/iva`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product,
                    iva: id_tax_rules_group,
                }),
            });

            const data = await response.json();
            console.log(data.message); // "Product updated"
        } catch (error) {
            console.error('Error updating product IVA:', error);
        }
    }

    const getProducts = async (callback) => {
        await fetch(`${apiUrl}products`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get products failed');
            })
            .then((data) => {
                callback(data)
                //setProducts(data); // Assuming the data is an array of products
                //setFilteredProducts(data); // Inicialmente, todos los productos están "filtrados"
            })
            .catch((error) => {
                console.error('Get products error:', error);
            });
    };

    const updateProductActiveInDB = async (id_product, active) => {
        try {
            const response = await fetch(`${apiUrl}products/active`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product,
                    active: active,
                }),
            });

            const data = await response.json();
            console.log(data.message); // "Product updated"
        } catch (error) {
            console.error('Error updating product active:', error);
        }
    }

    //Servicios de combinaciones
    const getCombinations = async (callback) => {
        await fetch(`${apiUrl}products/combinations`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get combinations failed');
            })
            .then((data) => {
                callback(data)
                //setProducts(data); // Assuming the data is an array of products
                //setFilteredProducts(data); // Inicialmente, todos los productos están "filtrados"
            })
            .catch((error) => {
                console.error('Get combinations error:', error);
            }
            );
    }

    const updateProductNameInDB = async (id_product, name) => {
        try {
            const response = await fetch(`${apiUrl}products/name`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product,
                    name: name,
                }),
            });

            const data = await response.json();
            console.log(data.message); // "Product updated"
        } catch (error) {
            console.error('Error updating product name:', error);
        }
    }

    const getAttributes = async () => {
        try {
            const response = await fetch(`${apiUrl}attributes/group`, {
                method: 'GET',
            });

            const data = await response.json();
            console.log(data); // Array of attributes
            return data;
        }
        catch (error) {
            console.error('Error getting attributes:', error);
        }
    }

    const addCombination = async (attribute, id) => {
        try {
            const response = await fetch(`${apiUrl}products/combinations/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id,
                    atributo: attribute,
                }),
            });

            const data = await response.json();
            console.log(data.message); // "Combination added"
        } catch (error) {
            console.error('Error adding combination:', error);
        }
    }

    const updatePriceCombinationInDB = async (id_product_attribute, price) => {
        try {
            const response = await fetch(`${apiUrl}products/combinations/active`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product_attribute,
                    price: price,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            const data = await response.json();
            console.log(data.message); // "Price updated"
        } catch (error) {
            console.error('Error updating combination price:', error);
        }
    }




    return {
        updateProductPriceInDB,
        updateProductIVAInDB,
        getProducts,
        getCombinations,
        updateProductActiveInDB,
        updateProductNameInDB,
        getAttributes,
        addCombination,
        updatePriceCombinationInDB
    }
}

export default ProductService;


