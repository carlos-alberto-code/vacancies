import React from 'react';
import {
    PieChartOutlined,
    DesktopOutlined,
    UserOutlined
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
        icon: <DesktopOutlined/>,
    },
    {
        key: ROUTES.DASHBOARD,
        label: 'Dashboard',
        icon: <PieChartOutlined/>,
    },
    {
        key: ROUTES.VACANCIES,
        label: 'Vacantes',
        icon: <DesktopOutlined/>,
    },
    {
        key: ROUTES.PROFILE,
        label: 'Perfil Profesional',
        icon: <UserOutlined/>,
    },
];