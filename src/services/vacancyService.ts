import type {Vacancy} from '../types/Vacancy';

const MOCK_VACANCIES: Vacancy[] = [
    {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechFlow Mexico',
        location: 'Remote (Mexico City)',
        description: 'Buscamos un experto en React y TypeScript con experiencia en arquitecturas escalables...',
        datePosted: '2025-10-20',
        dateSaved: '2025-10-21',
        status: 'interview',
        matchScore: 92,
        requiredSkills: ['React', 'TypeScript', 'GraphQL', 'AWS'],
        platform: 'LinkedIn',
        url: 'https://linkedin.com/jobs/view/123456'
    },
    {
        id: '2',
        title: 'Full Stack Engineer (Java/React)',
        company: 'Banco Futuro',
        location: 'Guadalajara, Jalisco',
        description: 'Desarrollo de aplicaciones bancarias seguras utilizando Spring Boot y React...',
        datePosted: '2025-10-22',
        dateSaved: '2025-10-23',
        status: 'applied',
        matchScore: 85,
        requiredSkills: ['Java', 'Spring Boot', 'React', 'SQL'],
        salaryRange: '$60,000 - $80,000 MXN',
        platform: 'Indeed',
        url: 'https://indeed.com/viewjob?jk=123456'
    },
    {
        id: '3',
        title: 'Software Architect',
        company: 'Global Systems',
        location: 'Monterrey, NL',
        description: 'Liderar la migración a microservicios...',
        datePosted: '2025-10-15',
        dateSaved: '2025-10-18',
        status: 'rejected',
        matchScore: 45,
        requiredSkills: ['Kubernetes', 'Go', 'Python', 'System Design'],
        platform: 'Glassdoor',
        url: 'https://glassdoor.com/job/123'
    },
    {
        id: '4',
        title: 'React Native Developer',
        company: 'StartUp Fast',
        location: 'Remote',
        description: 'Creación de app móvil para e-commerce...',
        datePosted: '2025-10-23',
        dateSaved: '2025-10-23',
        status: 'offer',
        matchScore: 98,
        requiredSkills: ['React Native', 'Redux', 'Firebase'],
        salaryRange: '$55,000 MXN',
        platform: 'LinkedIn',
        url: 'https://linkedin.com/jobs/view/999'
    }
];

export const VacancyService = {
    getAll: async (): Promise<Vacancy[]> => {
        // Simulate network delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_VACANCIES);
            }, 800);
        });
    },

    getById: async (id: string): Promise<Vacancy | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_VACANCIES.find(v => v.id === id));
            }, 500);
        });
    }
};