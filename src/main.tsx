import './index.css'
import {StrictMode} from 'react'
import esES from 'antd/locale/es_ES'
import {createRoot} from 'react-dom/client'
import {ConfigProvider, App as AntdApp} from 'antd'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import theme from './theme'

import Sidebar from './Sidebar'
import {Profile} from "./pages/Profile.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Vacancies from "./pages/Vacancies.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Sidebar/>,
        children: [
            {
                path: "/",
                element: <Dashboard/>,
            },
            {
                path: "/vacantes",
                element: <Vacancies/>,
            },
            {
                path: "/perfil",
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