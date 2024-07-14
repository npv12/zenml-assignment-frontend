import { StackData } from '../types/Stacks';
import { BASE_BACKEND_URL } from '../utils/constants';

export async function getStacks() {
    return (await fetch(`${BASE_BACKEND_URL}/stacks`).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error('Failed to fetch stacks');
    })) as any[];
}

export async function getStackDetails(id: string) {
    return (await fetch(`${BASE_BACKEND_URL}/stacks/${id}`).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error('Failed to fetch stacks');
    })) as StackData;
}
