import type {JSX} from 'react';
import type {TableProps} from 'antd';
import {Table, Tag, theme} from 'antd';
import {type Vacancy, StatusColors, StatusLabels} from '../../types/Vacancy';

interface VacancyTableProps {
    data: Vacancy[];
    isLoading: boolean;
    onRowClick: (vacancy: Vacancy) => void;
}

function VacancyTable({data, isLoading, onRowClick}: VacancyTableProps): JSX.Element {
    const {token} = theme.useToken();

    const columns: TableProps<Vacancy>['columns'] = [
        {
            title: 'Posición / Empresa',
            key: 'position',
            render: (_, record) => (
                <div style={{cursor: 'pointer'}}>
                    <div style={{fontWeight: 600, fontSize: '15px', color: token.colorTextBase}}>
                        {record.title}
                    </div>
                    <div style={{color: token.colorTextSecondary, fontSize: '13px'}}>
                        {record.company}
                    </div>
                </div>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
            width: 120,
            render: (status) => (
                <Tag color={StatusColors[status]}>{StatusLabels[status]}</Tag>
            ),
        },
        {
            title: 'Match',
            dataIndex: 'matchScore',
            key: 'match',
            width: 100,
            render: (score) => {
                let color = token.colorWarning;
                if (score > 80) color = token.colorSuccess;
                if (score < 50) color = token.colorError;

                return (
                    <span style={{color, fontWeight: 'bold'}}>
                        {score}%
                    </span>
                );
            },
        },
        {
            title: 'Ubicación',
            dataIndex: 'location',
            key: 'location',
            responsive: ['md'],
            render: (text) => <span style={{color: token.colorTextSecondary}}>{text}</span>
        },
        {
            title: 'Publicado',
            dataIndex: 'datePosted',
            key: 'date',
            responsive: ['lg'],
            width: 150,
            align: 'right',
            render: (date) => <span style={{color: token.colorTextTertiary}}>{date}</span>,
        },
    ];

    return (
        <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={isLoading}
            pagination={{pageSize: 8}}
            onRow={(record) => ({
                onClick: () => onRowClick(record),
                style: {cursor: 'pointer'}
            })}
        />
    );
}

export default VacancyTable