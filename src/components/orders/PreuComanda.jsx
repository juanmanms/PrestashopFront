
import PropTypes from 'prop-types';
const PreuComanda = ({ setPrice }) => {

    const handlePrice = (e) => {
        setPrice(Number(e.target.value))
    }

    return (
        <div className="mt-5">
            <label className="block text-sm font-medium text-gray-700">
                Precio de Pedido
            </label>
            <input
                type="number"
                placeholder='Ingrese el precio de la comanda'
                className="mt-1 w-96 px-3 py-2 border border-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm placeholder:font-bold bg-blue-600 focus:bg-transparent text-center font-bold text-white focus:text-black"
                onChange={handlePrice}

            />
        </div>
    )
}

PreuComanda.propTypes = {
    setPrice: PropTypes.func.isRequired,
}

export default PreuComanda