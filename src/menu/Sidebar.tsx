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

    const antdMenuItems = transformToAntdItems(SIDEBAR_ITEMS);

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
                    selectedKeys={[getSelectedKey()]}
                    items={antdMenuItems}
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