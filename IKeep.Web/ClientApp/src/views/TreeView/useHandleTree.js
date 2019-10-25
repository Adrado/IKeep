import {useState, useContext} from 'react';
import {Functions} from '../../providers/Providers'

const useHandleTree = (treeData) =>
{
    const onSelectNode = useContext(Functions);
    const [data, setData] = useState(treeData);

    const [cursor, setCursor] = useState(null);
    //const [nodeSelected, setNodeSelected] = useState(null);

    const onToggle = (node, toggled) => {
        if (cursor) {
            cursor.active = false;
        }
        node.active = true;
        if (node.children) {
            node.toggled = toggled;
        }
        setCursor(node);
        setData(Object.assign({}, data))
        onSelectNode(node);
        
    }
    
    return{
        data,
        onToggle
    }
}

export default useHandleTree;