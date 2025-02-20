import { useEffect, useMemo, useState } from "react";
import ConsultService from "../../common/service/consultService";
import { monthNames } from "../../common/utils/OrderUtils";
import { Table, message, Button, Select, Spin } from 'antd';
import * as XLSX from 'xlsx';

const { Option } = Select;

const ResumParadas = () => {
    const consultService = useMemo(() => ConsultService(), []);
    const [report, setReport] = useState([]);
    const [year, setYear] = useState('');
    const [filterReport, setFilterReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [from, setFrom] = useState(new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]);
    const [to, setTo] = useState(new Date().toISOString().split('T')[0]);
    const [groupType, setGroupType] = useState('sin-agrup'); // Estado para controlar el tipo de agrupación

    // const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const columns = [
        groupType === 'sin-agrup' && {
            title: "Id Pedido",
            dataIndex: 'ID',
            key: 'id',
            sorter: (a, b) => a.ID.localeCompare(b.ID),
        },
        groupType === 'sin-agrup' && {
            title: "Id Cliente",
            dataIndex: 'Cliente',
            key: 'name',
            sorter: (a, b) => a.Cliente.localeCompare(b.Cliente),
        },
        (groupType === 'Parada-mes-pago' || groupType === 'Parada-anyo-pago') && {
            title: "Forma de pago",
            dataIndex: 'Pago',
            key: 'Pago',
            sorter: (a, b) => a.Pago.localeCompare(b.Pago),
        },
        {
            title: "Fechas",
            dataIndex: 'Data',
            key: 'date',
            sorter: (a, b) => a.Data.localeCompare(b.Data),
        },
        {
            title: "Parada",
            dataIndex: 'Parada',
            key: 'stop',
            sorter: (a, b) => a.Parada.localeCompare(b.Parada),
        },
        {
            title: "Total",
            dataIndex: 'Total',
            key: 'total',
            sorter: (a, b) => parseFloat(a.Total) - parseFloat(b.Total),
        },
        {
            title: "Transporte",
            dataIndex: 'Transport',
            key: 'transport',
            sorter: (a, b) => parseFloat(a.Transport) - parseFloat(b.Transport),
        },
    ].filter(Boolean);

    if (groupType !== 'sin-agrup') {
        columns.push({
            title: "NumeroPedidos",
            dataIndex: 'NumeroPedidos',
            key: 'numeroPedidos',
            render: (text, record) => record.NumeroPedidos || 1,
            sorter: (a, b) => a.NumeroPedidos - b.NumeroPedidos,
        });
    }

    // const handleSort = (key) => {
    //     const sortedData = [...filterReport].sort((a, b) => {
    //         if (typeof a[key] === 'string') {
    //             return a[key].localeCompare(b[key]);
    //         } else {
    //             return a[key] - b[key];
    //         }
    //     });
    //     setFilterReport(sortedData);
    // };

    const handleNoGroup = () => {
        setGroupType('sin-agrup');
        setFilterReport(report);
    };

    const handleGroupParadaYear = () => {
        setGroupType('Parada-año');
        const groupedReport = report.reduce((acc, item) => {
            const key = `${item.Parada}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
        const groupedReportArray = Object.values(groupedReport).map(item => ({
            ...item[0],
            ID: "--",
            Cliente: "--",
            Data: year,
            Pago: "--",
            id_customer: "--",
            Total: item.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
            Transport: item.reduce((acc, item) => acc + parseFloat(item.Transport), 0),
            NumeroPedidos: item.length
        }));
        setFilterReport(Object.values(groupedReportArray));
    };

    const handleGroupParadaMonth = () => {
        setGroupType('Parada-mes'); // Establece el tipo de agrupación
        const grouped = report.reduce((acc, item) => {
            const key = `${item.Parada}-${item.Data.split('/')[1]}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});
        const filtered = Object.values(grouped).map(group => {
            const month = monthNames[parseInt(group[0].Data.split('/')[1], 10) - 1];
            return {
                ...group[0],
                Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
                Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
                NumeroPedidos: group.length,
                Data: month,
                Cliente: "--",
                ID: "--",
                id_customer: "--",
                Pago: "--",
            };
        });

        setFilterReport(filtered);
    };

    const handleGroupParadaYearPago = () => {
        setGroupType('Parada-anyo-pago');
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
            Data: year,
            Cliente: "--",
            ID: "--",
            id_customer: "--"
        }));
        setFilterReport(filtered);
    };

    const handleGroupParadaMonthPago = () => {
        setGroupType('Parada-mes-pago');
        const grouped = report.reduce((acc, item) => {
            const key = `${item.Parada}-${item.Data.split('/')[1]}-${item.Pago}`;
            if (!acc[key]) {
                acc[key] = [];
            }
            acc[key].push(item);
            return acc;
        }, {});

        const filtered = Object.values(grouped).map(group => {
            const month = monthNames[parseInt(group[0].Data.split('/')[1], 10) - 1];
            return {
                ...group[0],
                Total: group.reduce((sum, item) => sum + parseFloat(item.Total), 0).toFixed(2),
                Transport: group.reduce((sum, item) => sum + parseFloat(item.Transport), 0).toFixed(2),
                NumeroPedidos: group.length,
                Data: month,
                Cliente: "--",
                ID: "--",
                id_customer: "--"
            };
        });

        setFilterReport(filtered);
    };

    // Fetch de datos
    useEffect(() => {
        const fetchReport = async () => {
            setLoading(true);
            try {
                const response = await consultService.getReportsGeneric(from, to);
                setReport(response);
                setFilterReport(response);
            } catch (error) {
                if (error.message.includes("Token inválido")) {
                    message.error('Token inválido. Redirigiendo a la página de login...');
                } else {
                    message.error('Error fetching reports');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [from, to, consultService]);

    // Validación de fechas
    useEffect(() => {
        if (new Date(from) > new Date(to)) {
            message.error('La fecha "Desde" no puede ser mayor que la fecha "Hasta".', 2);
        }
        setGroupType('sin-agrup');
    }, [report, from, to]);

    // Exportar a Excel
    const exportToExcel = () => {
        const reportWithNumericTotal = filterReport.map(item => ({
            ...item,
            Total: parseFloat(item.Total),
        }));
        const worksheet = XLSX.utils.json_to_sheet(reportWithNumericTotal);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Report');
        const fileName = `report_${from}_to_${to}${groupType !== 'sin-agrup' ? '_grouped' : ''}.xlsx`;
        XLSX.writeFile(workbook, fileName);
    };

    // Manejador de cambio de año
    const handleYearChange = (year) => {
        setFrom(`${year}-01-01`);
        setTo(`${year}-12-31`);
        setYear(year);
    };

    return (
        <div className="container mx-auto mt-4">
            <h2>Resumen Genérico</h2>
            <Spin spinning={loading}>
                <div className="flex justify-around">
                    <div className="mb-4">
                        <h3>Agrupado por:</h3>
                        <Select
                            onChange={(value) => {
                                switch (value) {
                                    case 'Parada-año':
                                        handleGroupParadaYear();
                                        break;
                                    case 'Parada-mes':
                                        handleGroupParadaMonth();
                                        break;
                                    case 'Parada-anyo-pago':
                                        handleGroupParadaYearPago();
                                        break;
                                    case 'Parada-mes-pago':
                                        handleGroupParadaMonthPago();
                                        break;
                                    default:
                                        handleNoGroup();
                                }
                            }}
                            value={groupType}
                            placeholder="Seleccione agrupación"
                            className="w-64 mb-4 mt-2 text-gray-500 border border-gray-400 rounded-md"
                        >
                            <Option value="Parada-año">Parada y año</Option>
                            <Option value="Parada-mes">Parada, mes y año</Option>
                            <Option value="Parada-anyo-pago">Parada, año y forma de pago</Option>
                            <Option value="Parada-mes-pago">Parada, mes, año y forma de pago</Option>
                            <Option value="sin-agrup">Sin agrupar</Option>
                        </Select>
                    </div>
                    <div className="mb-4">
                        <h3>Año:</h3>
                        <label className="block">
                            <Select
                                onChange={handleYearChange}
                                placeholder="Seleccione año"
                                className="w-64 mb-4 mt-2 text-gray-500 border border-gray-400 rounded-md"
                            >
                                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map(year => (
                                    <Option key={year} value={year}>
                                        {year}
                                    </Option>
                                ))}
                            </Select>
                        </label>
                    </div>
                    <div className="mb-4">
                        <h3>Exportar a Excel</h3>
                        <Button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 m-2 rounded" onClick={exportToExcel}>Exportar</Button>
                    </div>
                </div>
                <Table dataSource={filterReport} columns={columns} rowKey="id" />
            </Spin>
        </div>
    );
};

export default ResumParadas;