import { useContext, useEffect} from 'react';
import { GChoreFLabelService } from '../../../providers/Providers';
import GenericChoreFormatLabel from '../../../models/GenericChoreFormatLabel';

const useGChoreFLabelViewModel = () =>
{
    const GChoreFLabelsServices = useContext(GChoreFLabelService);

    const SaveGChoreFLabel = (model, values) =>
    {
        model.GenericChoreId = values.GenericChoreId;
        model.FormatLabelId = values.FormatLabelId; 

        if(model !== undefined || model!== null)
        {
            return GChoreFLabelsServices.UpdateAsync(model);
        }
    }
      
    const AddNewGChoreFLabel = (genericChoreId, formatLabel) =>
    {
        let model = new GenericChoreFormatLabel();


        model.GenericChoreId = genericChoreId;
        model.FormatLabelId = formatLabel.Id; 
        
        console.log(model);
 
        if(model !== undefined || model!== null)
        {
            return GChoreFLabelsServices.AddAsync(model);
        }
    }
 
    const DeleteGChoreFLabel = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            return GChoreFLabelsServices.DeleteAsync(model.Id);
        }
    }

    useEffect(() => {},[])

    return(
        [
            AddNewGChoreFLabel,
            SaveGChoreFLabel,
            DeleteGChoreFLabel
        ]
    )
}

export default useGChoreFLabelViewModel;