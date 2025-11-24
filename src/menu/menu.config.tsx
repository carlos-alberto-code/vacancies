import React from 'react';
import {
    CloudSyncOutlined, DashboardOutlined, SolutionOutlined, IdcardOutlined
} from '@ant-design/icons';
import {ROUTES} from "./paths.ts";

export interface AppMenuItem {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: AppMenuItem[];
}

export const SIDEBAR_ITEMS: AppMenuItem[] = [
    {
        key: ROUTES.SCRAPER,
        label: 'Scraper',
        icon: <CloudSyncOutlined/>,
    },
    {
        key: ROUTES.DASHBOARD,
        label: 'Dashboard',
        icon: <DashboardOutlined/>,
    },
    {
        key: ROUTES.VACANCIES,
        label: 'Vacantes',
        icon: <SolutionOutlined/>,
    },
    {
        key: ROUTES.PROFILE,
        label: 'Perfil Profesional',
        icon: <IdcardOutlined/>,
    },
];