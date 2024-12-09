
const OpcionesPago = () => {
    return (
        <>
            <div>OpcionesPago</div>
            <table>
                <thead>
                    <tr>
                        <th>Método de Pago</th>
                        <th>Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>TPV</td>
                        <td><input type="checkbox" name="tpv" /></td>
                    </tr>
                    <tr>
                        <td>Efectivo</td>
                        <td><input type="checkbox" name="efectivo" /></td>
                    </tr>
                    <tr>
                        <td>A Parada</td>
                        <td><input type="checkbox" name="a_parada" /></td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

export default OpcionesPago