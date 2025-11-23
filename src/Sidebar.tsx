import React, {useState} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {Layout, Menu, theme, Button} from 'antd';
import type {MenuProps} from 'antd';

const {Header, Content, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

// Helper to create menu items with proper typing
function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {key, icon, children, label} as MenuItem;
}

// Menu Definition
const menuItems: MenuItem[] = [
    getItem('Dashboard', '/', <PieChartOutlined/>),
    // Nota: Usamos '/vacancies' para coincidir con el nombre del componente,
    // asegúrate de actualizar tu main.tsx router si cambias esto.
    getItem('Mis Vacantes', '/vacantes', <DesktopOutlined/>),
    getItem('Perfil', '/perfil', <UserOutlined/>),
];

export function Sidebar(): React.JSX.Element {
    const [collapsed, setCollapsed] = useState(false);
    const {token} = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    // Determine selected key based on current URL to keep menu in sync
    const selectedKey = location.pathname === '/' ? '/' : location.pathname;

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{background: token.colorBgContainer}}
                theme="light" // Cambiado a light para un look más moderno, o usa "dark" si prefieres
            >
                <div
                    style={{
                        height: 32,
                        margin: 16,
                        background: token.colorPrimary,
                        borderRadius: 6,
                        opacity: 0.2
                    }}
                />

                <Menu
                    theme="light"
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    onClick={({key}) => navigate(key.toString())}
                    style={{borderRight: 0}}
                />
            </Sider>

            <Layout>
                <Header style={{padding: 0, background: token.colorBgContainer, display: 'flex', alignItems: 'center'}}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <span style={{fontWeight: 600, fontSize: 16}}>Job Analyzer</span>
                </Header>

                <Content style={{margin: '24px 16px 0'}}>
                    {/* The Outlet renders the child route components (Dashboard, VacanciesPage, etc.) */}
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Sidebar;