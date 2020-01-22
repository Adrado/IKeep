import { useContext, useEffect} from 'react';
import { ChoreTypeService } from '../../providers/Providers';
import ChoreType from '../../models/ChoreType';

const useChoreTypeViewModel = () =>
{
    const ChoreTypesService = useContext(ChoreTypeService);

    const SaveChoreType = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined || model!== null)
        {
            return ChoreTypesService.UpdateAsync(model);
        }
    }
      
    const AddNewChoreType = (values) =>
    {
        let choreTypes = new ChoreType();
        choreTypes.Ref = values.Ref;
        choreTypes.Name = values.Name;
        choreTypes.ElementTypeId = values.ElementTypeId; 
 
        if(choreTypes !== undefined || choreTypes!== null)
        {
            return ChoreTypesService.AddAsync(choreTypes);
        }
    }
 
    const DeleteChoreType = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return ChoreTypesService.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewChoreType,
            SaveChoreType,
            DeleteChoreType
        ]
    )
}

export default useChoreTypeViewModel;