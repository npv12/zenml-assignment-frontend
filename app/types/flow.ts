export interface Node {
    id: string;
    type?: string;
    data: {
        label: string;
    };
    position: {
        x: number;
        y: number;
    };
}

export interface Edge {
    id: string;
    source: string;
    target: string;
    animated?: boolean;
}
