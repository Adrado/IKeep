import {useState, useContext, useEffect} from 'react';
import {Services} from '../../providers/Providers'

const ejemplo = {
    name: 'root',
    toggled: true,
    children: [
        {
            name: 'parent',
            children: [
                { name: 'child1' },
                { name: 'child2' }
            ]
        },
        {
            name: 'loading parent',
            loading: true,
            children: []
        },
        {
            name: 'parent',
            children: [
                {
                    name: 'nested parent',
                    children: [
                        { name: 'nested child 1' },
                        { name: 'nested child 2' }
                    ]
                }
            ]
        }
    ]
};

const asd =()=>
{
    return ejemplo;
}
const useTreeViewModel = () =>
{
    const TreeViewService = useContext(Services);

    const [data, setData] = useState({});

    const [cursor, setCursor] = useState(null);
    
    const [info, setInfo] = useState(false);

    const [paramTreeBeard, SetParamTreeBeard] = useState(
        {
            node: null,
            toggled: null
        }
    );


    const [node, setNode] = useState(null)
       
    const ModifiedData = (data) =>
    {
        let installations = data.children;
        for(let i in installations)
        {
            let installation = installations[i];
            let Buildings = installation.children
            for (let k in Buildings)
            {
                let Building = Buildings[k];
                let Floors = Building.children;
                for(let j in Floors)
                {
                    let Floor = Floors[j];
                    let Areas = Floor.children
                    let newArea =
                    {
                        name: "Añadir Nuevo Espacio",
                        id: Floor,
                        type: "Area"
                    }
                    Areas.push(newArea)
                }
                let newFloor =
                {
                    name: "Añadir Nueva Planta",
                    id: Building.id,
                    type: "Floor"
                }
                Floors.push(newFloor)
            } 
            let newBuilding = 
            {
                name: "Añadir Nuevo Edificio",
                id: installation.id,
                type: "Building"
            }
            Buildings.push(newBuilding);
            console.log();
        }

        var newInstallation =
        {
            name: "Añadir Nueva Instalación",
            type: "Installation"
        }
        installations.push(newInstallation);
        return installations;
    }

    const AddNew = () =>
    {
        alert("Se ha llamado a un callback");
    }

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


   /*  const onToggle = (node, toggled) =>
    {
        SetParamTreeBeard({node: node, toggled: toggled})
    } */
    
    /* useEffect(() =>
    {
        if (cursor) {
            cursor.active = false;
        }
        paramTreeBeard.node.active = true;
        if (paramTreeBeard.node.children) {
            paramTreeBeard.node.toggled = paramTreeBeard.toggled;
        }
        setCursor(node);
        console.log("Ahora")
        setData(Object.assign({}, data))
    },[paramTreeBeard]) */

  

    useEffect(() =>
    {
        alert("el click funciona");

        const GetTreeView = async () =>
        {
            /* try{
                const response = await TreeViewService.GetAllAsync();
                setData(response.data.rootNode);
                //Necesitamos actualizar aqui
                const dataUpdate = ModifiedData(response.data.rootNode)
                setData(dataUpdate);
            }
            catch (error){}  */
            try{
            const response = await window.setTimeout(asd(), 1000)
            setData(response);
            }
            catch (error){}
        }

        if(info === false)
        {
            GetTreeView();
            setInfo(true);
        }

    }, [info]);
    
    return{
        data,
        onToggle
    }
}

export default useTreeViewModel;