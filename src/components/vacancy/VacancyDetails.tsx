import type {JSX} from 'react';
import {Button, Descriptions, Tag, Typography, Divider, Space, theme} from 'antd';
import {
    GlobalOutlined,
    CalendarOutlined,
    BankOutlined,
    DollarOutlined
} from '@ant-design/icons';
import {type Vacancy, StatusColors, StatusLabels} from '../../types/Vacancy';

interface VacancyDetailsProps {
    vacancy: Vacancy;
}

const {Title, Text, Paragraph} = Typography;

export function VacancyDetails({vacancy}: VacancyDetailsProps): JSX.Element {
    const {token} = theme.useToken();

    return (
        <div>
            {/* Header Section */}
            <div style={{marginBottom: 24}}>
                <Title level={3} style={{marginBottom: 8}}>{vacancy.title}</Title>
                <Space direction="vertical" size={4}>
                    <Text type="secondary">
                        <BankOutlined style={{marginRight: 6}}/>
                        {vacancy.company}
                    </Text>
                    <Text type="secondary">
                        <GlobalOutlined style={{marginRight: 6}}/>
                        {vacancy.location}
                    </Text>
                </Space>
            </div>

            {/* Status Bar */}
            <div style={{
                background: token.colorFillQuaternary,
                padding: 16,
                borderRadius: token.borderRadius,
                marginBottom: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <Text strong>Estado: </Text>
                    <Tag color={StatusColors[vacancy.status]} style={{marginLeft: 8}}>
                        {StatusLabels[vacancy.status]}
                    </Tag>
                </div>
                <div>
                    <Text strong>Match: </Text>
                    <span style={{
                        fontWeight: 'bold',
                        color: vacancy.matchScore > 75 ? token.colorSuccess : token.colorWarning
                    }}>
                        {vacancy.matchScore}%
                    </span>
                </div>
            </div>

            <Descriptions column={1} bordered size="small" layout="vertical">

                {/* Salary Info */}
                <Descriptions.Item label={<><DollarOutlined/> Rango Salarial</>}>
                    {vacancy.salaryRange || 'No especificado'}
                </Descriptions.Item>

                {/* Skills */}
                <Descriptions.Item label="Habilidades Requeridas">
                    <div style={{display: 'flex', flexWrap: 'wrap', gap: 6}}>
                        {vacancy.requiredSkills.map(skill => (
                            <Tag key={skill} color="blue">{skill}</Tag>
                        ))}
                    </div>
                </Descriptions.Item>

                {/* Dates */}
                <Descriptions.Item label={<><CalendarOutlined/> Fechas</>}>
                    <Space size="large">
                        <Text type="secondary">Publicado: {vacancy.datePosted}</Text>
                        <Text type="secondary">Guardado: {vacancy.dateSaved}</Text>
                    </Space>
                </Descriptions.Item>
            </Descriptions>

            <Divider orientation="left">Descripción</Divider>

            <Paragraph
                style={{
                    whiteSpace: 'pre-wrap',
                    color: token.colorTextSecondary,
                    lineHeight: 1.6
                }}
            >
                {vacancy.description}
            </Paragraph>

            <Divider/>

            {/* Actions */}
            <div style={{display: 'flex', justifyContent: 'flex-end', gap: 12}}>
                <Button href={vacancy.url} target="_blank" rel="noopener noreferrer">
                    Ver en {vacancy.platform}
                </Button>
                <Button type="primary" href={vacancy.url} target="_blank" rel="noopener noreferrer">
                    Aplicar Ahora
                </Button>
            </div>
        </div>
    );
}