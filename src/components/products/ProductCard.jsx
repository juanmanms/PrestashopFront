import PropTypes from 'prop-types';

const ProductCard = ({ product, onEdit, onDelete }) => {
    const formatPrice = (price) => {
        return parseFloat(price).toFixed(2);
    };

    return (
        <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{product.id_product}</h2>
            <h3 className="text-lg font-bold mb-2">{product.product_name}</h3>
            <p className="text-gray-700 mb-2">Precio sin IVA: {formatPrice(product.price)}</p>
            <p className="text-gray-700 mb-2">Precio con IVA: {formatPrice(product.precio_IVA || product.price)}</p>
            <p className="text-gray-700 mb-2">IVA: {product.id_tax_rules_group}</p>
            <p className="text-gray-700 mb-2">Activo: {product.active ? '✔' : '❌'}</p>
            <div className="flex justify-content-center">
                <button onClick={() => onEdit(product)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Editar</button>
                <button onClick={() => onDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded">Eliminar</button>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ProductCard;