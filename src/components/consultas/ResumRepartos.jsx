import { useEffect, useMemo, useState } from "react"
import ConsultService from "../../common/service/consultService"
import { Table } from 'antd'
import * as XLSX from 'xlsx';

const ResumRepartos = () => {
    const consultaService = useMemo(() => ConsultService(), [])
    const [data, setData] = useState([])
    const [year, setYear] = useState(2025)

    useEffect(() => {
        const getReportRepartos = async () => {
            try {
                const data = await consultaService.getReportRepartos(year)
                setData(data)
            } catch (error) {
                console.error('Error updating delivery time:', error)
            }
        }
        getReportRepartos()
    }, [year])

    const handleYearChange = (e) => {
        const year = e.target.value
        setYear(year)
    }

    const handleExport = () => {
        const ws = XLSX.utils.json_to_sheet(data)
        const wb = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')
        XLSX.writeFile(wb, `resumen_repartos_${year}.xlsx`)
    }


    const columns = [
        {
            title: 'Mes',
            dataIndex: 'mes',
            key: 'mes',
        },
        {
            title: 'Total de Pedidos',
            dataIndex: 'orders_total',
            key: 'orders_total',
        },
        {
            title: 'Pedidos en Euros',
            dataIndex: 'pedidos_euros',
            key: 'pedidos_euros',
        },
        {
            title: 'Entregues',
            dataIndex: 'entregues',
            key: 'entregues',
        },
        {
            title: 'Entregues en Euros',
            dataIndex: 'entregues_euros',
            key: 'entregues_euros',
        },
    ]

    return (
        <div className="container mx-auto mt-4">
            <h2 className="text-2xl font-bold mb-4">Resumen Totales de reparto</h2>
            <hr className="mb-4" />
            <div className="flex justify-between items-center my-4">
                <select
                    className="form-select px-4 py-2 border rounded-md"
                    onChange={(e) => {
                        handleYearChange(e)
                    }}
                >
                    {[2002, 2021, 2022, 2023, 2024, 2025].map((year) => (
                        <option key={year} value={year} selected={year === 2025}>
                            {year}
                        </option>
                    ))}
                </select>
                <button
                    className="btn btn-primary bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                        handleExport()
                    }}
                >
                    Exportar
                </button>
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey="mes"
                pagination={false}
                scroll={{ x: 1000 }}
                rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-100' : 'bg-white')}
            />
        </div>
    )
}

export default ResumRepartos