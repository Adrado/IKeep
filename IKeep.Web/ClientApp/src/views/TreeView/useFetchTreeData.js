import { useState, useEffect, useContext } from 'react';
import {Services} from '../../providers/Providers';


const useFetchTreeData = () =>
{
    const [fetchedData, setFetchedData] = useState(null)
    const [error, setError] = useState(false)
    const TreeViewService = useContext(Services);
    

    const ModifiedData = (data) =>
    {
        let installations = data.children;
        for(let i in installations)
        {
            let installation = installations[i];
            let Buildings = installation.children
            for (let j in Buildings)
            {
                let Building = Buildings[j];
                let Floors = Building.children;
                for(let k in Floors)
                {
                    let Floor = Floors[k];
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
                    Areas.push(newArea)
                }
                let newFloor =
                {
                    id : null,
                    name: "Añadir Nueva Planta",
                    parentId: Building.id,
                    type: "Floor",
                    new : true
                }
                Floors.push(newFloor)
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
        return data;
    }

    useEffect(() =>
    {
        const GetTreeView = async () =>
        {
            try{
                const response = await TreeViewService.GetAllAsync(); 
                const data = response.data.rootNode;
                const dataUpdated = ModifiedData(data);
                setFetchedData(dataUpdated);
                console.log(response);
                console.log(dataUpdated)
            }
            catch (error){
                setError(true)
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