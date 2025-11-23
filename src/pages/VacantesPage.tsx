import React, {useState} from 'react';
import {
    Table, Tag, Space, Button, Tooltip, Card,
    Input, Select, DatePicker, Slider, Row, Col, Typography, Progress
} from 'antd';
import type {TableProps} from 'antd';
import {
    EyeOutlined, DeleteOutlined,
    SearchOutlined, FilterOutlined, PlusOutlined
} from '@ant-design/icons';

const {RangePicker} = DatePicker;
const {Title} = Typography;

// 1. Definición de Tipos completa
interface Vacante {
    key: string;
    titulo: string;
    empresa: string;
    ubicacion: string;
    fechaPublicacion: string;
    fechaCaducidad: string;
    estado: 'pendiente' | 'aplicado' | 'entrevista' | 'rechazado' | 'oferta';
    match: number;
    habilidades: string[]; // Lista de skills requeridas
}

// 2. Datos Mock (Simulando lo que vendrá de Python/BD)
const data: Vacante[] = [
    {
        key: '1',
        titulo: 'Senior React Developer',
        empresa: 'TechGlobal Inc.',
        ubicacion: 'Remoto',
        fechaPublicacion: '2025-10-24',
        fechaCaducidad: '2025-11-24',
        estado: 'aplicado',
        match: 95,
        habilidades: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
    {
        key: '2',
        titulo: 'Backend Engineer',
        empresa: 'Fintech Solutions',
        ubicacion: 'CDMX (Híbrido)',
        fechaPublicacion: '2025-10-23',
        fechaCaducidad: '2025-12-01',
        estado: 'entrevista',
        match: 88,
        habilidades: ['Python', 'Django', 'SQL', 'Docker'],
    },
    {
        key: '3',
        titulo: 'Full Stack Jr',
        empresa: 'Startup X',
        ubicacion: 'Guadalajara',
        fechaPublicacion: '2025-10-20',
        fechaCaducidad: '2025-10-30',
        estado: 'rechazado',
        match: 45,
        habilidades: ['JavaScript', 'HTML', 'CSS'],
    },
];

const VacantesPage: React.FC = () => {
    const [filtrosVisibles, setFiltrosVisibles] = useState(false);

    // 3. Definición de Columnas
    const columns: TableProps<Vacante>['columns'] = [
        {
            title: 'Vacante / Empresa',
            key: 'info',
            render: (_, record) => (
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <span style={{fontWeight: 'bold', fontSize: '15px'}}>{record.titulo}</span>
                    <span style={{color: '#888'}}>{record.empresa}</span>
                </div>
            ),
        },
        {
            title: 'Match',
            dataIndex: 'match',
            key: 'match',
            sorter: (a, b) => a.match - b.match,
            render: (match) => (
                <div style={{width: 100}}>
                    <Progress
                        percent={match}
                        size="small"
                        status={match >= 80 ? 'success' : match < 60 ? 'exception' : 'normal'}
                        showInfo={true}
                    />
                </div>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado',
            filters: [
                {text: 'Aplicado', value: 'aplicado'},
                {text: 'Entrevista', value: 'entrevista'},
            ],
            onFilter: (value, record) => record.estado.indexOf(value as string) === 0,
            render: (estado) => {
                const colores = {
                    pendiente: 'default',
                    aplicado: 'blue',
                    entrevista: 'purple',
                    rechazado: 'red',
                    oferta: 'gold',
                };
                return <Tag color={colores[estado]}>{estado.toUpperCase()}</Tag>;
            },
        },
        {
            title: 'Habilidades',
            dataIndex: 'habilidades',
            key: 'habilidades',
            responsive: ['lg'], // Se oculta en pantallas pequeñas
            render: (skills: string[]) => (
                <>
                    {skills.slice(0, 2).map(skill => (
                        <Tag key={skill} bordered={false}>{skill}</Tag>
                    ))}
                    {skills.length > 2 && <Tag>+{skills.length - 2}</Tag>}
                </>
            ),
        },
        {
            title: 'Ubicación',
            dataIndex: 'ubicacion',
            key: 'ubicacion',
            responsive: ['xl'],
        },
        {
            title: 'Fechas',
            key: 'fechas',
            responsive: ['xxl'],
            render: (_, record) => (
                <div style={{fontSize: '12px', color: '#666'}}>
                    <div>Pub: {record.fechaPublicacion}</div>
                    <div>Cad: {record.fechaCaducidad}</div>
                </div>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: () => (
                <Space>
                    <Tooltip title="Ver Análisis"><Button icon={<EyeOutlined/>} shape="circle"/></Tooltip>
                    <Button icon={<DeleteOutlined/>} shape="circle" danger/>
                </Space>
            ),
        }
    ];

    return (
        <div style={{maxWidth: '1600px', margin: '0 auto'}}>
            <Card bordered={false} style={{marginBottom: 24}}>
                {/* HEADER: Título y Botón Principal */}
                <Row justify="space-between" align="middle" style={{marginBottom: 20}}>
                    <Col>
                        <Title level={2} style={{margin: 0}}>Gestión de Vacantes</Title>
                        <span style={{color: '#888'}}>Analiza y rastrea tus oportunidades laborales</span>
                    </Col>
                    <Col>
                        <Button type="primary" size="large" icon={<PlusOutlined/>}>
                            Nueva Vacante
                        </Button>
                    </Col>
                </Row>

                {/* TOOLBAR: Búsqueda y Toggle de Filtros */}
                <Row gutter={16} style={{marginBottom: 20}}>
                    <Col flex="auto">
                        <Input
                            size="large"
                            placeholder="Buscar por título, empresa o palabras clave..."
                            prefix={<SearchOutlined/>}
                        />
                    </Col>
                    <Col>
                        <Button
                            size="large"
                            icon={<FilterOutlined/>}
                            onClick={() => setFiltrosVisibles(!filtrosVisibles)}
                            type={filtrosVisibles ? 'primary' : 'default'}
                            ghost={filtrosVisibles}
                        >
                            Filtros {filtrosVisibles ? 'Activos' : 'Avanzados'}
                        </Button>
                    </Col>
                </Row>

                {/* AREA DE FILTROS AVANZADOS (Desplegable) */}
                {filtrosVisibles && (
                    <Card
                        size="small"
                        style={{marginBottom: 20, background: '#fafafa', borderColor: '#d9d9d9'}}
                    >
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={6}>
                                <div style={{marginBottom: 5, fontWeight: 500}}>Estado:</div>
                                <Select
                                    mode="multiple"
                                    style={{width: '100%'}}
                                    placeholder="Filtrar por estado"
                                    options={[
                                        {label: 'Aplicado', value: 'aplicado'},
                                        {label: 'Entrevista', value: 'entrevista'},
                                        {label: 'Pendiente', value: 'pendiente'},
                                    ]}
                                />
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <div style={{marginBottom: 5, fontWeight: 500}}>% Match Mínimo:</div>
                                <Slider defaultValue={50} tooltip={{open: false}}/>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <div style={{marginBottom: 5, fontWeight: 500}}>Fecha Publicación:</div>
                                <RangePicker style={{width: '100%'}}/>
                            </Col>

                            <Col xs={24} sm={12} md={6}>
                                <div style={{marginBottom: 5, fontWeight: 500}}>Habilidades:</div>
                                <Select
                                    mode="tags"
                                    style={{width: '100%'}}
                                    placeholder="Ej: React, Python"
                                />
                            </Col>
                        </Row>
                    </Card>
                )}

                {/* TABLA DE DATOS */}
                <Table<Vacante>
                    columns={columns}
                    dataSource={data}
                    pagination={{pageSize: 10}}
                    scroll={{x: 1000}} // Habilita scroll horizontal en móviles
                />
            </Card>
        </div>
    );
};

export default VacantesPage;