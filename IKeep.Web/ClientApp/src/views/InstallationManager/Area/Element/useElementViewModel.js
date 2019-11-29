import { useContext, useEffect} from 'react';
import { ElementService } from '../../../../providers/Providers';
import Element from '../../../../models/Element';

const useElementViewModel = () =>
{
    const ElementsService = useContext(ElementService);

    const SaveElement = (element, values) =>
    {
        element.Ref = values.Ref;
        //element.ElementTypeId = values.ElementTypeId;
        element.Ref = values.Ref;
        element.Brand = values.Brand;
        element.Model = values.Model;
        element.Description = values.Description;
        element.SafetyAndHealth = values.SafetyAndHealth;

        if(element !== undefined && element !== null)
        {
            return ElementsService.UpdateAsync(element);
        }
    }
      
    const AddNewElement =  (areaId, genericElement) =>
    {
        let element = new Element();
        element.AreaId = areaId;
        element.GenericElementId = genericElement.Id;
        //element.ElementGenericTasksIds = genericElement.GenericElementGenericTasksIds;
        console.log(element);
 
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