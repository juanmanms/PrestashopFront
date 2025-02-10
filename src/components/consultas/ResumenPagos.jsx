import { useEffect, useMemo, useState } from "react"
import ConsultService from "../../common/service/consultService"
import { Table, message, Button, Select } from 'antd'
import * as XLSX from 'xlsx';
import { getMondayOfWeek, getSundayOfWeek, formatDate } from '../../common/utils/OrderUtils'

const { Option } = Select;
const ResumPagos = () => {
    const consultService = useMemo(() => ConsultService(), [])
    const [report, setReport] = useState([])
    const [group, setGroup] = useState(false)
    const [filterReport, setFilterReport] = useState([])
    const [from, setFrom] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0])
    const [to, setTo] = useState(new Date().toISOString().split('T')[0])
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const paymentMethods = ['tpv', 'efectivo', 'parada']; // Define aquí tus opciones de forma de pago

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

    const buttonLastWeek = () => {
        const today = new Date();
        const mondayOfLastWeek = new Date(getMondayOfWeek(today));
        mondayOfLastWeek.setDate(mondayOfLastWeek.getDate() - 7); // Resta 7 días para obtener el lunes de la semana pasada

        const sundayOfLastWeek = new Date(mondayOfLastWeek);
        sundayOfLastWeek.setDate(mondayOfLastWeek.getDate() + 6); // Suma 6 días para obtener el domingo de la semana pasada

        setFrom(formatDate(mondayOfLastWeek));
        setTo(formatDate(sundayOfLastWeek));
    };

    const buttonWeek = () => {
        const today = new Date();
        const mondayOfCurrentWeek = getMondayOfWeek(today);
        const sundayOfCurrentWeek = getSundayOfWeek(today);

        setFrom(formatDate(mondayOfCurrentWeek));
        setTo(formatDate(sundayOfCurrentWeek));
    };

    const buttonDay = () => {
        const today = new Date();
        setFrom(formatDate(today));
        setTo(formatDate(today));
    };

    const buttonYesterday = () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        setFrom(formatDate(yesterday));
        setTo(formatDate(yesterday));
    };



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

    // const handleGroupCliente = () => {
    //     setGroup(true)
    //     const grouped = report.reduce((acc, item) => {
    //         const key = `${item.Cliente}-${item.Pago}`;
    //         if (!acc[key]) {
    //             acc[key] = [];
    //         }
    //         acc[key].push(item);
    //         return acc;
    //     }, {});
    //     const filtered = Object.values(grouped).map(group => ({
    //         ...group[0],
    //         Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
    //         Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
    //         NumeroPedidos: group.length,
    //         Data: "--",
    //         Parada: "--",
    //         ID: "--"
    //     }));
    //     setFilterReport(filtered)
    // }
    const handleGroupClientDay = () => {
        setGroup(true)
        const grouped = report.reduce((acc, item) => {
            const key = `${item.Cliente}-${item.Pago}-${item.Data}`;
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
        const radios = document.getElementsByName('group');
        radios.forEach(radio => {
            if (radio.value === 'sin-agrup') {
                radio.checked = true;
            }
        });
        setSelectedPaymentMethod('');
    }, [from, to, consultService])

    useEffect(() => {
        if (new Date(from) > new Date(to)) {
            message.error('La fecha "Desde" no puede ser mayor que la fecha "Hasta".', 2);
        }
    }, [from, to])

    const exportToExcel = () => {
        const reportWithNumericTotal = filterReport.map(item => ({
            ...item,
            Total: parseFloat(item.Total),
        }));
        const worksheet = XLSX.utils.json_to_sheet(reportWithNumericTotal);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        const fileName = `report_${from}_to_${to}${group ? '_grouped' : ''}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    const handlePaymentMethodChange = (value) => {
        setSelectedPaymentMethod(value);
        if (value) {
            const filtered = report.filter(item => item.Pago === value);
            setFilterReport(filtered);
        } else {
            setFilterReport(report);
        }
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
                        <input type="radio" name="group" value="Parada-pago" onChange={() => handleGroupParada()} />
                        Parada y forma de pago
                    </label>
                    {/* <label className="block">
                        <input type="radio" name="group" value="Cliente-pago" onChange={() => handleGroupCliente()} />
                        Cliente y forma de pago
                    </label> */}
                    <label
                        className="block">
                        <input type="radio" name="group" value="Cliente-pago-dia" onChange={() => handleGroupClientDay()} />
                        Cliente, forma de pago y día
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
                    <div className="flex justify-around">

                        <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={buttonLastWeek}>Semana pasada</button>
                        <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={buttonWeek}>Esta semana</button>
                        <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={buttonDay}>Hoy</button>
                        <button className="btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-1 rounded" onClick={buttonYesterday}>Ayer</button>
                    </div>
                </div>
                <div className="mb-4">
                    <h3>Forma de pago:</h3>
                    <Select
                        value={selectedPaymentMethod}
                        onChange={handlePaymentMethodChange}
                        placeholder="Seleccione forma de pago"
                        className="w-64 mb-4 mt-2 text-gray-500 border border-gray-400 rounded-md "
                    >
                        <Option value="">Todas</Option>
                        {paymentMethods.map(method => (
                            <Option key={method} value={method}>
                                {method}
                            </Option>
                        ))}
                    </Select>
                    <hr />
                    <h3>Exportar a Excel</h3>
                    <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={exportToExcel}>Exportar</Button>
                </div>
            </div>

            <Table dataSource={filterReport} columns={columns} rowKey="id" />
        </div>
    )
}

export default ResumPagos