'use client';

import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { Fragment } from 'react';

import { BASE_BACKEND_URL } from './utils/constants';

async function getStacks() {
    return (await fetch(`${BASE_BACKEND_URL}/stacks`).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        // something went wrong while fetching the data.
        // all error handling happens across here.
        throw new Error('Failed to fetch stacks');
    })) as any[];
}

export default function Stacks() {
    const {
        data: allStacks,
        isLoading: isStacksLoading,
        error: stacksFetchError,
    } = useQuery<any[]>({
        queryKey: ['stream-hydrate-stacks'],
        queryFn: () => getStacks(),
        staleTime: 5 * 1000,
    });

    if (isStacksLoading) {
        return <div>Loading...</div>;
    }

    if (stacksFetchError) {
        return <div>Error: {stacksFetchError.message}</div>;
    }

    if (!allStacks) {
        return <div>No stacks found</div>;
    }

    return (
        <Fragment>
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr 1fr',
                    gap: 20,
                }}
            >
                {allStacks?.map((stacks) => (
                    <Card key={stacks.id}>
                        <h3>{stacks.name}</h3>
                        <Link href={`/stacks/${stacks.id}`}>View Details</Link>
                    </Card>
                ))}
            </div>
        </Fragment>
    );
}
