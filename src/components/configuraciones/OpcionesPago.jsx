import { useEffect, useState, useMemo } from 'react'
import PaymentService from '../../common/service/paymentService'



const OpcionesPago = () => {
    const paymentService = useMemo(() => PaymentService(), [])

    const [options, setOptions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await paymentService.getPaymentOptions()
                setOptions(response)
            } catch (error) {
                console.error('Error fetching payment options:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchOptions()
    }, [paymentService])

    const handleOptionChange = async (id, isActive) => {
        try {
            await paymentService.updatePaymentOption(id, isActive)
            setOptions(prevOptions =>
                prevOptions.map(option =>
                    option.id_payment_method === id ? { ...option, is_active: isActive } : option
                )
            )
        } catch (error) {
            console.error('Error updating payment option:', error)
        }
        console.log('Cambiar estado de pago', id, isActive)
    }




    return (

        <div className="container mx-auto mt-4">
            <h2>Opciones de pago</h2>
            {loading ? (
                <div className="text-center text-gray-500">Loading...</div>
            ) : (
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Método de Pago</th>
                            <th className="py-2 px-4 border-b">Activo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {options.map((option) => (
                            <tr key={option.id_payment_method} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{option.payment_name}</td>
                                <td className="py-2 px-4 border-b text-center">
                                    <input
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-blue-600"
                                        checked={option.is_active}
                                        onChange={() => {
                                            handleOptionChange(option.id_payment_method, !option.is_active)
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default OpcionesPago