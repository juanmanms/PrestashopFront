import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const HomePage = () => {

    const user = useSelector((state) => state.user);
    //funcion para eliminar token de localstorage

    return (
        <div className="bg-gray-200 p-4">

            <h1 className="text-2xl font-bold mb-4">Dashboard del Vendedor:<br />
                <span className='bg-red-200'>{user.name}</span>
            </h1>
            <p className="mb-4">Bienvenido a tu dashboard, aquí puedes gestionar tus productos y ventas</p>

            {/* Aquí puedes añadir más componentes o lógica, como listados de productos, gráficas de ventas, etc. */}
            <Link to="/order" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Crear Pedido
            </Link>

        </div>
    )
}

export default HomePage