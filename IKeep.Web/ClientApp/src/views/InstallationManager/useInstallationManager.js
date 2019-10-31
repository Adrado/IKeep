import { useState, useCallback } from 'react';
import TreeNode from '../../services/dtos/TreeNode';
const useInstallationManager = () =>
{
    const[node, setNode] = useState(new TreeNode)

    const onSelectNode = useCallback((nodeSelected) =>
    {
        let treeNode = new TreeNode(nodeSelected);
        setNode(treeNode);
    }, []);

    return{
        node,
        onSelectNode
    }
}

export default useInstallationManager