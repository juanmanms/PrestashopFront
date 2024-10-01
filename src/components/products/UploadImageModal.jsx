import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import UpFireBase from '../shared/UpFireBase';


const UploadImageModal = ({ visible, onClose, product }) => {
    return (
        <Modal
            title="Cargar Imagen"
            visible={visible}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose} className="bg-gray-200 hover:bg-gray-300 text-black">
                    Cancelar
                </Button>,

            ]}
            className="p-4 flex justify-center items-center"
        >
            <div className="text-center">
                <h2 className="text-sm font-medium">Nombre: {product.product_name.slice(0, 15)}</h2>
                <h3 className="text-sm font-medium">ID: {product.id_product}</h3>
                <UpFireBase id={product.id_product} onClose={onClose} />
            </div>
        </Modal>
    );
}

UploadImageModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.object.isRequired

}

export default UploadImageModal