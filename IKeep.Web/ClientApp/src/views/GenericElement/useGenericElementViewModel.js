import { useContext, useEffect} from 'react';
import { GenericElementService } from '../../providers/Providers';
import GenericElement from '../../models/GenericElement';

const useGenericElementViewModel = () =>
{
    const GenericElementsService = useContext(GenericElementService);

    const SaveGenericElement = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined || model!== null)
        {
            return GenericElementsService.UpdateAsync(model);
        }
    }
      
    const AddNewGenericElement = (values) =>
    {
        let genericElement = new GenericElement();
        genericElement.Ref = values.Ref;
        genericElement.Name = values.Name;
        genericElement.ElementTypeId = values.ElementTypeId; 
 
        if(genericElement !== undefined || genericElement!== null)
        {
            return GenericElementsService.AddAsync(genericElement);
        }
    }
 
    const DeleteGenericElement = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return GenericElementsService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGenericElement,
            SaveGenericElement,
            DeleteGenericElement
        ]
    )
}

export default useGenericElementViewModel;