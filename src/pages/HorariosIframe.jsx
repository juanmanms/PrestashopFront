import { useState, useEffect } from 'react';
import CmsService from '../common/service/cmsService';
import '../iframe.css';

const HorariosIframe = () => {
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHorarios = async () => {
            try {
                const images = await CmsService.getImages();
                setHorarios(images);
            } catch (error) {
                console.error('Error fetching horarios:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchHorarios();
    }, []);

    const baseUrl = process.env.REACT_APP_URL_HOME + 'img/horarios/';

    if (loading) {
        return (
            <div className="iframe-container">
                <div className="loading">
                    <span>Cargando horarios...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="iframe-container">
            <div className="horarios-grid">
                {horarios.map((horario, idx) => (
                    <div key={idx} className="horario-item">
                        <div className="image-container">
                            <img
                                src={`${baseUrl}${horario}`}
                                alt={`Horario ${idx + 1}`}
                                className="horario-image"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorariosIframe;