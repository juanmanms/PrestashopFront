import NavBar from "./NavBar"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { logout } from "../login/loginService";


export const Header = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout(dispatch);
    };

    return (
        <>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <a href={process.env.REACT_APP_URL_HOME} className="flex items-center space-x-3 rtl:space-x-reverse">

                        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">{process.env.REACT_APP_NombreEmpresa}</span>
                    </a>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        {/* <Link to="seller" className="text-sm text-gray-500 dark:text-white hover:underline">{user.name}</Link> */}
                        <span>{user.name}</span>
                        <button onClick={handleLogout} className="text-sm text-blue-600 dark:text-blue-500 hover:underline">Cerrar</button>
                    </div>
                </div>
            </nav>
            <NavBar />
        </>
    )
}
