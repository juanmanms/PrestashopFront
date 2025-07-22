import './App.css'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/login'
import SellerDashboard from './layaut/SellerDashboard';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.user);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    //user.token esta vacio auth = false
    if (localStorage.getItem('token')) {
      setAuth(true);
    }
  }, [user, auth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* ejemplo Ruta pública para horarios iframe (sin autenticación ni layout) */}
        {/* <Route path="/horarios-iframe" element={<HorariosIframe />} /> */}

        {/* Todas las demás rutas pasan por autenticación */}
        <Route path="/*" element={auth ? <SellerDashboard /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
