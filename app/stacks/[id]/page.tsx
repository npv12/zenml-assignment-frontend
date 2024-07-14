'use client';

import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { getStackDetails } from '../../api/stacks';
import LoadingPage from '../../LoadingPage';
import { Edge, Node } from '../../types/flow';
import { StackData } from '../../types/Stacks';
import { getNodesAndEdges } from '../../utils/flow';

const VisualiseStack = () => {
    const reactFlow = useReactFlow();
    const { id } = useParams();
    const router = useRouter();
    const {
        data: stacksData,
        isLoading: isStacksLoading,
        error: stacksFetchError,
    } = useQuery<StackData>({
        queryKey: [`stream-hydrate-stacks-${id}`],
        queryFn: () => getStackDetails(id as string),
        staleTime: 5 * 1000,
    });

    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);

    useEffect(() => {
        const handleResize = () => {
            if (stacksData) {
                const { nodes, edges } = getNodesAndEdges(stacksData);
                setNodes(nodes);
                setEdges(edges);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [stacksData]);

    if (isStacksLoading) {
        return <LoadingPage text="Fetching stack details...." />;
    }

    if (stacksFetchError) {
        return <div>Error: {stacksFetchError.message}</div>;
    }

    if (!stacksData) {
        return <div>No stacks found</div>;
    }

    const fitView = () => {
        reactFlow.fitView();
    };

    return (
        <div className="flex min-h-screen flex-col" style={{ height: '100vh' }}>
            <header className="m-auto mb-5 mt-10 flex justify-between items-center w-full">
                <Button className="ml-8" onClick={() => router.push(`/`)}>
                    <h4 className="scroll-m-20 text-l font-semibold tracking-tight p-2">
                        Dashboard
                    </h4>
                </Button>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    My Stack
                </h1>
                <Button className="mr-8" onClick={fitView}>
                    <h4 className="scroll-m-20 text-l font-semibold tracking-tight">
                        Fit View
                    </h4>
                </Button>
            </header>
            <ReactFlow nodes={nodes} edges={edges} fitView></ReactFlow>
        </div>
    );
};

export default VisualiseStack;
