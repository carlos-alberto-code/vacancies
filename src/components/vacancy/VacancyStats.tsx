import type {JSX} from 'react';
import {Card, Col, Row, Statistic, theme} from 'antd';
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    CloseCircleOutlined,
    DatabaseOutlined
} from '@ant-design/icons';
import type {Vacancy} from '../../types/Vacancy';

interface VacancyStatsProps {
    vacancies: Vacancy[];
}

export function VacancyStats({vacancies}: VacancyStatsProps): JSX.Element {
    const {token} = theme.useToken();

    // Logic to calculate counts
    const total = vacancies.length;
    const applied = vacancies.filter(v => v.status === 'applied').length;
    const interviewing = vacancies.filter(v => v.status === 'interview').length;
    const rejected = vacancies.filter(v => v.status === 'rejected').length;

    return (
        <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={6}>
                <Card bordered={false} style={{height: '100%'}}>
                    <Statistic
                        title="Total Guardadas"
                        value={total}
                        prefix={<DatabaseOutlined style={{color: token.colorTextSecondary}}/>}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card bordered={false} style={{height: '100%'}}>
                    <Statistic
                        title="Aplicadas"
                        value={applied}
                        prefix={<CheckCircleOutlined/>}
                        valueStyle={{color: token.colorSuccess}}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card bordered={false} style={{height: '100%'}}>
                    <Statistic
                        title="En Entrevista"
                        value={interviewing}
                        prefix={<ClockCircleOutlined/>}
                        valueStyle={{color: token.colorPrimary}}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
                <Card bordered={false} style={{height: '100%'}}>
                    <Statistic
                        title="Descartadas"
                        value={rejected}
                        prefix={<CloseCircleOutlined/>}
                        valueStyle={{color: token.colorError}}
                    />
                </Card>
            </Col>
        </Row>
    );
}