import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto flex items-center justify-between">
                <button
                    onClick={toggleMenu}
                    className="text-gray-900 dark:text-white md:hidden focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                        ></path>
                    </svg>
                </button>
                <ul className="hidden md:flex md:flex-row md:space-x-8 rtl:space-x-reverse text-sm font-medium">
                    <li>
                        <Link to="/productos" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Productos</Link>
                    </li>
                    <li>
                        <Link to="/combinaciones" className="text-gray-900 dark:text-white hover:underline" disabled>Combinaciones</Link>
                    </li>
                    <li>
                        <Link to="/imagenes" className="text-gray-900 dark:text-white hover:underline" disabled>Imagenes</Link>
                    </li>
                    <li>
                        <Link to="/order" className="text-gray-900 dark:text-white hover:underline" disabled>Pedidos</Link>
                    </li>
                </ul>
            </div>
            {/* Modal lateral */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-gray-50 dark:bg-gray-800 z-50 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 md:hidden`}>
                <button
                    onClick={toggleMenu}
                    className="absolute top-4 right-4 text-gray-900 dark:text-white focus:outline-none"
                >
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
                <ul className="flex flex-col space-y-4 mt-12 px-4 text-sm">
                    <li>
                        <Link to="/productos" className="text-gray-900 dark:text-white hover:underline" onClick={toggleMenu}>Productos</Link>
                    </li>
                    <li>
                        <Link to="/combinaciones" className="text-gray-900 dark:text-white hover:underline" disabled onClick={toggleMenu}>Combinaciones</Link>
                    </li>
                    <li>
                        <Link to="/imagenes" className="text-gray-900 dark:text-white hover:underline" disabled onClick={toggleMenu}>Imagenes</Link>
                    </li>
                    <li>
                        <Link to="/order" className="text-gray-900 dark:text-white hover:underline" disabled onClick={toggleMenu}>Pedidos</Link>
                    </li>
                </ul>
            </div>
            {/* Fondo oscuro cuando el menú está abierto */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={toggleMenu}
                ></div>
            )}
        </nav>
    );
};

export default NavBar;
