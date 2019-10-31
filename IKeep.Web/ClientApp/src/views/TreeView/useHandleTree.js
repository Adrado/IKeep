import {useState, useContext, useEffect} from 'react';
import {Functions} from '../../providers/Providers'

const useHandleTree = (treeData) =>
{
    const onSelectNode = useContext(Functions);
    const [data, setData] = useState(treeData);

    const [cursor, setCursor] = useState(null);

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

    useEffect(() =>
    {
        //setData(treeData);
        console.log("Esto llega a HandleTree")
        console.log(treeData);
    },[treeData])
    
    return{
        data,
        onToggle
    }
}

export default useHandleTree;