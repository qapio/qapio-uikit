import dagre from '@dagrejs/dagre';

export type LayoutDirection = 'TB' | 'BT' | 'LR' | 'RL';

type Size = { width: number; height: number };

type DagreOptions = {
    direction?: LayoutDirection;   // 'TB' by default
    defaultNodeSize?: Size;         // used if a node has no .width / .height
    nodeSep?: number;               // Dagre spacing knobs (optional)
    rankSep?: number;
    edgeSep?: number;
    ranker?: 'network-simplex' | 'tight-tree' | 'longest-path';
};

export function layoutDagre<N extends { id: string; width?: number; height?: number; position?: any; sourcePosition?: any; targetPosition?: any }>(
    nodes: N[],
    edges: { source: string; target: string }[],
    {
        direction = 'TB',
        defaultNodeSize = { width: 172, height: 36 },
        nodeSep,
        rankSep,
        edgeSep,
        ranker,
    }: DagreOptions = {}
) {
    const isHorizontal = direction === 'LR' || direction === 'RL';

    const g = new dagre.graphlib.Graph();
    g.setDefaultEdgeLabel(() => ({}));

    g.setGraph({
        rankdir: direction,   // TB | BT | LR | RL
        nodesep: nodeSep,
        ranksep: rankSep,
        edgesep: edgeSep,
        ranker,
    });

    // 1) register nodes with their sizes
    nodes.forEach((n) => {
        const width  = n.width  ?? defaultNodeSize.width;
        const height = n.height ?? defaultNodeSize.height;
        g.setNode(n.id, { width, height });
    });

    // 2) register edges
    edges.forEach((e) => g.setEdge(e.source, e.target));

    // 3) run dagre
    dagre.layout(g);

    // 4) map positions back to RF nodes (center -> top-left)
    const layoutedNodes = nodes.map((n) => {
        const { x, y, width, height } = g.node(n.id);
        return {
            ...n,
            targetPosition: isHorizontal ? 'left' : 'top',
            sourcePosition: isHorizontal ? 'right' : 'bottom',
            position: { x: x - (width ?? defaultNodeSize.width) / 2, y: y - (height ?? defaultNodeSize.height) / 2 },
        };
    });

    return { nodes: layoutedNodes, edges };
}
