import './App.css'
import { useEffect, useState } from 'react'
import Login from './components/login/login'
import SellerDashboard from './layaut/SellerDashboard';
import { useSelector } from 'react-redux';
import HorariosIframe from './pages/HorariosIframe';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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
    <Router>
      <Routes>
        <Route path="/" element={auth ? <SellerDashboard /> : <Login />} />
        <Route path="/horarios-iframe" element={<HorariosIframe />} />
      </Routes>
    </Router>
  );
}

export default App
