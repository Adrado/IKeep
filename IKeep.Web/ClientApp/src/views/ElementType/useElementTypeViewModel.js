import { useContext, useEffect} from 'react';
import { ElementTypeService } from '../../providers/Providers';
import ElementType from '../../models/ElementType';

const useElementTypeViewModel = () =>
{
    const ElementTypesService = useContext(ElementTypeService);

    const SaveElementType = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined || model!== null)
        {
            return ElementTypesService.UpdateAsync(model);
        }
    }
      
    const AddNewElementType = (values) =>
    {
        let elementType = new ElementType();
        elementType.Ref = values.Ref;
        elementType.Name = values.Name;
        elementType.ElementTypeId = values.ElementTypeId; 
 
        if(elementType !== undefined || elementType!== null)
        {
            return ElementTypesService.AddAsync(elementType);
        }
    }
 
    const DeleteElementType = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return ElementTypesService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewElementType,
            SaveElementType,
            DeleteElementType
        ]
    )
}

export default useElementTypeViewModel;