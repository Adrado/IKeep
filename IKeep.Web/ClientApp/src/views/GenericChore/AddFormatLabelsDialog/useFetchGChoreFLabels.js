import { useContext, useState, useEffect } from "react"
import { GChoreFLabelService } from "../../../providers/Providers"
import GenericChoreFormatLabel from "../../../models/GenericChoreFormatLabel";

const useGChoreFLabels = (gChoreId) =>
{
    const GChoreFLabelsService = useContext(GChoreFLabelService)
    const [GChoreFLabels, setGChoreFLabels] = useState(null);
    const [error, setError] = useState(false);
    const [change, setChange] = useState(false);

    const UpdateData = (data) =>
    {
        let gChoreFLabels = []; 
        for (let i in data)
        {
            let gChoreFLabel = new GenericChoreFormatLabel(data[i]);
            
            //if(genericElement.EntityStatus !== 0)  
            gChoreFLabels.push(gChoreFLabel);
        }
        data = gChoreFLabels;
        return data;
    }

    useEffect(() =>
    {
        let isSuscribed = true;
        const GetById = async () =>
        {
            try{
                const response = await GChoreFLabelsService.GetById(gChoreId);
                if (isSuscribed)
                {
                    console.log(response);
                    const dataUpdated = UpdateData(response.data)
                    console.log(dataUpdated)
                    setGChoreFLabels(dataUpdated);
                }
            }
            catch (error){
                setError(true)
            } 
        }
        if(gChoreId !== null && gChoreId !== undefined)
        {
            GetById();
        }

        return () => {
            isSuscribed = false;
        };


    },[gChoreId, GChoreFLabelsService, change]);

    return{
        GChoreFLabels,
        error,
        change,
        setChange
    }
}

export default useGChoreFLabels;