import { useContext, useEffect} from 'react';
import { ChoreService } from '../../providers/Providers';
//import Chore from '../../models/Chore';
import NewChoresRequest from '../../services/dtos/NewChoresRequest';


const useChoreViewModel = () =>
{
    const ChoresService = useContext(ChoreService);

    const SaveChore = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.ElementTypeId = values.ElementTypeId; 

        if(model !== undefined && model !== null)
        {
            return ChoresService.UpdateAsync(model);
        }
    }
      
    const AddNewChore = (year, installationId) =>
    {
        alert("Entra")
        let newChoresRequest = new NewChoresRequest();
        newChoresRequest.Year = year; //2019;
        newChoresRequest.InstallationId = installationId; //"d24ab749-87e9-43a9-9c7f-70d7021e5c83";
 
        if(newChoresRequest !== undefined && newChoresRequest!== null)
        {
            return ChoresService.AddAsync(newChoresRequest);
        }
    }
 
    const DeleteChore = (model) =>
    {
        if(model !== undefined && model!== null)
        {
            return ChoresService.DeleteAsync(model.Id);
        }
    }

    const GetReport = () =>
    {
        return ChoresService.GetCurretReport();
    }

    useEffect(() => {},[])

    return(
        [
            AddNewChore,
            SaveChore,
            DeleteChore,
            GetReport,
        ]
    )
}

export default useChoreViewModel;