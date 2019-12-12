import { useContext, useState, useEffect } from "react"
import { GElementGChoreService } from "../../../providers/Providers"
import GenericElementGenericChore from "../../../models/GenericElementGenericChore";

const useGElementGChores = (gElementId, update) =>
{
    const GElementGChoresService = useContext(GElementGChoreService)
    const [GElementGChores, setGElementGChores] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let gElementGChores = []; 
        for (let i in data)
        {
            let gElementGChore = new GenericElementGenericChore(data[i]);
            
            //if(genericElement.EntityStatus !== 0)  
            gElementGChores.push(gElementGChore);
        }
        data = gElementGChores;
        return data;
    }

    useEffect(() =>
    {
        const GetById = async () =>
        {
            try{
                const response = await GElementGChoresService.GetById(gElementId);
                console.log(response);
                const dataUpdated = UpdateData(response.data)
                setGElementGChores(dataUpdated);
            }
            catch (error){
                setError(true)
            } 
        }
        if(gElementId !== null && gElementId !== undefined)
        {
            GetById();
        }

    },[gElementId, GElementGChoresService, change, update]);

    return{
        GElementGChores,
        error,
        change,
        setChange
    }
}

export default useGElementGChores;