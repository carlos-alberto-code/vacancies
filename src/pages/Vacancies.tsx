import {useState, useEffect} from 'react';
import type {JSX} from 'react';
import {
    Layout,
    Breadcrumb,
    Row,
    Col,
    Button,
    Input,
    Card,
    Drawer,
    message,
    theme
} from 'antd';
import {
    HomeOutlined,
    SearchOutlined,
    FilterOutlined,
    PlusOutlined,
    ReloadOutlined
} from '@ant-design/icons';

// Services & Types
import type {Vacancy} from '../types/Vacancy';
import {VacancyService} from '../services/vacancyService';
import {VacancyStats} from "../components/vacancy/VacancyStats.tsx";
import VacancyTable from "../components/vacancy/VacancyTable.tsx";
import {VacancyDetails} from "../components/vacancy/VacancyDetails.tsx";

// Sub-components

const {Content} = Layout;

export function Vacancies(): JSX.Element {
    // 1. State Management
    const [vacancies, setVacancies] = useState<Vacancy[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchText, setSearchText] = useState<string>('');

    // Drawer State
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

    const {token} = theme.useToken();

    // 2. Data Fetching
    const fetchVacancies = async () => {
        setIsLoading(true);
        try {
            const data = await VacancyService.getAll();
            setVacancies(data);
        } catch (error) {
            console.error(error);
            message.error('Error al cargar las vacantes');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVacancies();
    }, []);

    // 3. Event Handlers
    const handleRefresh = () => {
        fetchVacancies();
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value);
    };

    const handleRowClick = (vacancy: Vacancy) => {
        setSelectedVacancy(vacancy);
        setIsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedVacancy(null);
    };

    const handleAnalyzeUrl = () => {
        message.info('Funcionalidad de análisis de URL en construcción');
    };

    // Filter logic
    const filteredVacancies = vacancies.filter((v) =>
        v.title.toLowerCase().includes(searchText.toLowerCase()) ||
        v.company.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <Content style={{paddingBottom: 20}}>
            {/* A. Navigation Breadcrumbs */}
            <Breadcrumb
                items={[
                    {href: '/', title: <HomeOutlined/>},
                    {title: 'Gestión de Vacantes'},
                ]}
                style={{marginBottom: 16}}
            />

            {/* B. Statistics Section */}
            <div style={{marginBottom: 24}}>
                <VacancyStats vacancies={vacancies}/>
            </div>

            {/* C. Main Content Area */}
            <Card bordered={false} className="shadow-sm" style={{borderRadius: 8}}>

                {/* Toolbar Section */}
                <Row
                    justify="space-between"
                    align="middle"
                    style={{marginBottom: 16}}
                    gutter={[16, 16]}
                >
                    <Col xs={24} md={10}>
                        <Input
                            placeholder="Buscar por puesto, empresa o tecnología..."
                            prefix={<SearchOutlined style={{color: token.colorTextQuaternary}}/>}
                            size="large"
                            onChange={handleSearch}
                            allowClear
                        />
                    </Col>
                    <Col xs={24} md={14} style={{textAlign: 'right'}}>
                        <div style={{display: 'flex', gap: 8, justifyContent: 'flex-end'}}>
                            <Button icon={<ReloadOutlined/>} onClick={handleRefresh}>
                                Actualizar
                            </Button>
                            <Button icon={<FilterOutlined/>}>
                                Filtros
                            </Button>
                            <Button
                                type="primary"
                                icon={<PlusOutlined/>}
                                onClick={handleAnalyzeUrl}
                            >
                                Analizar URL
                            </Button>
                        </div>
                    </Col>
                </Row>

                {/* Table Section */}
                <VacancyTable
                    data={filteredVacancies}
                    isLoading={isLoading}
                    onRowClick={handleRowClick}
                />

            </Card>

            {/* D. Details Drawer */}
            <Drawer
                title="Detalles de la Vacante"
                placement="right"
                onClose={handleCloseDrawer}
                open={isDrawerOpen}
                width={640}
                styles={{
                    body: {paddingBottom: 80}
                }}
            >
                {selectedVacancy ? (
                    <VacancyDetails vacancy={selectedVacancy}/>
                ) : (
                    <p>Cargando detalles...</p>
                )}
            </Drawer>
        </Content>
    );
}

export default Vacancies;