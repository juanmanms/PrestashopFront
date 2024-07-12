import './App.css'
import { useEffect, useState } from 'react'
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


  return auth ? (<SellerDashboard />) : (<Login />);
  //return (<Login />);
}

export default App
