import React, {useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom'; // <--- IMPORTANTE
import {
    DesktopOutlined,
    PieChartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, theme} from 'antd';
import type {MenuProps} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {key, icon, children, label} as MenuItem;
}

// 1. CAMBIO CLAVE: Las 'keys' ahora son las rutas de la URL
const items: MenuItem[] = [
    getItem('Dashboard', '/', <PieChartOutlined/>),
    getItem('Mis Vacantes', '/vacantes', <DesktopOutlined/>),
    getItem('Perfil', '/perfil', <UserOutlined/>),
];

const AppLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {token: {colorBgContainer, borderRadiusLG}} = theme.useToken();

    // Hook para navegar programáticamente
    const navigate = useNavigate();

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical"
                     style={{height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6}}/>

                <Menu
                    theme="dark"
                    defaultSelectedKeys={['/']}
                    mode="inline"
                    items={items}
                    // 2. CONEXIÓN: Al hacer clic, navegamos a la ruta (key)
                    onClick={({key}) => navigate(key.toString())}
                />
            </Sider>

            <Layout>
                <Header style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '16px'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        {/* 3. EL HUECO MÁGICO: Aquí se renderizará la página que selecciones */}
                        <Outlet/>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Job Analyzer ©{new Date().getFullYear()}
                </Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;