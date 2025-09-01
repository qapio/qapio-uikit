import { useCallback, useEffect } from 'react';
import { useEdgesState, useNodesState } from '@xyflow/react';
import { layoutDagre, type LayoutDirection } from './LayoutUtil.ts';

type Options = {
    direction?: LayoutDirection;
    auto?: boolean; // re-layout whenever nodes/edges change
    defaultNodeSize?: { width: number; height: number };
    nodeSep?: number;
    rankSep?: number;
    edgeSep?: number;
    ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
};

export function useDagreLayout(initialNodes, initialEdges, opts: Options = {}) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const runLayout = useCallback(
        (dir?: LayoutDirection) => {
            const { nodes: ln, edges: le } = layoutDagre(nodes, edges, { ...opts, direction: dir ?? opts.direction });
            setNodes(ln);
            setEdges(le);
        },
        [nodes, edges, setNodes, setEdges, opts]
    );

    // auto-layout whenever inputs change (optional)
    useEffect(() => {
        if (opts.auto) runLayout();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nodes.length, edges.length, opts.direction, opts.auto]);

    return {
        nodes,
        edges,
        setNodes,
        setEdges,
        onNodesChange,
        onEdgesChange,
        runLayout,
    };
}
