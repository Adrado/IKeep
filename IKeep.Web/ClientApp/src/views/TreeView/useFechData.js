import { useState, useEffect, useContext } from 'react';
import {Services} from '../../providers/Providers'
const useFetchData = () =>
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
        }

        var newInstallation =
        {
            name: "Añadir Nueva Instalación",
            type: "Installation"
        }
        installations.push(newInstallation);
        return installations;
    }

    useEffect(() =>
    {
        const GetTreeView = async () =>
        {
            try{
                const response = await TreeViewService.GetAllAsync();
                console.log(response);  
                const data = response.data.rootNode;
                //const dataUpdate = ModifiedData(response.data.rootNode)
                setFetchedData(data);
                console.log(data);
                //console.log(fetchedData)
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
export default useFetchData;