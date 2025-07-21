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

    const handleMouseMove = (e) => {
        const container = e.currentTarget;
        const image = container.querySelector('.horario-image');
        const magnifier = container.querySelector('.magnifier');
        
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Posicionar la lupa
        magnifier.style.left = `${x - 75}px`;
        magnifier.style.top = `${y - 75}px`;
        magnifier.style.display = 'block';
        
        // Calcular la posición en la imagen original
        const imageRect = image.getBoundingClientRect();
        const imageX = ((x - (imageRect.left - rect.left)) / imageRect.width) * 100;
        const imageY = ((y - (imageRect.top - rect.top)) / imageRect.height) * 100;
        
        // Aplicar el background position a la lupa
        magnifier.style.backgroundPosition = `${imageX}% ${imageY}%`;
    };

    const handleMouseLeave = (e) => {
        const magnifier = e.currentTarget.querySelector('.magnifier');
        magnifier.style.display = 'none';
    };

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
                        <div 
                            className="image-container"
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                        >
                            <img
                                src={`${baseUrl}${horario}`}
                                alt={`Horario ${idx + 1}`}
                                className="horario-image"
                            />
                            <div 
                                className="magnifier"
                                style={{
                                    backgroundImage: `url(${baseUrl}${horario})`,
                                }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HorariosIframe;