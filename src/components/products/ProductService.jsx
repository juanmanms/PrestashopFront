


export const ProductService = () => {
    const updateProductPriceInDB = async (id_product, price) => {
        try {
            const response = await fetch('http://localhost:3000/products', {
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
            const response = await fetch('http://localhost:3000/products/iva', {
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
        await fetch('http://localhost:3000/products', {
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

    return {
        updateProductPriceInDB,
        updateProductIVAInDB,
        getProducts
    }
}

export default ProductService;


