import { useEffect, useMemo, useState } from "react"
import ConsultService from "../../common/service/consultService"
import { Table, message, Button } from 'antd'
import * as XLSX from 'xlsx';




const ResumPagos = () => {
    const consultService = useMemo(() => ConsultService(), [])
    const [report, setReport] = useState([])
    const [group, setGroup] = useState(false)
    const [filterReport, setFilterReport] = useState([])
    const [from, setFrom] = useState("2024-12-01")
    const [to, setTo] = useState("2024-12-31")


    const columns = [
        {
            title: 'Id pedido',
            dataIndex: 'ID',
            key: 'id',
        },
        {
            title: 'Cliente',
            dataIndex: 'Cliente',
            key: 'name',
        },
        {
            title: 'Forma de pago',
            dataIndex: 'Pago',
            key: 'Pago',
        },
        {
            title: 'Fecha',
            dataIndex: 'Data',
            key: 'date',
        },
        {
            title: 'Parada',
            dataIndex: 'Parada',
            key: 'stop',
        }
        ,
        {
            title: 'Total',
            dataIndex: 'Total',
            key: 'total',
        },
        {
            title: 'Transport',
            dataIndex: 'Transport',
            key: 'transport',
        }

        // Add more columns as needed
    ]

    if (group) {
        columns.push({
            title: 'Nº Pedidos',
            dataIndex: 'NumeroPedidos',
            key: 'numeroPedidos',
            render: (text, record) => record.NumeroPedidos || 1,
        });
    }

    const handleDateFromChange = (dates) => {
        setFrom(dates)
    }
    const handleDateToChange = (dates) => {
        setTo(dates)
    }

    const buttonLastMonth = () => {
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1)
        const lastDay = new Date(date.getFullYear(), date.getMonth(), 0)
        lastDay.setMonth(lastDay.getMonth() + 1)

        setFrom(firstDay.toISOString().split('T')[0])
        setTo(lastDay.toISOString().split('T')[0])
    }

    const buttonThisMonth = () => {
        //desde el uno del mes hasta hoy
        const date = new Date()
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)


        setFrom(firstDay.toISOString().split('T')[0])
        setTo(new Date().toISOString().split('T')[0])
    }


    const handleGroupPago = () => {
        setGroup(true)
        const grouped = report.reduce((acc, item) => {
            const key = item.Pago;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
        const filtered = Object.values(grouped).map(group => ({
            ...group[0],
            Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
            Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
            NumeroPedidos: group.length,
            Data: "--",
            Cliente: "--",
            ID: "--",
            id_customer: "--",
            Parada: "--"
        }));
        setFilterReport(filtered)
    }

    const handleGroupCliente = () => {
        setGroup(true)
        const grouped = report.reduce((acc, item) => {
            const key = `${item.Cliente}-${item.Pago}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
        const filtered = Object.values(grouped).map(group => ({
            ...group[0],
            Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
            Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
            NumeroPedidos: group.length,
            Data: "--",
            Parada: "--",
            ID: "--"
        }));
        setFilterReport(filtered)
    }
    const handleGroupParada = () => {
        setGroup(true)
        const grouped = report.reduce((acc, item) => {
            const key = `${item.Parada}-${item.Pago}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
        const filtered = Object.values(grouped).map(group => ({
            ...group[0],
            Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
            Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
            NumeroPedidos: group.length,
            Data: "--",
            Cliente: "--",
            ID: "--"
        }));
        setFilterReport(filtered)
    }

    const handleNoGroup = () => {
        setGroup(false)
        setFilterReport(report)
    }



    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await consultService.getReportsGeneric(from, to)
                setReport(response)
                setFilterReport(response)
            } catch (error) {
                console.error('Error fetching reports:', error)
                message.error('Error fetching reports')
            }
        }

        fetchReport()
        handleNoGroup()
    }, [from, to, consultService])

    useEffect(() => {
        if (new Date(from) > new Date(to)) {
            message.error('La fecha "Desde" no puede ser mayor que la fecha "Hasta".', 2);
        }
    }, [from, to])

    const exportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(filterReport);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        const fileName = `report_${from}_to_${to}${group ? '_grouped' : ''}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };


    return (
        <div className="container mx-auto mt-4">
            <h2>Resumen Genérico</h2>

            <div className="flex justify-around">
                <div className="mb-4">
                    <h3>Agrupado por:</h3>
                    <label className="block">
                        <input type="radio" name="group" value="Forma de pago" onChange={() => handleGroupPago()} />
                        Forma de pago
                    </label>
                    <label className="block">
                        <input type="radio" name="group" value="Cliente-pago" onChange={() => handleGroupCliente()} />
                        Cliente y forma de pago
                    </label>
                    <label className="block">
                        <input type="radio" name="group" value="Parada-pago" onChange={() => handleGroupParada()} />
                        Parada y forma de pago
                    </label>
                    <label className="block">
                        <input type="radio" name="group" value="sin-agrup" onChange={() => handleNoGroup()} />
                        Sin agrupar
                    </label>
                </div>
                <div className="mb-4">
                    <h3>Fechas:</h3>
                    <label className="block">
                        Desde:
                        <input type="date" onChange={(e) => handleDateFromChange(e.target.value)} value={from} />
                    </label>
                    <label className="block">
                        Hasta:
                        <input type="date" onChange={(e) => handleDateToChange(e.target.value)} value={to} />
                    </label>
                    <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={buttonLastMonth}>Ultimo mes</button>
                    <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={buttonThisMonth}>Este mes</button>
                </div>
                <div className="mb-4">
                    <h3>Agrupado por:</h3>
                    <Button onClick={exportToExcel}>Exportar</Button>
                </div>
            </div>

            <Table dataSource={filterReport} columns={columns} rowKey="id" />
        </div>
    )
}

export default ResumPagos