import { useContext, useEffect} from 'react';
import { ElementGChoreService } from '../../../../providers/Providers';
import ElementGenericChore from '../../../../models/ElementGenericChore';

const useElementGChoreViewModel = () =>
{
    const ElementGChoresService = useContext(ElementGChoreService);

    const SaveElementGChore = (elementGChore, values) =>
    {
        elementGChore.Ref = values.Ref;
        //elementGChore.ElementGChoreTypeId = values.ElementGChoreTypeId;
        elementGChore.Ref = values.Ref;
        elementGChore.Brand = values.Brand;
        elementGChore.Model = values.Model;
        elementGChore.Description = values.Description;
        elementGChore.SafetyAndHealth = values.SafetyAndHealth;

        if(elementGChore !== undefined && elementGChore !== null)
        {
            return ElementGChoresService.UpdateAsync(elementGChore);
        }
    }
      
    const AddNewElementGChore =  (elementId, GElementGChore) =>
    {
        let elementGChore = new ElementGenericChore();
        elementGChore.ElementId = elementId;
        elementGChore.GenericChoreId = GElementGChore.GenericChoreId;
        elementGChore.Status = GElementGChore.Status;

        console.log(elementGChore);
 
        if(elementGChore !== undefined && elementGChore!== null)
        {
            return ElementGChoresService.AddAsync(elementGChore);
        }
    }
 
    const DeleteElementGChore = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return ElementGChoresService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewElementGChore,
            SaveElementGChore,
            DeleteElementGChore
        ]
    )
}

export default useElementGChoreViewModel;