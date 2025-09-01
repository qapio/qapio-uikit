import React, { useMemo, useEffect, useRef } from 'react';

import {
    ReactFlow,
    ReactFlowInstance,
    type Node,
} from '@xyflow/react';
// import '@xyflow/react/dist/style.css';
import { useDagreLayout } from './Layout.tsx';

type Props = {
    nodes: Node[];
    edges: any[];
    direction?: 'TB' | 'BT' | 'LR' | 'RL';
    auto?: boolean;
    fitView?: boolean;
    className?: string;
    nodeDefaults?: Partial<Node>; // ⬅️ new
};

const nodeProps = {
    type: 'default',
    connectable: false,
    position: {x:0,y:0},
    style: {
        background: '#0a0a0a',
        padding: '0px',
        borderRadius: '5px',
        visibility: "visible"
    },
};

export function Diagram({
                                           nodes: initialNodes,
                                           edges: initialEdges,
                                           direction = 'TB',
                                           auto = true,
                                           fitView = true,
                                           className,
                                           nodeDefaults=nodeProps ,
                                       }: Props) {
    // Merge caller's nodes with your defaults (caller wins on conflicts)
    const mergedNodes = useMemo(
        () =>
            initialNodes.map((n) => ({
                ...nodeDefaults,
                ...n,
                data: { ...(nodeDefaults?.data ?? {}), ...(n.data ?? {}) },
            })),
        [initialNodes, nodeDefaults]
    );

    const { nodes, edges, onNodesChange, onEdgesChange, runLayout } =
        useDagreLayout(mergedNodes, initialEdges, { direction, auto });

    // FitView instance:
    const rf = useRef<ReactFlowInstance | null>(null);

    // Fit whenever the laid-out node set changes
    useEffect(() => {
        if (!rf.current) return;
        // Wait a frame so DOM can measure node sizes
        requestAnimationFrame(() => {
            rf.current!.fitView({ padding: 0.2, includeHiddenNodes: true });
        });
    }, [nodes, edges]);

    return (
        <div className={className}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onInit={(instance) => {
                    rf.current = instance;
                    instance.fitView({ padding: 0.2, includeHiddenNodes: true });
                }}
                // Let us control fitting manually
                fitView={false}
                // (optional) still provide default options if you flip fitView on
                fitViewOptions={{ padding: 0.2, includeHiddenNodes: true }}
                minZoom={0.1}
            />
        </div>

    );
}
