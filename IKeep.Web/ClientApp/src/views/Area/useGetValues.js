/* import { useState, useEffect, useCallback, useContext } from 'react';
import Area from '../../models/Area';
import {Services} from '../../providers/Providers'

const useGetValues = (id) =>
{
    const AreasServices = useContext(Services);
    const[model, setModel ] = useState(GetArea)

    const GetArea = async (id) =>
    {
        try{
            const response = await AreasServices.GetByIdAsync(id);
            let area = new Area(response.data);
            return area;
        }
        catch (error){} 
        // const response = await AreasService.GetByIdAsync(id)
    }

    useEffect(()=>
    {
        const GetArea = async (id) =>
        {
            try{
                const response = await AreasService.GetByIdAsync(id);
                let area = new Area(response.data);
                setModel(model => (Object.assign(model, area)));
                console.log(model);
            }
            catch (error){} 
           // const response = await AreasService.GetByIdAsync(id)
        }
    },[])
    return{
        model
    }
}
export default useGetValues */