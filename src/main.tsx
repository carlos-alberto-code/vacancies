import './index.css'
import theme from './theme'
import {StrictMode} from 'react'
import esES from 'antd/locale/es_ES'
import {createRoot} from 'react-dom/client'
import {ConfigProvider, App as AntdApp} from 'antd'
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'


import {ROUTES} from "./menu/paths.ts";
import Sidebar from './menu/Sidebar.tsx'
import {Profile} from "./pages/Profile.tsx"
import Dashboard from "./pages/Dashboard.tsx"
import Vacancies from "./pages/Vacancies.tsx"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Sidebar/>,
        children: [
            {
                index: true,
                element: <Navigate to={ROUTES.DASHBOARD} replace/>,
            },
            {
                path: ROUTES.DASHBOARD,
                element: <Dashboard/>,
            },
            {
                path: ROUTES.VACANCIES,
                element: <Vacancies/>,
            },
            {
                path: ROUTES.PROFILE,
                element: <Profile/>,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConfigProvider theme={theme} locale={esES}>
            <AntdApp>
                <RouterProvider router={router}/>
            </AntdApp>
        </ConfigProvider>
    </StrictMode>,
)