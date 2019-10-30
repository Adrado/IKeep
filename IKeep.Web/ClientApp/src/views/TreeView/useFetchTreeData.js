import { useState, useEffect, useContext } from 'react';
import {Services} from '../../providers/Providers';


const useFetchTreeData = (selectedNode) =>
{
    const [fetchedData, setFetchedData] = useState(null);
    const [error, setError] = useState(false);
    const TreeViewService = useContext(Services);
    const ParentId = selectedNode !== null ? selectedNode.ParentId : null;
    
    const ModifiedData = (data, parentId) =>
    {
        let installations = data.children;
        for(let i in installations)
        {
            let installation = installations[i];
            if(installation.id === parentId)
            {
                installation.toggled = true;
            }
            let Buildings = installation.children;

            for (let j in Buildings)
            {
                let Building = Buildings[j];

                if(Building.id === parentId)
                {
                    Building.toggled = true;
                    installation.toggled = true;
                }

                let Floors = Building.children;

                for(let k in Floors)
                {
                    let Floor = Floors[k];
                    if(Floor.id === parentId)
                    {
                        Floor.toggled = true;
                        Building.toggled = true;
                        installation.toggled = true;
                    }

                    let Areas = Floor.children
                    for(let m in Areas)
                    {
                        let Area = Areas[m];
                        delete Area.children;
                    }
                    let newArea =
                    {
                        id : null,
                        name: "Añadir Nuevo Espacio",
                        parentId: Floor.id,
                        type: "Area",
                        new : true
                    }
                    Areas.push(newArea);
                }

                let newFloor =
                {
                    id : null,
                    name: "Añadir Nueva Planta",
                    parentId: Building.id,
                    type: "Floor",
                    new : true
                }
                Floors.push(newFloor);
            } 
            
            let newBuilding = 
            {
                id : null,
                name: "Añadir Nuevo Edificio",
                parentId: installation.id,
                type: "Building",
                new : true
            }
            Buildings.push(newBuilding);
        }

        var newInstallation =
        {
            id: null,
            name: "Añadir Nueva Instalación",
            type: "Installation",
            new : true
        }

        installations.push(newInstallation);
        data.name = "Instalaciones";
        data.children = installations;
        data.toggled = true;
        return data;
    }

    useEffect(() =>
    {
        const GetTreeView = async () =>
        {
            try{
                const response = await TreeViewService.GetAllAsync(); 
                const data = response.data.rootNode;
                //console.log(data);
                const dataUpdated = ModifiedData(data, ParentId);
                console.log(dataUpdated)
                setFetchedData(dataUpdated);
                //alert("here we go");
            }
            catch (error){
                setError(true);
            } 
        }
        GetTreeView();

    },[]);

    return{
        fetchedData,
        error
    }
}
export default useFetchTreeData;