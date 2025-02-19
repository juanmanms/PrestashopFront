import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { OdersOnline } from '../components/orders/OdersOnline';

const HomePage = () => {

    const user = useSelector((state) => state.user);
    //funcion para eliminar token de localstorage


    return (
        <>
            <div className="bg-gray-200 p-4 m-2">
                <h1 className="text-2xl font-bold mb-4">Dashboard del Vendedor:<br />
                    <span className='bg-red-200'>{user.name}</span>
                </h1>
                <p className="mb-4">Bienvenido a tu panel de control, aquí puedes gestionar tus productos y ventas</p>

                {user.id_seller && (
                    <Link to="/order" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Crear Pedido
                    </Link>
                )}


            </div>
            <div className="bg-gray-200 p-4 m-2">

                <OdersOnline />
            </div>
        </>
    );
}

export default HomePage