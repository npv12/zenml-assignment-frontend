'use client';

import { Button } from '@/components/ui/button';
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
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: 20,
                }}
            >
                {allStacks?.map((stacks) => (
                    <Card
                        key={stacks.id}
                        style={{
                            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                            margin: '10px',
                            borderRadius: '8px',
                            padding: '20px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h2>{stacks.name}</h2>
                        <p>{stacks.description}</p>
                        <div style={{ marginTop: 'auto' }}>
                            <Button
                                style={{
                                    marginTop: 'auto',
                                    color: 'white',
                                    padding: '10px',
                                    borderRadius: '4px',
                                    border: 'none',
                                    cursor: 'pointer',
                                }}
                            >
                                <Link href={`/stacks/${stacks.id}`}>
                                    View Details
                                </Link>
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>
        </Fragment>
    );
}
