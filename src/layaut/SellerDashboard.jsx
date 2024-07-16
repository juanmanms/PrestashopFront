
import { Header } from '../components/shared/Header';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';


function SellerDashboard() {


    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/seller" element={<h1>Seller</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default SellerDashboard;