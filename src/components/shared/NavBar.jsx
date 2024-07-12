import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-50 dark:bg-gray-700">
            <div className="max-w-screen-xl px-4 py-3 mx-auto">
                <div className="flex items-center">
                    <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Precios</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline" disabled >IVA</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline" disabled >Imagenes</a>
                        </li>
                        <li>
                            <a href="#" className="text-gray-900 dark:text-white hover:underline" disabled >Categorias</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar