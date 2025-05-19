import { useState, useEffect, useMemo } from 'react';
import { Table, Button, Input, Popconfirm, Space, message } from 'antd';
import CpService from '../../common/service/cpService';

const CodigosPostales = () => {
    const cpService = useMemo(() => CpService, []);
    const [codigos, setCodigos] = useState([]);
    const [nuevoCodigo, setNuevoCodigo] = useState('');

    useEffect(() => {
        const fetchCodigos = async () => {
            try {
                const data = await cpService.getAll();
                setCodigos(data.map(item => ({ key: item.id, codigo: item.min })));
            } catch (error) {
                console.error('Error fetching codigos postales:', error);
            }
        };
        fetchCodigos();

    }, [cpService]);



    const eliminarCodigo = (key) => {
        const codigo = codigos.find(item => item.key === key);
        if (codigo) {
            cpService.remove(codigo.key)
                .then(() => {
                    setCodigos(codigos.filter(item => item.key !== key));
                })
                .catch(error => {
                    console.error('Error eliminando el código postal:', error);
                });
        }
        setCodigos(codigos.filter((item) => item.key !== key));
    };

    const agregarCodigo = () => {
        // Validar: solo números y longitud 4 o 5
        if (!/^\d{4,5}$/.test(nuevoCodigo)) {
            message.error('El código postal debe ser numérico y tener 4 o 5 dígitos');
            return;
        }
        // Comprobar si ya existe el código en la lista
        if (codigos.some(c => String(c.codigo) === String(nuevoCodigo))) {
            message.error('El código postal ya existe');
            return;
        }
        cpService.create({ min: nuevoCodigo })
            .then((response) => {
                setCodigos([
                    ...codigos,
                    { key: response.insertId, codigo: nuevoCodigo }
                ]);
                setNuevoCodigo('');
            })
            .catch(error => {
                console.error('Error creando el código postal:', error);
            });
    };

    const columns = [
        {
            title: 'Código Postal',
            dataIndex: 'codigo',
            key: 'codigo',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (_, record) => (
                <Popconfirm
                    title="¿Seguro que deseas eliminar este código postal?"
                    onConfirm={() => eliminarCodigo(record.key)}
                    okText="Sí"
                    cancelText="No"
                >
                    <Button danger size="small">Eliminar</Button>
                </Popconfirm>
            ),
        },
    ];

    return (
        <div>
            <Table
                dataSource={codigos}
                columns={columns}
                pagination={false}
                footer={() => (
                    <Space>
                        <Input
                            placeholder="Nuevo código postal"
                            value={nuevoCodigo}
                            onChange={e => setNuevoCodigo(e.target.value)}
                            maxLength={10}
                            style={{ width: 200 }}
                            onPressEnter={agregarCodigo}
                        />
                        <Button type="primary" onClick={agregarCodigo}>
                            Añadir
                        </Button>
                    </Space>
                )}
                rowKey="key"
            />
        </div>
    );
};

export default CodigosPostales;