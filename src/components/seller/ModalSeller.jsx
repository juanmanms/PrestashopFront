import { useEffect, useState, useMemo } from 'react';
import { Modal, Button, message } from 'antd';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import Editor from 'react-simple-wysiwyg';
import SellerService from './SellerService';

const ModalSeller = ({ visible, onClose, vendedor }) => {
    const sellerService = useMemo(() => SellerService(), []);

    const [formValues, setFormValues] = useState({
        Categoria: '',
        description: '',
        email: '',
        phone: '',
        whatsapp: '',
        instagram: '',
        facebook: '',
        Telefono: '',
        keyword: [],
        Imagen_Categoria: '',
    });
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (vendedor) {
            setFormValues({
                ...formValues,
                Categoria: vendedor.Categoria,
                description: vendedor.description,
                email: vendedor.email,
                phone: vendedor.phone,
                whatsapp: vendedor.Whatsapp,
                instagram: vendedor.Instagram,
                facebook: vendedor.Facebook,
                telefono: vendedor.Telefono,
                keyword: vendedor.keyword ? vendedor.keyword.split(', ') : [],
                Imagen_Categoria: vendedor.Imagen_Categoria
                    ? vendedor.Imagen_Categoria + '?t=' + Date.now()
                    : '',
            });
        }
        // eslint-disable-next-line
    }, [vendedor]);

    const handleKeywordChange = (index, value) => {
        const newKeywords = [...formValues.keyword];
        newKeywords[index] = value;
        setFormValues({
            ...formValues,
            keyword: newKeywords,
        });
    };

    const handleSave = () => {
        sellerService.updateCategory(
            vendedor.ID_Categoria,
            formValues.description,
            formValues.keyword.join(', '),
            formValues.telefono,
            formValues.whatsapp,
            formValues.facebook,
            formValues.instagram
        )

        onClose();
    };

    // NUEVO: Cambiar imagen y subirla al servidor
    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append('image', file);
        formData.append('id_category', vendedor.ID_Categoria);

        try {
            const response = await fetch(`${process.env.REACT_APP_URL_API}categories/upload-image`, {
                method: 'POST',
                body: formData,
            });
            if (!response.ok) throw new Error('Error al subir la imagen');
            const data = await response.json();
            // Al actualizar la imagen tras subirla:
            setFormValues({
                ...formValues,
                Imagen_Categoria: (data.imageUrl || formValues.Imagen_Categoria) + '?t=' + Date.now(),
            });
            message.success('Imagen subida correctamente');
        } catch (err) {
            message.error('Error al subir la imagen');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Modal
            width={800}
            title="Datos de vendedor"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Cerrar
                </Button>,
                <Button key="save" type="primary" onClick={handleSave}>
                    Guardar
                </Button>,
            ]}
        >
            <div className="modal-seller-content">
                <h3 className='mt-2 font-black'>Sección de vendedor</h3>
                <section className="info-seller bg-slate-500 p-4 rounded-lg text-white">
                    <p className="mt-2 ">Vendedor <strong>{vendedor.Vendedor}</strong> con id: {vendedor.ID_Vendedor} </p>
                    <p><strong>Contacto:</strong> Teléfono: <a href={`tel:${vendedor.phone}`}>{vendedor.phone}</a>, Email: <a href={`mailto:${vendedor.email}`}>{vendedor.email}</a></p>

                </section>
                <br />
                <br />
                <h3 className='mt-2 font-black'>Sección de categoría</h3>
                <section className="info-categoria bg-slate-500 p-4 rounded-lg text-white mb-2">
                    <p className="mt-2 ">Categoría <strong>{vendedor.Categoria}</strong> con id: {vendedor.ID_Categoria} </p>
                </section>
                <hr />
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Teléfono</label>
                        <Input
                            type="text"
                            value={formValues.telefono || ''}
                            onChange={(e) => setFormValues({ ...formValues, telefono: e.target.value })}
                            placeholder="Teléfono"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label>WhatsApp</label>
                        <Input
                            type="text"
                            value={formValues.whatsapp || ''}
                            onChange={(e) => setFormValues({ ...formValues, whatsapp: e.target.value })}
                            placeholder="WhatsApp"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label>Facebook</label>
                        <Input
                            type="text"
                            value={formValues.facebook || ''}
                            onChange={(e) => setFormValues({ ...formValues, facebook: e.target.value })}
                            placeholder="Facebook"
                            className="mb-2"
                        />
                    </div>
                    <div>
                        <label>Instagram</label>
                        <Input
                            type="text"
                            value={formValues.instagram || ''}
                            onChange={(e) => setFormValues({ ...formValues, instagram: e.target.value })}
                            placeholder="Instagram"
                            className="mb-2"
                        />
                    </div>
                </div>
                <div className="contacto-item mb-2">
                    <label>Teléfono</label>
                    <Input
                        type="text"
                        value={formValues.keyword[0] || ''}
                        onChange={(e) => handleKeywordChange(0, e.target.value)}
                        placeholder="Teléfono"
                        className="mb-2"
                    />
                </div>
                <div className="contacto-item mb-2">
                    <label>WhatsApp (siempre con +34)</label>
                    <Input
                        type="text"
                        value={formValues.keyword[1] || ''}
                        onChange={(e) => handleKeywordChange(1, e.target.value)}
                        placeholder="WhatsApp"
                        className="mb-2"
                    />
                </div>
                <div className="form-group mt-4">
                    <label htmlFor="customInput">Descripcion</label>
                    <Editor
                        value={formValues.description || vendedor.description}
                        onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                        className="editor"
                        toolbarClassName="toolbarClassName"
                        editorClassName="editorClassName"
                        wrapperClassName="wrapperClassName"
                        toolbarStyle={{ display: 'flex', justifyContent: 'space-between' }}
                        editorStyle={{ height: '200px', border: '1px solid #ccc', padding: '10px' }}
                    />
                    <div className="modal-seller-image" style={{ marginTop: 16 }}>
                        {formValues.Imagen_Categoria && (
                            <img src={formValues.Imagen_Categoria} alt="Imagen de Categoría" style={{ width: 'auto', height: 'auto', maxHeight: 200 }} />
                        )}
                        <div style={{ marginTop: 8 }}>
                            <Button
                                onClick={() => document.getElementById('input-img-cat').click()}
                                loading={uploading}
                            >
                                Cambiar imagen
                            </Button>
                            <input
                                id="input-img-cat"
                                type="file"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </Modal>
    );
}

ModalSeller.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    vendedor: PropTypes.object.isRequired,
};

export default ModalSeller;
