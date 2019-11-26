import { useContext, useEffect} from 'react';
import { ElementService } from '../../providers/Providers';
import Element from '../../models/Element';

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
      
    const AddNewElement = (values) =>
    {
        let element = new Element();
        element.Ref = values.Ref;
        element.Name = values.Name;
        element.ElementTypeId = values.ElementTypeId; 
 
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