import PropTypes from 'prop-types';
import ProductosParadas from '../consultas/ProductosParadas';
import HistoricoCien from '../consultas/HistoricoCien';
import ResumCliente from '../consultas/ResumCliente';

const Consultas = ({ id, setConsulta }) => {
    // Implementa la lógica para mostrar la consulta basada en el id
    return (
        <>
            <header>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setConsulta(0)}
                >
                    Volver al listado de consultas
                </button>
            </header>
            <div>
                {id === 1 && <ProductosParadas />}
                {id === 2 && <HistoricoCien />}
                {id === 3 && <ResumCliente />}
                {/* Agrega más condiciones según sea necesario */}
                {/* Aquí puedes agregar más lógica para mostrar los detalles de la consulta */}
            </div>
        </>
    );
};

Consultas.propTypes = {
    id: PropTypes.number.isRequired,
    setConsulta: PropTypes.func.isRequired,
};

export default Consultas;