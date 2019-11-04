import { useContext, useEffect} from 'react';
import { Services } from '../../../providers/Providers';
import {Functions} from '../../../providers/Providers';

const useInstallationViewModel = () =>
{
    const InstallationsService = useContext(Services);
    const OnModified = useContext(Functions);
    const SaveInstallation = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.CIF = values.CIF;
        model.CP = values.CP;
        model.Address = values.Address;
        model.City = values.City;
        model.Phone = values.Phone;
        model.Phone2 = values.Phone2;
        model.Fax = values.Fax;
        model.Email = values.Email;
    
        if(model !== undefined || model!== null)
        {
            InstallationsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
            });
        }
    }
        
    const AddNewInstallation = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
        model.CIF = values.CIF;
        model.CP = values.CP;
        model.Address = values.Address;
        model.City = values.City;
        model.Phone = values.Phone;
        model.Phone2 = values.Phone2;
        model.Fax = values.Fax;
        model.Email = values.Email;
        
        if(model !== undefined || model!== null)
        {
            InstallationsService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                });
        }
    }
 
    const DeleteInstallation = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            InstallationsService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewInstallation,
            SaveInstallation,
            DeleteInstallation
        ]
    )
}

export default useInstallationViewModel;