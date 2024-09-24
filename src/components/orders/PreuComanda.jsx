
import PropTypes from 'prop-types';
const PreuComanda = ({ setPrice }) => {

    const handlePrice = (e) => {
        setPrice(Number(e.target.value))
    }

    return (
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
                Precio de Pedido
            </label>
            <input
                type="number"
                placeholder='Ingrese el precio de la comanda'
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handlePrice}
            />
        </div>
    )
}

PreuComanda.propTypes = {
    setPrice: PropTypes.func.isRequired,
}

export default PreuComanda