import { useContext, useEffect} from 'react';
import { GElementGChoreService } from '../../../providers/Providers';
import GenericElementGenericChore from '../../../models/GenericElementGenericChore'
//import {Functions} from '../../providers/Providers';

const useGElementGChoreViewModel = () =>
{
    const GElementGChoresService = useContext(GElementGChoreService);

    const SaveGElementGChore = (model, values) =>
    {
        model.Status = values.Status;

        if(model !== undefined || model!== null)
        {
           return GElementGChoresService.UpdateAsync(model)
            /* .then((response) => {
                OnModified();
                Select();
            }); */
        }
    }
        
    const AddNewGElementGChores = (genericElementId, model) =>
    {
        const GElementGChore = new GenericElementGenericChore()

        GElementGChore.GenericElementId = genericElementId;
        GElementGChore.GenericChoreId = model.Id;
        GElementGChore.Status = 1;

        if(GElementGChore.GenericElementId !== null || GElementGChore.GenericElementId !== undefined && 
            GElementGChore.GenericChoreId !== null || GElementGChore.GenericChoreId !== undefined)
        {
            return GElementGChoresService.AddAsync(GElementGChore)
        }
    }
 
    const DeleteGElementGChore = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            return GElementGChoresService.DeleteAsync(model.Id)
                /* .then((response) => {
                    OnModified();
                    Select();
                }) */
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGElementGChores,
            SaveGElementGChore,
            DeleteGElementGChore
        ]
    )
}

export default useGElementGChoreViewModel;