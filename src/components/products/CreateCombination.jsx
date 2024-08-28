import { useState, useEffect, useMemo } from 'react';
import ProductService from './ProductService';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

const CreateCombination = ({ selectedProduct, isOpen, onClose }) => {
    const productsService = useMemo(() => ProductService(), []);
    const [groupedAttributes, setGroupedAttributes] = useState({});
    const [selectedAttributes, setSelectedAttributes] = useState([]);

    useEffect(() => {
        productsService.getAttributes()
            .then((data) => {
                setGroupedAttributes(groupAttributesByGroup(data));
            })
            .catch((error) => {
                console.error('Get attributes error:', error);
            });
    }, [productsService]);

    const groupAttributesByGroup = (attributes) => {
        return attributes.reduce((acc, attribute) => {
            const { id_attribute_group, attribute_group_name, id_attribute, attribute_name } = attribute;
            if (!acc[id_attribute_group]) {
                acc[id_attribute_group] = {
                    groupName: attribute_group_name,
                    attributes: []
                };
            }
            acc[id_attribute_group].attributes.push({ id_attribute, attribute_name });
            return acc;
        }, {});
    };

    const handleCheckboxChange = (id_attribute) => {
        setSelectedAttributes((prevSelected) => {
            if (prevSelected.includes(id_attribute)) {
                return prevSelected.filter(attr => attr !== id_attribute);
            } else {
                return [...prevSelected, id_attribute];
            }
        });
    };

    const handleSubmit = () => {
        const data = {
            productId: selectedProduct.id_product,
            attributes: selectedAttributes
        };

        data.attributes.map((attribute) => {
            console.log('attribute:', attribute, 'productId:', data.productId);
            productsService.addCombination(attribute, data.productId);
        });

        setTimeout(() => {
            window.location.href = '/combinaciones';
        }, 2000);
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Create Combination" >
            <h2>{selectedProduct.product_name}</h2>
            <h3>Selecciona los atributos que quieras añadir</h3>
            <div className="grid grid-cols-3 gap-4">
                {Object.entries(groupedAttributes).map(([groupId, group]) => (
                    <div key={groupId} className="border p-4">
                        <h3 className="font-bold mb-2">{group.groupName}</h3>
                        {group.attributes.map(attribute => (
                            <div key={attribute.id_attribute} className="mb-2">
                                <label>
                                    <input
                                        type="checkbox"
                                        value={attribute.id_attribute}
                                        onChange={() => handleCheckboxChange(attribute.id_attribute)}
                                    />
                                    {attribute.attribute_name}
                                </label>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit} className="mt-4 p-2 bg-blue-500 text-white">Generar</button>
        </Modal>
    );
};

CreateCombination.propTypes = {
    selectedProduct: PropTypes.object.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
};

export default CreateCombination;