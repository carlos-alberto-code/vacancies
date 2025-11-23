import {Card, Col, Row, Statistic, Progress, Typography, List, theme} from 'antd';
import {ArrowUpOutlined, ArrowDownOutlined, TrophyOutlined} from '@ant-design/icons';
import type {JSX} from 'react';

interface SkillMetric {
    name: string;
    proficiency: number; // 0-100
    marketDemand: number; // 0-100
}

interface MarketTrend {
    title: string;
    value: string;
    change: number;
    isPositive: boolean;
}

const {Title, Text} = Typography;

export function Dashboard(): JSX.Element {
    const {token} = theme.useToken();

    // Mock Data (English variable names)
    const skillsData: SkillMetric[] = [
        {name: 'React / Next.js', proficiency: 90, marketDemand: 95},
        {name: 'TypeScript', proficiency: 85, marketDemand: 90},
        {name: 'Node.js / Express', proficiency: 70, marketDemand: 80},
        {name: 'Python (Data)', proficiency: 45, marketDemand: 85},
    ];

    const marketTrends: MarketTrend[] = [
        {title: 'Salario Promedio (Mid)', value: '$45,000 MXN', change: 12, isPositive: true},
        {title: 'Vacantes Remotas', value: '340', change: 5, isPositive: false},
    ];

    return (
        <div style={{paddingBottom: 24}}>
            <Title level={2}>📊 Dashboard de Análisis</Title>

            {/* 1. Top Metrics */}
            <Row gutter={[16, 16]} style={{marginBottom: 24}}>
                {marketTrends.map((trend, index) => (
                    <Col xs={24} sm={12} key={index}>
                        <Card bordered={false}>
                            <Statistic
                                title={trend.title}
                                value={trend.value}
                                precision={0}
                                valueStyle={{color: trend.isPositive ? token.colorSuccess : token.colorError}}
                                prefix={trend.isPositive ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                                suffix={<span style={{fontSize: 14, color: token.colorTextSecondary}}>{trend.change}% vs mes pasado</span>}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                {/* 2. Skills Gap Analysis */}
                <Col xs={24} lg={14}>
                    <Card title="Comparativa de Habilidades (Mi Perfil vs Mercado)" bordered={false}>
                        <List
                            dataSource={skillsData}
                            renderItem={(item) => (
                                <List.Item>
                                    <div style={{width: '100%'}}>
                                        <div
                                            style={{display: 'flex', justifyContent: 'space-between', marginBottom: 6}}>
                                            <Text strong>{item.name}</Text>
                                            <Text type="secondary">Demanda: {item.marketDemand}%</Text>
                                        </div>
                                        <Progress
                                            percent={item.proficiency}
                                            success={{percent: item.marketDemand}}
                                            format={(percent) => `${percent}% Nivel`}
                                            strokeColor={token.colorPrimary}
                                        />
                                    </div>
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>

                {/* 3. Gamification / Goals */}
                <Col xs={24} lg={10}>
                    <Card
                        title="Próximos Objetivos"
                        bordered={false}
                        extra={<TrophyOutlined style={{color: token.colorWarning, fontSize: 18}}/>}
                    >
                        <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                            <div>
                                <Text>Aprender AWS (Certificación Cloud)</Text>
                                <Progress percent={30} size="small" status="active"/>
                            </div>
                            <div>
                                <Text>Mejorar Inglés Conversacional</Text>
                                <Progress percent={65} size="small" status="active"/>
                            </div>
                            <div>
                                <Text>Actualizar Portafolio</Text>
                                <Progress percent={100} size="small"/>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}

export default Dashboard;