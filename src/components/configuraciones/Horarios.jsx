import { message } from 'antd';
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

    const baseUrl = process.env.REACT_APP_URL_HOME + 'img/horarios/';

    const handle = (index) => {
        message.error(`No desarrollado todavia
        ${index}`);

    }

    return (
        <div>
            <h3 className="mb-4 text-lg font-semibold">Horarios</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-3 flex justify-center items-center">
                        <span>Cargando...</span>
                    </div>
                ) : (
                    <>
                        {horarios.map((horario, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-white rounded shadow p-4">
                                <img
                                    src={`${baseUrl}${horario}`}
                                    alt={`Horario ${idx}`}
                                    className="mb-4 w-full h-40 object-contain"
                                />
                                <div className="flex gap-2">
                                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm" onClick={() => handle(idx)}>
                                        Eliminar
                                    </button>
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm" onClick={() => handle(idx)}>
                                        Modificar
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded shadow p-4">
                            <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm w-full h-40 flex items-center justify-center">
                                Añadir
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Horarios;