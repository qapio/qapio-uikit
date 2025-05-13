export function pluckFromTree(tree, path, key = 'id') {
    const segments = path.replace(/^\/+/, '').split('/');

    function search(nodes, depth = 0) {
        if (!nodes || depth >= segments.length) return undefined;

        for (const node of nodes) {
            if (node[key] === segments[depth]) {
                if (depth === segments.length - 1) {
                    return node;
                }
                return search(node.items, depth + 1);
            }
        }

        return undefined;
    }

    return search(tree);
}
