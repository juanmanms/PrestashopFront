import PropTypes from 'prop-types';
import DiasReparto from '../configuraciones/DiasReparto';
import OpcionesPago from '../configuraciones/OpcionesPago';
import OpcionesReparto from '../configuraciones/OpcionesReparto';
import CodigosPostales from '../configuraciones/CodigosPostales';
import Horarios from '../configuraciones/Horarios';
import Actividades from '../configuraciones/Actividades';

const Configuraciones = ({ id, setConsfiguraciones }) => {
    // Implementa la lógica para mostrar la consulta basada en el id
    return (
        <>
            <header>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setConsfiguraciones(0)}>Atrás</button>
            </header>
            <div>
                {id === 1 && <DiasReparto />}
                {id === 2 && <OpcionesReparto />}
                {id === 3 && <OpcionesPago />}
                {id === 4 && <CodigosPostales />}
                {id === 5 && <Horarios />}
                {id === 6 && <Actividades />}
                {/* Puedes agregar más condiciones según sea necesario */}

                {/* Agrega más condiciones según sea necesario
                {/* Aquí puedes agregar más lógica para mostrar los detalles de la consulta */}
            </div>
        </>
    );
};

Configuraciones.propTypes = {
    id: PropTypes.number.isRequired,
    setConsfiguraciones: PropTypes.func.isRequired,
};

export default Configuraciones;