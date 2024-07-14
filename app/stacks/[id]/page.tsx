'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import ReactFlow, { Background, Controls, MiniMap } from 'reactflow';
import 'reactflow/dist/style.css';

import { Edge, Node } from '../../types/flow';
import { StackData } from '../../types/Stacks';
import { BASE_BACKEND_URL } from '../../utils/constants';

async function getStackDetails(id: string) {
    return (await fetch(`${BASE_BACKEND_URL}/stacks/${id}`).then((res) => {
        if (res.status === 200) {
            return res.json();
        }
        // something went wrong while fetching the data.
        // all error handling happens across here.
        throw new Error('Failed to fetch stacks');
    })) as StackData;
}

const getNodesAndEdges = (
    stackData: StackData,
): { nodes: Node[]; edges: Edge[] } => {
    const nodes: Node[] = [
        {
            id: '1',
            type: 'input',
            data: { label: `${stackData.name}` },
            position: { x: 250, y: 0 },
        },
        {
            id: '2',
            data: { label: `Project: ${stackData.project}` },
            position: { x: 400, y: 100 },
        },
        {
            id: '3',
            data: { label: `User: ${stackData.user}` },
            position: { x: 100, y: 100 },
        },
    ];

    const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e1-3', source: '1', target: '3', animated: true },
        { id: 'e2-4', source: '2', target: '4', animated: true },
    ];

    let positionY = 200;
    let nodeId = 4;

    for (const [componentType, componentIds] of Object.entries(
        stackData.components,
    )) {
        componentIds.forEach((componentId, index) => {
            const node: Node = {
                id: `${nodeId}`,
                data: { label: `${componentType}: ${componentId}` },
                position: { x: 250, y: positionY },
            };
            nodes.push(node);

            const edge: Edge = {
                id: `e${nodeId - 1}-${nodeId}`,
                source: `${nodeId - 1}`,
                target: `${nodeId}`,
                animated: true,
            };

            edges.push(edge);

            nodeId++;
            positionY += 150;
        });
    }

    return { nodes, edges };
};

const FlowChart = () => {
    const { id } = useParams();
    const {
        data: stacksData,
        isLoading: isStacksLoading,
        error: stacksFetchError,
    } = useQuery<StackData>({
        queryKey: [`stream-hydrate-stacks-${id}`],
        queryFn: () => getStackDetails(id as string),
        staleTime: 5 * 1000,
    });
    if (!stacksData) {
        return <div>No stacks found</div>;
    }

    if (isStacksLoading) {
        return <div>Loading...</div>;
    }

    if (stacksFetchError) {
        return <div>Error: {stacksFetchError.message}</div>;
    }

    const [nodes, setNodes] = React.useState<Node[]>([]);
    const [edges, setEdges] = React.useState<Edge[]>([]);

    useEffect(() => {
        const { nodes, edges } = getNodesAndEdges(stacksData);
        setNodes(nodes);
        setEdges(edges);
    }, [stacksData]);

    return (
        <div style={{ height: '100vh' }}>
            <ReactFlow nodes={nodes} edges={edges}>
                <MiniMap />
                <Controls />
                <Background />
            </ReactFlow>
        </div>
    );
};

export default FlowChart;
