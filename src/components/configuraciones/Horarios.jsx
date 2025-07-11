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

    const baseUrl = process.env.REACT_APP_URL_HOME + 'cms/images/';

    return (
        <div>
            <h3>
                Horarios
            </h3>

            <ul>
                {loading ? (
                    <li>Cargando...</li>
                ) : (
                    horarios.map((horario, idx) => (
                        <li key={idx}>
                            <img src={`${baseUrl}${horario}`} alt={`Horario ${idx}`} />
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default Horarios;