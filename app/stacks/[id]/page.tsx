'use client';

import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ReactFlow, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { getComponents } from '../../api/components';
import { getStackDetails } from '../../api/stacks';
import ComponentDialog from '../../components/ComponentDialog';
import ErrorPage from '../../errorPage';
import LoadingPage from '../../loadingPage';
import { Edge, Node } from '../../types/flow';
import { ComponentData, StackData } from '../../types/stacks';
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

    const {
        data: componentsData,
        isLoading: isComponentsLoading,
        error: componentFetchError,
    } = useQuery<ComponentData[]>({
        queryKey: ['stream-hydrate-components'],
        queryFn: () => getComponents(),
        staleTime: 5 * 1000,
    });

    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);
    const [currentComponent, setCurrentComponent] =
        React.useState<ComponentData>();
    const [isModelOpen, setIsModelOpen] = React.useState(false);

    const handleNodeClick = (_: React.MouseEvent, node: Node) => {
        // The cases which arent a component
        if (node.id === '1' || node.id === '2' || node.id === '3') return;
        const componentId = node.id.split('_')[1];
        const component = componentsData?.find(
            (component) => component.id === componentId,
        );
        if (!component) return;
        setCurrentComponent(component);
        setIsModelOpen(true);
    };

    useEffect(() => {
        const handleResize = () => {
            if (stacksData) {
                const { nodes, edges } = getNodesAndEdges(
                    stacksData,
                    componentsData,
                );
                setNodes(nodes);
                setEdges(edges);
            }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [stacksData, componentsData]);

    if (isStacksLoading || isComponentsLoading) {
        return <LoadingPage text="Fetching stack details...." />;
    }

    if (stacksFetchError || componentFetchError) {
        return <ErrorPage text={`Something went wrong while fetching data`} />;
    }

    if (!stacksData) {
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

    const fitView = () => {
        if (reactFlow) reactFlow.fitView();
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
            <ReactFlow
                nodes={nodes}
                edges={edges}
                fitView
                onNodeClick={handleNodeClick}
            />
            <ComponentDialog
                componentData={currentComponent}
                isOpen={isModelOpen}
                onClose={() => {
                    setIsModelOpen(false);
                    setCurrentComponent(undefined);
                }}
            />
        </div>
    );
};

export default VisualiseStack;
