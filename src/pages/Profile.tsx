import {Card, Avatar, Descriptions, Button, Tag, Divider, Row, Col} from 'antd';
import {UserOutlined, EditOutlined, GithubOutlined, LinkedinOutlined, MailOutlined} from '@ant-design/icons';
import type {JSX} from 'react';

export function Profile(): JSX.Element {

    // Static data for now
    const userProfile = {
        name: "Tu Nombre",
        role: "Full Stack Developer",
        location: "Ciudad de México, MX",
        email: "dev@example.com",
        availability: "Abierto a ofertas",
        techStack: ["React", "TypeScript", "Node.js", "SQL", "Ant Design"]
    };

    return (
        <div style={{maxWidth: 1000, margin: '0 auto'}}>
            <Card bordered={false}>
                <Row gutter={[24, 24]} align="middle">
                    {/* Avatar Section */}
                    <Col xs={24} sm={6} style={{textAlign: 'center'}}>
                        <Avatar size={120} icon={<UserOutlined/>} style={{backgroundColor: '#537fbc'}}/>
                        <div style={{marginTop: 16}}>
                            <Tag color="green">{userProfile.availability}</Tag>
                        </div>
                    </Col>

                    {/* Info Section */}
                    <Col xs={24} sm={18}>
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start'}}>
                            <div>
                                <h1 style={{margin: 0, fontSize: '24px'}}>{userProfile.name}</h1>
                                <p style={{fontSize: '16px', color: '#666', margin: '4px 0'}}>{userProfile.role}</p>
                                <p style={{color: '#999'}}>📍 {userProfile.location}</p>
                            </div>
                            <Button icon={<EditOutlined/>}>Editar</Button>
                        </div>

                        <Divider style={{margin: '16px 0'}}/>

                        <Descriptions column={{xs: 1, sm: 2}} layout="vertical">
                            <Descriptions.Item label={<><MailOutlined/> Email</>}>
                                {userProfile.email}
                            </Descriptions.Item>
                            <Descriptions.Item label="Enlaces">
                                <Button type="link" icon={<GithubOutlined/>} href="https://github.com" target="_blank"/>
                                <Button type="link" icon={<LinkedinOutlined/>} href="https://linkedin.com"
                                        target="_blank"/>
                            </Descriptions.Item>
                        </Descriptions>

                        <div style={{marginTop: 16}}>
                            <span style={{marginRight: 12, fontWeight: 500}}>Skills Principales:</span>
                            {userProfile.techStack.map(tech => (
                                <Tag key={tech}>{tech}</Tag>
                            ))}
                        </div>
                    </Col>
                </Row>
            </Card>

            {/* Additional Section (CV, Bio, etc.) */}
            <Card title="Sobre mí" bordered={false} style={{marginTop: 24}}>
                <p style={{color: '#555', lineHeight: 1.6}}>
                    Desarrollador apasionado por crear experiencias web eficientes.
                    Actualmente enfocado en modernizar aplicaciones legacy y optimizar flujos de trabajo.
                    (Aquí puedes renderizar tu Markdown personal más adelante).
                </p>
            </Card>
        </div>
    );
}

export default Profile;