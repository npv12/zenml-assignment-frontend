'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { getStacks } from './api/stacks';
import ErrorPage from './errorPage';
import LoadingPage from './loadingPage';
import { StackData } from './types/stacks';
import { convertSlugToTitle, truncateLabel } from './utils/common';

export default function Stacks() {
    const router = useRouter();
    const {
        data: allStacks,
        isLoading: isStacksLoading,
        error: stacksFetchError,
    } = useQuery<StackData[]>({
        queryKey: ['stream-hydrate-stacks'],
        queryFn: () => getStacks(),
        staleTime: 5 * 1000,
    });

    if (isStacksLoading) {
        return <LoadingPage text="Fetching all stacks...." />;
    }

    if (stacksFetchError) {
        return <ErrorPage text={`Something went wrong while fetching data`} />;
    }

    if (!allStacks) {
        return (
            <div
                className="flex min-h-screen flex-col items-center justify-center"
                style={{ height: '100vh' }}
            >
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    No stacks found
                </h1>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-20">
            <header className="m-auto mb-5 flex justify-center items-center">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    All Stacks
                </h1>
            </header>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5">
                {allStacks?.map((stacks) => (
                    <Card
                        key={stacks.id}
                        className="shadow m-2.5 rounded-lg p-5 flex flex-col justify-between"
                    >
                        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            {truncateLabel(convertSlugToTitle(stacks.name))}
                        </h4>
                        <p className="m-2">
                            <strong>User ID:</strong> {stacks.user}
                        </p>
                        <p className="m-2">
                            {' '}
                            <strong>Project ID:</strong> {stacks.project}
                        </p>
                        {stacks.description && (
                            <p className="m-2">
                                {' '}
                                <strong>Description:</strong>{' '}
                                {stacks.description}
                            </p>
                        )}
                        <div className="grid place-items-center grid-cols-2 gap-3">
                            {Object.keys(stacks.components).map(
                                (componentType: string) => (
                                    <Badge
                                        variant="secondary"
                                        className="p-1 d-flex justify-content-center align-items-center"
                                        style={{
                                            width: '120px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <p className="m-0 text-center">
                                            {convertSlugToTitle(componentType)}
                                        </p>
                                    </Badge>
                                ),
                            )}
                        </div>

                        <Button
                            className="m-2"
                            onClick={() => router.push(`/stacks/${stacks.id}`)}
                        >
                            View Details
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}
