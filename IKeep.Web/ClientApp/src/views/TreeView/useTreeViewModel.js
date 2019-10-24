import {useState} from 'react';

const useTreeViewModel = (treeData) =>
{
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
    }
    
    return{
        data,
        onToggle
    }
}

export default useTreeViewModel;