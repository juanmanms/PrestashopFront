import PropTypes from 'prop-types';
import ProductosParadas from '../consultas/ProductosParadas';
import HistoricoCien from '../consultas/HistoricoCien';
import ResumCliente from '../consultas/ResumCliente';
import ResumPagos from '../consultas/ResumenPagos';
import ClienteMoreAddress from '../consultas/ClienteMoreAddress';
import SinFotos from '../consultas/SinFotos';
import SinCategorias from '../consultas/SinCategorias';
import InfoSeller from '../consultas/InfoSeller';
import ResumParadas from '../consultas/ResumenParadas';

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
                {id === 4 && <ResumPagos />}
                {id === 5 && <SinFotos />}
                {id === 6 && <SinCategorias />}
                {id === 7 && <ClienteMoreAddress />}
                {id === 8 && <InfoSeller />}
                {id === 9 && <ResumParadas />}
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