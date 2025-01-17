import { useMemo, useState, useEffect } from 'react'
import ConsultService from "../../common/service/consultService"
import { message } from 'antd'



const ClienteMoreAddress = () => {
    const consultService = useMemo(() => ConsultService(), [])
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        consultService.getClientsMoreAddress()
            .then(data => {
                setClients(data)
                setLoading(false)
            })
            .catch(error => {
                console.error(error)
                message.error('Error al cargar los clientes')
                setLoading(false)
            })
    }
        , [])


    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-2xl font-bold mb-4">Clientes con más de una dirección</h2>
            {loading ? (
                <p className="text-center">Cargando...</p>
            ) : (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Id</th>
                            <th className="py-2 px-4 border-b">Cliente</th>
                            <th className="py-2 px-4 border-b">Direcciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id_customer}>
                                <td className="py-2 px-4 border-b">{client.id_customer}</td>
                                <td className="py-2 px-4 border-b">{client.customer_name}</td>
                                <td className="py-2 px-4 border-b">{client.address_count}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default ClienteMoreAddress
