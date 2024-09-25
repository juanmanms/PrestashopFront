import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <Link to="/productos" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Productos</Link>
                        </li>
                        <li>
                            <Link to="/combinaciones" className="text-gray-900 dark:text-white hover:underline" disabled >Combinaciones</Link>
                        </li>
                        <li>
                            <Link to="/imagenes" className="text-gray-900 dark:text-white hover:underline" disabled >Imagenes</Link>
                        </li>
                        <li>
                            <Link to="/order" className="text-gray-900 dark:text-white hover:underline" disabled >Pedidos</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar