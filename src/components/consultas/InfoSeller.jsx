import { useState, useMemo, useEffect } from "react"

import ModalSeller from "../seller/ModalSeller";
import ConsultService from "../../common/service/consultService";
import { Table } from 'antd';

const InfoSeller = () => {
    const [vendedor, setVendedor] = useState(0);
    const [vendedores, setVendedores] = useState([]);
    const [visible, setVisible] = useState(false)



    const consultService = useMemo(() => ConsultService(), []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await consultService.getInfoSeller();
                setVendedores(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchData();
    }, []);




    const openModalSeller = (record) => {
        // Logic to open ModalSeller and pass the record
        setVendedor(record);
        setVisible(true);
    };
    const closeModal = () => {
        setVisible(false);
    }

    const columns = [
        {
            title: 'ID Vendedor',
            dataIndex: 'ID_Vendedor',
            key: 'ID_Vendedor',
            className: 'text-center',
        },
        {
            title: 'Vendedor',
            dataIndex: 'Vendedor',
            key: 'Vendedor',
            className: 'text-center',
        },
        {
            title: 'Categoria por defecto',
            dataIndex: 'Categoria',
            key: 'Categoria',
            className: 'text-center',
        },
        {
            title: 'ID Categoria',
            dataIndex: 'ID_Categoria',
            key: 'ID_Categoria',
            className: 'text-center',
        },
        {
            title: 'Productos',
            dataIndex: 'productos',
            key: 'productos',
            className: 'text-center',
        },
        {
            title: 'Activos',
            dataIndex: 'activos',
            key: 'activos',
            className: 'text-center',
        },
        {
            title: 'Inactivos',
            key: 'inactivos',
            className: 'text-center',
            render: (text, record) => (
                <span>{record.productos - record.activos}</span>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            className: 'text-center',
            render: (text, record) => (
                <button
                    onClick={() => openModalSeller(record)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Ver
                </button>
            ),
        }
    ];


    return (
        <div className="p-4 w-full">
            <div className="p-4 w-full">
                <h2 className="text-xl font-bold">Número de vendedores activos: {vendedores.length}</h2>
            </div>
            <div className="p-4 w-full">
                <Table columns={columns} dataSource={vendedores} rowKey="ID_Categoria" />
            </div>
            <ModalSeller
                visible={visible}
                onClose={closeModal}
                vendedor={vendedor}
            />
        </div>
    )
}

export default InfoSeller