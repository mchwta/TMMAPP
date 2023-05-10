export interface Entry {
    id: string;
    date: string;
    title: string;
    pictureUrl: string;
    description: string;
    link: string;
    completed: boolean;
}

export function toEntry(doc): Entry {
    return { id: doc.id, ...doc.data() }
}

