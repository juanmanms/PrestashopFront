import { message } from 'antd';
import CmsService from '../../common/service/cmsService';
import { useEffect, useMemo, useState, useRef } from 'react';

const Horarios = () => {
    const cmsService = useMemo(() => CmsService, []);
    const [horarios, setHorarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = useRef(null);
    const [uploading, setUploading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalImage, setModalImage] = useState('');

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

    const handleDeleteImage = async (imageName) => {
        try {
            await cmsService.deleteImage(imageName);
            setHorarios(prevHorarios => prevHorarios.filter(horario => horario !== imageName));
            message.success('Imagen eliminada correctamente');
        } catch (error) {
            console.error('Error deleting image:', error);
            message.error('Error al eliminar la imagen');
        }
    };

    const handleAddImage = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('filename', file.name);

        try {
            const result = await cmsService.addImage(formData);
            if (result && result.filename) {
                setHorarios(prev => [...prev, result.filename]);
                message.success('Imagen añadida correctamente');
            } else {
                message.error('No se pudo añadir la imagen');
            }
        } catch (error) {
            console.error('Error adding image:', error);
            message.error('Error al añadir la imagen');
        } finally {
            setUploading(false);
            e.target.value = '';
        }
    };

    const openModal = (image) => {
        setModalImage(image);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setModalImage('');
    };

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
                                    className="mb-4 w-full h-40 object-contain cursor-pointer"
                                    onClick={() => openModal(`${baseUrl}${horario}`)}
                                />
                                <div className="flex gap-2">
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                        onClick={() => handleDeleteImage(horario)}
                                    >
                                        Eliminar
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                                        onClick={() => openModal(`${baseUrl}${horario}`)}
                                    >
                                        Ver grande
                                    </button>
                                </div>
                            </div>
                        ))}
                        <div className="flex flex-col items-center justify-center bg-gray-100 rounded shadow p-4">
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-sm w-full h-40 flex items-center justify-center"
                                onClick={handleAddImage}
                                loading={uploading}
                            >
                                Añadir
                            </button>
                            <input
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                ref={fileInputRef}
                            />
                        </div>
                    </>
                )}
            </div>
            {modalOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white rounded-lg p-4 max-w-3xl w-full flex flex-col items-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <img src={modalImage} alt="Horario grande" className="max-h-[80vh] w-auto mb-4" />
                        <button
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900"
                            onClick={closeModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Horarios;