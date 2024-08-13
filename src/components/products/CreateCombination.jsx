import { useState, useEffect, useMemo } from 'react';

import ProductService from './ProductService';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const CreateCombination = ({ selectedProduct, isOpen, onClose }) => {
    const productsService = useMemo(() => ProductService(), []);
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        productsService.getAttributes()
            .then((data) => {
                setAttributes(data);
            })
            .catch((error) => {
                console.error('Get attributes error:', error);
            });
    }, [productsService]);




    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Combination" >
            <h2>Crear Combinación de {selectedProduct.product_name}</h2>
            <div>
                {attributes.map((attribute) => (

                    <div key={attribute.id_attribute}>
                        <h3>{attribute.name}</h3>
                    </div>
                ))}
            </div>


        </Modal>
    );
};
CreateCombination.propTypes = {
    selectedProduct: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CreateCombination;