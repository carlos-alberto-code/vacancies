import React, {useState} from 'react';
import {
    Card,
    Form,
    Input,
    Button,
    Row,
    Col,
    Typography,
    Progress,
    List,
    message,
    Space,
    Tag
} from 'antd';
import {
    RocketOutlined,
    ConsoleSqlOutlined,
    SyncOutlined,
    LinkOutlined,
    RightCircleOutlined, RobotFilled
} from '@ant-design/icons';

const {Title, Text} = Typography;

interface ScrapeLog {
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'error';
}

export function Scraper(): React.JSX.Element {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<ScrapeLog[]>([]);

    const handleScrape = async (values: { url: string }) => {
        setLoading(true);
        setProgress(0);
        setLogs([]);
        message.loading({content: 'Iniciando motor...', key: 'scraping'});

        addLog('Inicializando worker...', 'info');

        // Pasos simulados
        const steps = [
            {pct: 20, msg: 'Conectando al servidor remoto...'},
            {pct: 40, msg: 'Descargando HTML...'},
            {pct: 60, msg: 'Parseando nodos del DOM...'},
            {pct: 80, msg: 'Filtrando selectores irrelevantes...'},
            {pct: 100, msg: 'Extracción finalizada.'},
        ];

        for (const step of steps) {
            const randomTime = Math.floor(Math.random() * 800) + 400;
            await new Promise(r => setTimeout(r, randomTime));
            setProgress(step.pct);
            addLog(step.msg, step.pct === 100 ? 'success' : 'info');
        }

        setLoading(false);
        message.success({content: '¡Listo! Datos obtenidos.', key: 'scraping'});
    };

    const addLog = (msg: string, type: 'info' | 'success' | 'error') => {
        const time = new Date().toLocaleTimeString([], {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });
        setLogs(prev => [...prev, {timestamp: time, message: msg, type}]);
    };

    return (
        <div style={{maxWidth: 900, margin: '0 auto', padding: '20px'}}>

            {/* SECCIÓN SUPERIOR: HEADER + INPUT */}
            <div style={{marginBottom: 20}}>
                <div style={{marginBottom: 15}}>
                    <Title level={3} style={{margin: 0}}>
                        <RobotFilled style={{marginRight: 10, color: '#1890ff'}}/>
                        Scraper
                    </Title>
                    <Text type="secondary">Ingresa la URL de la vacante.</Text>
                </div>

                <Card bordered={false} style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}>
                    <Form
                        form={form}
                        onFinish={handleScrape}
                        layout="horizontal"
                    >
                        <Row gutter={12} align="middle">
                            {/* El Input ocupa todo el espacio disponible */}
                            <Col flex="auto">
                                <Form.Item
                                    name="url"
                                    noStyle
                                    rules={[
                                        {required: true, message: '¡La URL es necesaria!'},
                                        {type: 'url', message: 'Formato inválido'}
                                    ]}
                                >
                                    <Input
                                        size="large"
                                        prefix={<LinkOutlined style={{color: '#bfbfbf'}}/>}
                                        placeholder="https://mx.linkedin.com/jobs/..."
                                        disabled={loading}
                                    />
                                </Form.Item>
                            </Col>

                            {/* El botón ocupa solo lo necesario */}
                            <Col flex="none">
                                <Form.Item noStyle>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        size="large"
                                        loading={loading}
                                        icon={!loading && <RightCircleOutlined/>}
                                        style={{minWidth: 120}}
                                    >
                                        {loading ? 'Procesando' : 'Lanzar'}
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Card>
            </div>

            {/* SECCIÓN INFERIOR: TERMINAL */}
            <Card
                title={
                    <Space>
                        <ConsoleSqlOutlined/>
                        <span>Terminal de Salida</span>
                        {loading && <Tag color="processing">En ejecución</Tag>}
                    </Space>
                }
                bordered={false}
                style={{boxShadow: '0 2px 8px rgba(0,0,0,0.08)'}}
                bodyStyle={{padding: 0}} // Padding 0 para que la terminal toque los bordes
            >
                {/* Barra de progreso sutil arriba de la consola */}
                {progress > 0 && (
                    <Progress
                        percent={progress}
                        showInfo={false}
                        strokeColor={{from: '#108ee9', to: '#87d068'}}
                        size="small"
                        status={progress === 100 ? 'success' : 'active'}
                        style={{lineHeight: 0, position: 'absolute', top: 0, width: '100%'}}
                    />
                )}

                <div style={{
                    background: '#121212', // Fondo más oscuro estilo terminal
                    height: 350,
                    overflowY: 'auto',
                    padding: '16px 20px',
                    fontFamily: "'Fira Code', 'Consolas', monospace",
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8
                }}>
                    {logs.length === 0 ? (
                        <div style={{
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#444',
                            flexDirection: 'column'
                        }}>
                            <Text style={{color: '#555'}}> Esperando URL para iniciar secuencia...</Text>
                        </div>
                    ) : (
                        <List
                            dataSource={logs}
                            split={false}
                            size="small"
                            renderItem={(item) => (
                                <List.Item style={{padding: '4px 0', border: 'none'}}>
                                    <Text style={{color: '#666', marginRight: 12, fontSize: 12, userSelect: 'none'}}>
                                        {item.timestamp}
                                    </Text>
                                    <Text style={{
                                        color: item.type === 'success' ? '#73d13d' : (item.type === 'error' ? '#ff4d4f' : '#e6f7ff'),
                                        fontSize: 14
                                    }}>
                                        <span style={{marginRight: 8, color: '#555'}}>$</span>
                                        {item.message}
                                    </Text>
                                </List.Item>
                            )}
                        />
                    )}
                </div>
            </Card>
        </div>
    );
}