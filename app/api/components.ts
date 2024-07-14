import { ComponentData } from '../types/stacks';
import { BASE_BACKEND_URL } from '../utils/constants';

export async function getComponents() {
    return (await fetch(`${BASE_BACKEND_URL}/components`).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        throw new Error('Failed to fetch components');
    })) as ComponentData[];
}
