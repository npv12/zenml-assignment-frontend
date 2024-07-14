import { Edge, Node } from '../types/flow';
import { ComponentData, StackData } from '../types/stacks';
import { convertSlugToTitle } from './common';
import { MOBILE_VIEW_WIDTH } from './constants';

// Since padding is applied to entire page, react flow doesn't account for it
// To keep it still centered. This is a hack
const MISALIGN_X_OFFSET = 75;

const addNodesEdgesForDesktop = (
    stackData: StackData,
    componentData: ComponentData[] | undefined,
    edges: Edge[],
    nodes: Node[],
    startY: number,
    midX: number,
): { nodes: Node[]; edges: Edge[] } => {
    let nodeId = nodes.length + 1;
    let positionX = midX - MISALIGN_X_OFFSET;
    const nodeWidth = 150;

    for (const [componentType, componentIds] of Object.entries(
        stackData.components,
    )) {
        componentIds.forEach((componentId, _) => {
            const component = componentData?.find(
                (component) => component.id === componentId,
            );
            let label = `${convertSlugToTitle(componentType)} ID: ${componentId}`;
            if (component) {
                label = `${convertSlugToTitle(componentType)} named ${convertSlugToTitle(component.name)} of flavor ${component.flavor}`;
            }
            // based on odd and even push the node to left or right
            const positionY = nodeId % 2 === 0 ? startY + 300 : startY + 400;
            const node: Node = {
                id: `${nodeId}_${componentId}`,
                data: {
                    label: label,
                },
                position: { x: positionX, y: positionY },
            };
            nodes.push(node);

            const edge: Edge = {
                id: `e${nodeId - 1}-${nodeId}`,
                source: `3`,
                target: `${nodeId}_${componentId}`,
                animated: true,
            };

            edges.push(edge);

            nodeId++;
            positionX += nodeWidth;
        });
    }

    // Center all the new nodes
    const totalNewNodes = nodes.length - 3; // Exclude the initial nodes
    const newNodesWidth = totalNewNodes * nodeWidth;
    const startX = midX - newNodesWidth / 2;

    for (let i = 3; i < nodes.length; i++) {
        const node = nodes[i];
        node.position.x = startX + (i - 3) * nodeWidth;
    }

    return { nodes, edges };
};

const addNodesEdgesForMobile = (
    stackData: StackData,
    componentData: ComponentData[] | undefined,
    edges: Edge[],
    nodes: Node[],
    midX: number,
    midY: number,
): { nodes: Node[]; edges: Edge[] } => {
    let nodeId = nodes.length + 1;
    let positionY = midY;

    for (const [componentType, componentIds] of Object.entries(
        stackData.components,
    )) {
        componentIds.forEach((componentId, _) => {
            const component = componentData?.find(
                (component) => component.id === componentId,
            );
            let label = `${convertSlugToTitle(componentType)} ID: ${componentId}`;
            if (component) {
                label = `${convertSlugToTitle(componentType)} named ${convertSlugToTitle(component.name)} of flavor ${component.flavor}`;
            }
            const node: Node = {
                id: `${nodeId}_${componentId}`,
                data: {
                    label: label,
                },
                position: { x: midX - MISALIGN_X_OFFSET, y: positionY },
            };
            nodes.push(node);

            const edge: Edge = {
                id: `e3-${nodeId}`,
                source: `3`,
                target: `${nodeId}_${componentId}`,
                animated: true,
            };

            edges.push(edge);

            nodeId++;
            positionY += 100;
        });
    }

    return { nodes, edges };
};

export const getNodesAndEdges = (
    stackData: StackData | undefined,
    componentsData: ComponentData[] | undefined,
): { nodes: Node[]; edges: Edge[] } => {
    if (!stackData) {
        return { nodes: [], edges: [] };
    }
    const midX = window.innerWidth / 2;
    const midY = window.innerHeight / 2;
    const startY = midY - 350;
    const nodes: Node[] = [
        {
            id: '1',
            type: 'input',
            data: { label: convertSlugToTitle(stackData.name) },
            position: { x: midX - MISALIGN_X_OFFSET, y: startY },
        },
        {
            id: '2',
            data: { label: `Project ID: ${stackData.project}` },
            position: { x: midX - MISALIGN_X_OFFSET, y: startY + 100 },
        },
        {
            id: '3',
            data: { label: `User ID: ${stackData.user}` },
            position: { x: midX - MISALIGN_X_OFFSET, y: startY + 200 },
        },
    ];

    const edges: Edge[] = [
        { id: 'e1-2', source: '1', target: '2', animated: true },
        { id: 'e2-3', source: '2', target: '3', animated: true },
    ];

    if (window.innerWidth <= MOBILE_VIEW_WIDTH) {
        return addNodesEdgesForMobile(
            stackData,
            componentsData,
            edges,
            nodes,
            midX,
            midY,
        );
    }
    return addNodesEdgesForDesktop(
        stackData,
        componentsData,
        edges,
        nodes,
        startY,
        midX,
    );
};
