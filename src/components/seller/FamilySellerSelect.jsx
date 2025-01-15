import { useEffect, useState, useMemo } from 'react';
import ProductService from '../products/ProductService';
import PropTypes from 'prop-types';

const FamilySellerSelect = ({ productId, subcategories, familys }) => {
    const productService = useMemo(() => ProductService(), []);
    const [selectedFamilies, setSelectedFamilies] = useState([]);

    const familysArray = familys.split(',').map(subcategory => {
        const [name, id] = subcategory.split('*').map(item => item.trim());
        return { name, id };
    });

    const handleChange = (familyId, active) => {
        setSelectedFamilies(prevSelectedFamilies => {
            if (active) {
                console.log(`Product ID: ${productId}, Family ID: ${familyId}, se crea: ${active}`);
                productService.addProductCategory(productId, familyId);
                return [...prevSelectedFamilies, familyId];
            } else {
                productService.deleteProductCategory(productId, familyId);
                console.log(`Product ID: ${productId}, Family ID: ${familyId}, se crea: ${active}`);
                return prevSelectedFamilies.filter(id => id !== familyId);

            }
        });
    };

    useEffect(() => {
        setSelectedFamilies(subcategories.map(sub => sub.id));
    }, []);


    return (
        <div className="border p-4 rounded-md" style={{ maxHeight: familysArray.length > 5 ? '200px' : 'auto', overflowY: familysArray.length > 5 ? 'scroll' : 'visible' }}>
            {familysArray.map((family) => (
                <div key={family.id} className="mb-2">
                    <input
                        type="checkbox"
                        id={`family-${family.id}`}
                        name="family"
                        value={family.id}
                        className="mr-2"
                        checked={selectedFamilies.includes(family.id)}
                        onChange={(e) => handleChange(family.id, e.target.checked)}
                    />
                    <label htmlFor={`family-${family.id}`}>{family.name}</label>
                </div>
            ))}
        </div>
    );
}
//};

export default FamilySellerSelect;

FamilySellerSelect.propTypes = {
    productId: PropTypes.number.isRequired,
    subcategories: PropTypes.array.isRequired,
    familys: PropTypes.string.isRequired
};