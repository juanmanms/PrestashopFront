import { useState } from "react"
import SelectClientes from "../clientes/SelectClientes"


const CreateOrder = () => {

    const [visible, setVisible] = useState(false)


    const handleClick = async () => {
        setVisible(true)
        console.log('Crear un otro pedido', visible)
    }

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <>
            <div className="bg-white p-4 rounded shadow-md">
                <h2 className="text-xl font-semibold mb-2">Crear un nuevo pedido</h2>
                <p className="mb-4">Comienza a crear un nuevo pedido seleccionando los productos y añadiendo los detalles del cliente.</p>
                <button onClick={handleClick} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Comenzar
                </button>
                <SelectClientes
                    visible={visible}
                    onClose={closeModal}
                />
            </div>

        </>
    )
}

export default CreateOrder