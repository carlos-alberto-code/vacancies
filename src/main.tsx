import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './index.css'

// Importamos el Layout principal (el esqueleto con Sidebar)
import AppLayout from "./AppLayout"

// Importamos tu nueva página de Vacantes
import VacantesPage from './pages/VacantesPage'

// --- Componentes temporales para las páginas que aún no has creado ---
// (Esto evita que la app se rompa mientras terminas de desarrollar)
const DashboardPage = () => (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h1 style={{fontSize: '2rem'}}>📊 Dashboard de Análisis</h1>
        <p style={{color: '#666'}}>Aquí verás gráficas comparando tus skills vs el mercado.</p>
    </div>
);

const PerfilPage = () => (
    <div style={{textAlign: 'center', marginTop: '50px'}}>
        <h1 style={{fontSize: '2rem'}}>👨‍💻 Mi Perfil Profesional</h1>
        <p style={{color: '#666'}}>Aquí renderizaremos tu archivo Markdown personal.</p>
    </div>
);

// --- Configuración del Router ---
const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>, // El Layout envuelve a todas las sub-rutas
        children: [
            {
                path: "/",          // Ruta raíz (http://localhost:5173/)
                element: <DashboardPage/>,
            },
            {
                path: "/vacantes",  // Ruta de vacantes (http://localhost:5173/vacantes)
                element: <VacantesPage/>,
            },
            {
                path: "/perfil",    // Ruta de perfil (http://localhost:5173/perfil)
                element: <PerfilPage/>,
            },
        ],
    },
]);

// --- Renderizado de la App ---
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)