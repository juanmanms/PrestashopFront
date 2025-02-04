


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
            const response = await fetch(`${apiUrl}products/combinations/price`, {
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

    const deleteCombination = async (id_product_attribute) => {
        try {
            const response = await fetch(`${apiUrl}products/combinations`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`, // Asumiendo que necesitas autenticación
                },
                body: JSON.stringify({
                    id: id_product_attribute,
                }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            // Verificar si la respuesta es JSON antes de parsearla
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log(data.message); // "Combination deleted"
            } else {
                const errorText = await response.text();
                console.error('Unexpected content type:', contentType, 'Response:', errorText);
                throw new Error('Unexpected content type: ' + contentType);
            }
        } catch (error) {
            console.error('Error deleting combination:', error);
        }
    }

    const getImagenes = async (callback) => {
        await fetch(`${apiUrl}products/imagenes`, {
            method: 'GET',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Get images failed');
            })
            .then((data) => {
                callback(data)
            })
            .catch((error) => {
                console.error('Get images error:', error);
            }
            );
    }

    const uploadImage = async (image) => {
        try {
            const formData = new FormData();
            formData.append('image', image);

            const response = await fetch(`${apiUrl}/products/imagenes`, {
                method: 'POST',
                headers: {
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload image failed');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Upload image error:', error);
            throw error;
        }
    };

    const deleteImage = async (id_product, id_image) => {
        console.log('Borrar imagen:', id_image, 'del producto:', id_product);
        await fetch(`${apiUrl}products/imagenes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
                id_product: id_product,
                id_image: id_image,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Delete image failed');
            })
            .then((data) => {
                console.log(data.message); // "Image deleted"
            })
            .catch((error) => {
                console.error('Delete image error:', error);
            });
    }

    const getProductsBySeller = async (id_seller) => {
        console.log('id_seller:', id_seller);
        try {
            const response = await fetch(`${apiUrl}products/productos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    id: id_seller,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get products by seller error:', error);
            throw error;
        }
    };

    const getProdutsCategories = async () => {
        try {
            const response = await fetch(`${apiUrl}products/categorias`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get products categories error:', error);
            throw error;
        }
    };

    const addProductCategory = async (id_product, id_category) => {
        console.log('id_product:', id_product, 'id_category:', id_category, 'creando');
        try {
            const response = await fetch(`${apiUrl}products/categorias-add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    id_product: id_product,
                    id_category: id_category,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.message); // "Category added"
        } catch {
            console.error('Error adding product category:');
        }

    };

    const deleteProductCategory = async (id_product, id_category) => {
        console.log('id_product:', id_product, 'id_category:', id_category, 'eliminando');
        try {
            const response = await fetch(`${apiUrl}products/categorias-delete-product`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    id_product: id_product,
                    id_category: id_category,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log(data.message); // "Category added"
        } catch {
            console.error('Error adding product category:');
        }
    };

    const createProduct = async (product) => {
        try {
            const response = await fetch(`${apiUrl}products/add-product`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(product),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Create product error:', error);
            throw error;
        }
    };




    return {
        updateProductPriceInDB,
        updateProductIVAInDB,
        getProducts,
        getCombinations,
        updateProductActiveInDB,
        updateProductNameInDB,
        getAttributes,
        addCombination,
        updatePriceCombinationInDB,
        deleteCombination,
        getImagenes,
        uploadImage,
        deleteImage,
        getProductsBySeller,
        getProdutsCategories,
        addProductCategory,
        deleteProductCategory,
        createProduct
    }
}

export default ProductService;


