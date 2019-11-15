import { useContext, useEffect} from 'react';
import { FormatService } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';

const useFormatViewModel = (OnModified, Select) =>
{
    const FormatsService = useContext(FormatService);
    //const OnModified = useContext(Functions);
    const SaveFormat = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;

        
        if(model !== undefined || model!== null)
        {
            FormatsService.UpdateAsync(model)
            .then((response) => {
                OnModified();
                Select();
            });
        }
    }
        
    const AddNewFormat = (model, values) =>
    {
        model.Ref = values.Ref;
        model.Name = values.Name;
 
        if(model !== undefined || model!== null)
        {
            FormatsService.AddAsync(model)
                .then((response) => { 
                    OnModified();
                    Select();
                });
        }
    }
 
    const DeleteFormat = (model) =>
    {
        //confirm("¿Estás seguro de eliminar este elemento?" + model.EntityType);
        if(model !== undefined || model!== null)
        {
            FormatsService.DeleteAsync(model.Id)
                .then((response) => {
                    OnModified();
                    Select();
                })
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewFormat,
            SaveFormat,
            DeleteFormat
        ]
    )
}

export default useFormatViewModel;