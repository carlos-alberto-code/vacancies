import {type ThemeConfig, theme} from 'antd';

const themeConfiguration: ThemeConfig = {
    algorithm: theme.darkAlgorithm,
    token: {
        colorPrimary: "#3b82f6",
        colorInfo: "#06b6d4",

        // --- SEMÁNTICA DE DATOS ---
        colorSuccess: "#10b981",
        colorError: "#ef4444",
        colorWarning: "#f59e0b",

        // --- TIPOGRAFÍA Y BASE ---
        colorBgBase: "#0f172a",
        colorTextBase: "#f1f5f9",

        // --- GEOMETRÍA ---
        borderRadius: 6,
        fontFamily: "'Inter', 'Roboto', sans-serif",
    },

    components: {
        Layout: {
            bodyBg: '#0f172a',
            headerBg: '#1e293b',
            siderBg: '#1e293b',
        },
        Menu: {
            darkItemBg: '#1e293b',
            darkItemSelectedBg: '#334155',
            itemSelectedColor: '#3b82f6',
        },
        Card: {
            colorBgContainer: '#1e293b',
            boxShadowTertiary: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        },
        Table: {
            headerBg: '#1e293b',
            headerColor: '#94a3b8',
            rowHoverBg: '#334155',
        },
        Statistic: {
            titleFontSize: 14,
            contentFontSize: 24,
        }
    }
};

export default themeConfiguration;