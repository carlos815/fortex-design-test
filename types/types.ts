export interface Group {
    id: string;
    name: string;
    description: string;
    type: boolean;
    roles: Item[];
    people: Item[];
    members: number;
}

export interface Item {
    id: string;
    name: string;
    active: boolean;
}
