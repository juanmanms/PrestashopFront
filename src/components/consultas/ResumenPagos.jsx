import { useEffect, useMemo, useState } from "react";
import ConsultService from "../../common/service/consultService";
import { Table, message, Button, Select } from 'antd';
import * as XLSX from 'xlsx';
import { getMondayOfWeek, getSundayOfWeek, formatDate } from '../../common/utils/OrderUtils';

const { Option } = Select;

const ResumPagos = () => {
    const consultService = useMemo(() => ConsultService(), []);
    const [report, setReport] = useState([]);
    const [group, setGroup] = useState(false);
    const [filterReport, setFilterReport] = useState([]);
    const [from, setFrom] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('sin-agrup');

    const paymentMethods = ['tpv', 'efectivo', 'parada'];

    const columns = [
        ...(selectedGroup === 'sin-agrup' ? [{
            title: 'Id pedido',
            dataIndex: 'ID',
            key: 'id',
        }] : []),
        ...(['Cliente-pago-dia', 'sin-agrup'].includes(selectedGroup) ? [{
            title: 'Cliente',
            dataIndex: 'Cliente',
            key: 'name',
        }] : []),
        ...(!['Día'].includes(selectedGroup) ? [{
            title: 'Forma de pago',
            dataIndex: 'Pago',
            key: 'Pago',
        }] : []),
        ...(!['Parada-pago', 'Forma de pago'].includes(selectedGroup) ? [{
            title: 'Fecha',
            dataIndex: 'Data',
            key: 'date',
        }] : []),
        ...(!['Forma de pago', 'Pago-dia', 'Cliente-pago-dia', 'Día'].includes(selectedGroup) ? [{
            title: 'Parada',
            dataIndex: 'Parada',
            key: 'stop',
        }] : []),
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
    ];

    if (group) {
        columns.push({
            title: 'Nº Pedidos',
            dataIndex: 'NumeroPedidos',
            key: 'numeroPedidos',
            render: (text, record) => record.NumeroPedidos || 1,
        });
    }

    const handleDateFromChange = (dates) => {
        setFrom(dates);
    };

    const handleDateToChange = (dates) => {
        setTo(dates);
    };

    const buttonLastWeek = () => {
        const today = new Date();
        const mondayOfLastWeek = new Date(getMondayOfWeek(today));
        mondayOfLastWeek.setDate(mondayOfLastWeek.getDate() - 7);

        const sundayOfLastWeek = new Date(mondayOfLastWeek);
        sundayOfLastWeek.setDate(mondayOfLastWeek.getDate() + 6);

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

    const handleGroupChange = (value) => {
        setSelectedGroup(value);
        setGroup(value !== 'sin-agrup');
        applyFilters(value, selectedPaymentMethod);
    };

    const handlePaymentMethodChange = (value) => {
        setSelectedPaymentMethod(value);
        applyFilters(selectedGroup, value);
    };

    const applyFilters = (group, paymentMethod) => {
        let filtered = report;

        if (paymentMethod) {
            filtered = filtered.filter(item => item.Pago === paymentMethod);
        }

        if (group !== 'sin-agrup') {
            const grouped = filtered.reduce((acc, item) => {
                let key;
                switch (group) {
                    case 'Forma de pago':
                        key = item.Pago;
                        break;
                    case 'Parada-pago':
                        key = `${item.Parada}-${item.Pago}`;
                        break;
                    case 'Cliente-pago-dia':
                        key = `${item.Cliente}-${item.Pago}-${item.Data}`;
                        break;
                    case 'Pago-dia':
                        key = `${item.Pago}-${item.Data}`;
                        break;
                    case 'Día':
                        key = item.Data;
                        break;
                    default:
                        key = item.Pago;
                }
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(item);
                return acc;
            }, {});

            filtered = Object.values(grouped).map(group => ({
                ...group[0],
                Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
                Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
                NumeroPedidos: group.length,
                Data: group.every(item => item.Data === group[0].Data) ? group[0].Data : "--",
                Cliente: group.every(item => item.Cliente === group[0].Cliente) ? group[0].Cliente : "--",
                ID: group.every(item => item.ID === group[0].ID) ? group[0].ID : "--",
                id_customer: group.every(item => item.id_customer === group[0].id_customer) ? group[0].id_customer : "--",
                Parada: group.every(item => item.Parada === group[0].Parada) ? group[0].Parada : "--"
            }));
        }
        setFilterReport(filtered);
    };

    const handleNoGroup = () => {
        setGroup(false);
        setFilterReport(report);
    };

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await consultService.getReportsGeneric(from, to);
                setReport(response);
                setFilterReport(response);
            } catch (error) {
                console.error('Error fetching reports:', error);
                message.error('Error fetching reports');
            }
        };

        fetchReport();
        handleNoGroup();
        const radios = document.getElementsByName('group');
        radios.forEach(radio => {
            if (radio.value === 'sin-agrup') {
                radio.checked = true;
            }
        });
        setSelectedPaymentMethod('');
    }, [from, to, consultService]);

    useEffect(() => {
        if (new Date(from) > new Date(to)) {
            message.error('La fecha "Desde" no puede ser mayor que la fecha "Hasta".', 2);
        }
    }, [from, to]);

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

    return (
        <div className="container mx-auto mt-4 p-4">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Agrupado por:</h3>
                    <Select
                        onChange={handleGroupChange}
                        placeholder="Seleccione agrupación"
                        className="w-full mb-4"
                    >
                        <Option value="Forma de pago">Forma de pago</Option>
                        <Option value="Parada-pago">Parada y forma de pago</Option>
                        <Option value="Cliente-pago-dia">Cliente, forma de pago y día</Option>
                        <Option value="Pago-dia">Forma de pago y día</Option>
                        <Option value="Día">Día</Option>
                        <Option value="sin-agrup">Sin agrupar</Option>
                    </Select>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Fechas:</h3>
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <label className="block mb-2 md:mb-0">
                            Desde:
                            <input type="date" onChange={(e) => handleDateFromChange(e.target.value)} value={from} className="w-full mt-1 p-2 border rounded-md" />
                        </label>
                        <label className="block mb-2 md:mb-0">
                            Hasta:
                            <input type="date" onChange={(e) => handleDateToChange(e.target.value)} value={to} className="w-full mt-1 p-2 border rounded-md" />
                        </label>
                    </div>
                    <Select
                        onChange={(value) => {
                            if (value === 'Semana pasada') buttonLastWeek();
                            else if (value === 'Esta semana') buttonWeek();
                            else if (value === 'Hoy') buttonDay();
                            else if (value === 'Ayer') buttonYesterday();
                        }}
                        placeholder="Seleccione rango de fechas"
                        className="w-full mb-4"
                    >
                        <Option value="Semana pasada">Semana pasada</Option>
                        <Option value="Esta semana">Esta semana</Option>
                        <Option value="Hoy">Hoy</Option>
                        <Option value="Ayer">Ayer</Option>
                    </Select>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Forma de pago:</h3>
                    <Select
                        value={selectedPaymentMethod}
                        onChange={handlePaymentMethodChange}
                        placeholder="Seleccione forma de pago"
                        className="w-full mb-4"
                    >
                        <Option value="">Todas</Option>
                        {paymentMethods.map(method => (
                            <Option key={method} value={method}>
                                {method}
                            </Option>
                        ))}
                    </Select>
                    <hr className="my-4" />
                    <h3 className="text-xl font-semibold mb-2">Exportar a Excel</h3>
                    <Button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={exportToExcel}>Exportar</Button>
                </div>
            </div>

            <Table dataSource={filterReport} columns={columns} rowKey="id" className="mt-4" />
        </div>
    );
};

export default ResumPagos;