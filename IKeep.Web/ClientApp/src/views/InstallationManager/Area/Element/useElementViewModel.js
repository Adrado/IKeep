import { useContext, useEffect} from 'react';
import { ElementService } from '../../../../providers/Providers';
import Element from '../../../../models/Element';

const useElementViewModel = () =>
{
    const ElementsService = useContext(ElementService);

    const AddNewElement =  (areaId, genericElement) =>
    {
        let element = new Element();
        element.AreaId = areaId;
        element.GenericElementId = genericElement.Id;
        //element.ElementGenericChoresIds = genericElement.GenericElementGenericChoresIds;
        console.log(element);
 
        if(element !== undefined && element!== null)
        {
            return ElementsService.AddAsync(element);
        }
    }

    const SaveElement = (element, values) =>
    {
        element.Status = values.Status;
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