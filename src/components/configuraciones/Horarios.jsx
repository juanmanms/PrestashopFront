import CmsService from '../../common/service/cmsService';
import { useEffect, useMemo, useState } from 'react';

const Horarios = () => {
    const cmsService = useMemo(() => CmsService, []);
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const images = await cmsService.getImages();
                setHorarios(images);
            } catch (error) {
                console.error('Error fetching horarios:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHorarios();
    }, [cmsService]);

    return (
        <div>Horarios</div>
    );
}

export default Horarios;