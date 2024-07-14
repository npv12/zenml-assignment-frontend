export interface StackData {
    id: string;
    created: string;
    updated: string;
    user: string;
    project: string;
    is_shared: boolean;
    name: string;
    description: string;
    components: {
        [key: string]: string[];
    };
}
