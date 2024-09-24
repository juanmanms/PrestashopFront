import { Card } from "antd"

const CardAddress = (address) => {
    return (
        <Card key={address.id_address} style={{ width: '300px' }}>
            <h2>{address.alias}</h2>
            <p><strong>Address 1:</strong> {address.address1}</p>
            {address.address2 && <p><strong>Address 2:</strong> {address.address2}</p>}
            <p><strong>City:</strong> {address.city}</p>
            <p><strong>Postcode:</strong> {address.postcode}</p>
            <p><strong>Phone:</strong> {address.phone}</p>
            <p><strong>Mobile:</strong> {address.phone_mobile}</p>
            <p><strong>Date Added:</strong> {new Date(address.date_add).toLocaleDateString()}</p>
            {address.other && <p><strong>Other:</strong> {address.other}</p>}
        </Card>
    )
}

export default CardAddress