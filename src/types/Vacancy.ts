export type VacancyStatus = 'pending' | 'applied' | 'interview' | 'rejected' | 'offer';

export type JobPlatform = 'LinkedIn' | 'Indeed' | 'Glassdoor' | 'Other';

export interface Vacancy {
    // Identificadores
    id: string;
    platformId?: string;
    url: string;

    // Información Principal (Contenido en Español)
    title: string;
    company: string;
    location: string;
    description: string;

    // Metadatos de Fechas
    datePosted: string;     // ISO 8601 (2025-10-23)
    dateExpires?: string;
    dateSaved: string;

    // Análisis y Clasificación
    status: VacancyStatus;
    matchScore: number;

    // Habilidades (Tags)
    requiredSkills: string[];
    missingSkills?: string[];

    // Metadatos Adicionales
    salaryRange?: string;
    platform: JobPlatform;
}

export const StatusLabels: Record<VacancyStatus, string> = {
    pending: 'Pendiente',
    applied: 'Aplicado',
    interview: 'Entrevista',
    rejected: 'Rechazado',
    offer: 'Oferta',
};

export const StatusColors: Record<VacancyStatus, string> = {
    pending: 'default',
    applied: 'blue',
    interview: 'purple',
    rejected: 'red',
    offer: 'green',
};
