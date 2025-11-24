// src/menu/Sidebar.tsx
import React, {useState} from 'react';
import {Outlet, useNavigate, useLocation} from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined
} from '@ant-design/icons';
import {Layout, Menu, theme, Button} from 'antd';
import type {MenuProps} from 'antd';
import {type AppMenuItem, SIDEBAR_ITEMS} from "./menu.config.tsx";

const {Header, Content, Sider} = Layout;

// Helper para transformar nuestra config simple a la config compleja de AntD
const transformToAntdItems = (items: AppMenuItem[]): MenuProps['items'] => {
    return items.map((item) => ({
        key: item.key,
        icon: item.icon,
        label: item.label,
        children: item.children ? transformToAntdItems(item.children) : undefined,
    }));
};

export function Sidebar(): React.JSX.Element {
    const [collapsed, setCollapsed] = useState(false);
    const {token} = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    // Generamos los items dinámicamente
    const antdMenuItems = transformToAntdItems(SIDEBAR_ITEMS);

    // Lógica para mantener el menú seleccionado incluso en sub-rutas
    // (Ej: si estás en /vacantes/detalle, que siga marcado /vacantes)
    const getSelectedKey = () => {
        return location.pathname;
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{background: token.colorBgContainer}}
                theme="dark"
            >
                {/* Logo area */}
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
                    // Usamos el path actual como la llave seleccionada
                    selectedKeys={[getSelectedKey()]}
                    items={antdMenuItems}
                    // Al hacer click, navegamos a la "key" que definimos como la RUTA
                    onClick={({key}) => navigate(key)}
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
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default Sidebar;