import { useEffect, useState } from 'react';
import SelectClientes from '../components/clientes/SelectClientes';
import ClientAddresses from '../components/clientes/ClientAddresses';
import OrdersService from '../components/orders/ordersService';
import { DataComanda } from '../components/orders/DataComanda';
import PreuComanda from '../components/orders/PreuComanda';

const FormOrder = () => {
    const ordersService = OrdersService();
    const [visible, setVisible] = useState(false)
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [product, setProduct] = useState(null);
    const [price, setPrice] = useState(null);
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const fetchProduct = async () => {
            const productData = await ordersService.getProductID();
            setProduct(productData);
        };
        fetchProduct();
    }, []);


    const handleClick = async () => {
        setVisible(true)
    }

    const closeModal = () => {
        setVisible(false);
    }

    const createOrder = async () => {
        console.log('id_cliente', selectedClient?.id, ' id_address', selectedAddress?.id_address, 'product', product, 'price', price, 'date', startDate)
        ordersService.createCart(selectedClient?.id, selectedAddress?.id_address, product, price, startDate)
    }


    return (
        <div className="bg-white p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-2">Crear un nuevo pedido</h2>
            <div className="mt-4">
                {selectedClient && (
                    <>
                        <div>
                            <h3 className="font-semibold text-lg">Cliente seleccionado</h3>
                            <p>{selectedClient.name}</p>
                        </div>
                        <div className="mt-4">
                            <h3 className="font-semibold text-lg">Direcciones</h3>
                        </div>
                        <ClientAddresses
                            id_cliente={selectedClient.id}
                            setSelectedAddress={setSelectedAddress} />
                    </>
                )}
                {!selectedClient && (
                    <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        Seleccionar cliente
                    </button>
                )}

                {selectedClient && selectedAddress && (
                    <>
                        <div className="flex justify-around items-center mt-4">
                            <PreuComanda setPrice={setPrice} />
                            <DataComanda setStartDate={setStartDate} />
                        </div>
                        <button onClick={createOrder} disabled={!price || price < 0} className={`text-white mt-5 px-4 py-2 rounded ${price < 1 ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'}`}>
                            Crear pedido
                        </button>
                    </>
                )}
            </div>
            <SelectClientes
                visible={visible}
                onClose={closeModal}
                setSelectedClient={setSelectedClient}
            />
        </div>
    )
};

export default FormOrder;