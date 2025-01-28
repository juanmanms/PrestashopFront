
import { Header } from '../components/shared/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CombinationPage from '../pages/CombinationPage';
import FormOrder from '../pages/FormOrder';
import ImagesPage from '../pages/ImagesPage';
import CustomerForm from '../pages/CustomerForm';
import RepartidorPage from '../pages/RepartidorPage';
import ConsultasPage from '../pages/ConsultasPage';
import ConfigPage from '../pages/ConfigPage';
import ClientesPage from '../pages/ClientesPage';
import CategoryPage from '../pages/CategoryPage';
import NotFoundPage from '../pages/NotFoundPage';


function SellerDashboard() {


    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/productos" element={<ProductsPage />} />
                <Route path="/combinaciones" element={<CombinationPage />} />
                <Route path="/seller" element={<h1>Seller</h1>} />
                <Route path="/order" element={<FormOrder />} />
                <Route path="/imagenes" element={<ImagesPage />} />
                <Route path="/cliente" element={<CustomerForm />} />
                <Route path="/repartos" element={<RepartidorPage />} />
                <Route path="/consultas" element={<ConsultasPage />} />
                <Route path="/configuracion" element={<ConfigPage />} />
                <Route path="/clientes" element={<ClientesPage />} />
                <Route path="/productos-categorias" element={<CategoryPage />} />
                <Route path="*" element={<NotFoundPage />} /> {/* Ruta para la página 404 */}
            </Routes>
        </BrowserRouter>
    );
}

export default SellerDashboard;