import { useContext, useEffect} from 'react';
import { ElementService } from '../../../../providers/Providers';
import Element from '../../../../models/Element';

const useElementViewModel = () =>
{
    const ElementsService = useContext(ElementService);

    const SaveElement = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined && model !== null)
        {
            return ElementsService.UpdateAsync(model);
        }
    }
      
    const AddNewElement = (values, areaId, genericElement) =>
    {
        let element = new Element();
        element.AreaId = areaId;
        element.GenericElementId = genericElement.Id;
        element.Ref = values.Ref;
        element.Brand = values.Brand;
        element.Model = values.Model;
        element.Description = values.Description;
        element.SafetyAndHealth = values.SafetyAndHealth;
        element.ElementGenericTasksIds = genericElement.GenericElementGenericTasksIds; 
 
        if(element !== undefined && element!== null)
        {
            return ElementsService.AddAsync(element);
        }
    }
 
    const DeleteElement = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return ElementsService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewElement,
            SaveElement,
            DeleteElement
        ]
    )
}

export default useElementViewModel;