import { useState, useEffect } from 'react';
import sellerService from '../services/sellerService';

const useFamilys = (subcategories) => {
    const [familys, setFamilys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFamilies, setSelectedFamilies] = useState([]);

    useEffect(() => {
        const fetchFamilys = async () => {
            try {
                const data = await sellerService.getFamilys();
                setFamilys(data[0].Subcategorías);

                // Inicializar selectedFamilies con las subcategorías existentes
                const initialSelectedFamilies = data[0].Subcategorías.split(',').map(subcategory => {
                    const [, id] = subcategory.split('*').map(item => item.trim());
                    return id;
                }).filter(id => subcategories.some(sub => sub.id === id));

                setSelectedFamilies(initialSelectedFamilies);
            } catch (error) {
                console.error('Error fetching familys:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFamilys();
    }, [subcategories]);

    return { familys, loading, selectedFamilies, setSelectedFamilies };
};

export default useFamilys;