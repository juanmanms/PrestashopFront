
import PropTypes from 'prop-types';



const SearchProduct = ({ searchTerm, setSearchTerm }) => {

    return (
        <input
            type="text"
            placeholder="Buscar producto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
    )
}
SearchProduct.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    setSearchTerm: PropTypes.func.isRequired
};


export default SearchProduct