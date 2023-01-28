
interface SeedData {
    entries: SeedEntry[]
}

interface SeedEntry {
    description: string;
    status: string;
    createdAt: number
}

export const seedData:SeedData = {
    entries: [
        {
            description: 'Pending - Mi primer task para el TODO xD',
            createdAt: Date.now(),
            status: 'pending'
        },
        {
            description: 'Completed - Task terminado',
            createdAt: Date.now(),
            status: 'finished'
        },
        {
            description: 'In-progres Task en progreso',
            createdAt: Date.now(),
            status: 'in-progress'
        }
    ]
}