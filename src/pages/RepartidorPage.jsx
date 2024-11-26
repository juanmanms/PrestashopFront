import { useEffect, useState } from 'react';
import TablePedidos from '../components/orders/TablePedidos';
import TableOrdersPendientes from '../components/orders/TableOrdersPendientes';

const RepartidorPage = () => {
    const [cliente, setCliente] = useState();

    useEffect(() => {
        console.log(cliente);
    }, [cliente])


    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-semibold text-center">Pedidos</h1>
            {cliente ? <TableOrdersPendientes cliente={cliente} setCliente={setCliente} /> : <TablePedidos setCliente={setCliente} />}
        </div>
    )
}

export default RepartidorPage