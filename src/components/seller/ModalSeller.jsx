import { Modal, Button } from 'antd';
import PropTypes from 'prop-types';

const ModalSeller = ({ visible, onClose, vendedor }) => {


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
            ]}
        >
            <div className="modal-seller-content">
                <h3 className='font-black	' >Sección de categoría/parada: {vendedor.Categoría}</h3>
                <hr />
                <div className="modal-seller">
                    <div dangerouslySetInnerHTML={{ __html: vendedor.description }} />
                </div>
                <h3 className='mt-2 font-black	'>Sección de Vendedor</h3>
                <hr />
                <p><strong>Email:</strong> <a href={`mailto:${vendedor.email}`}>{vendedor.email}</a></p>
                <p><strong>Teléfono:</strong> <a href={`tel:${vendedor.phone}`}>{vendedor.phone}</a></p>
                <p><strong>Contacto</strong>{vendedor.keyword}</p>
                {vendedor.Imagen_Categoria && (
                    <div className="modal-seller-image">
                        <img src={vendedor.Imagen_Categoria} alt="Imagen de Categoría" style={{ width: '100%', height: 'auto' }} />
                    </div>
                )}
            </div>
        </Modal>
    );
}

ModalSeller.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    vendedor: PropTypes.object.isRequired,
};

export default ModalSeller
