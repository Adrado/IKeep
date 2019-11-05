import { useContext, useEffect} from 'react';
import { Services } from '../../providers/Providers';
//import {Functions} from '../../providers/Providers';
import ElementType from '../../models/ElementType';

const useElementTypeViewModel = () =>
{
    const ElementTypesService = useContext(Services);
    //const OnModified = useContext(Functions);
    const SaveElementType = (event, rowData) =>
    {
        console.log(event)
        console.log(rowData)

        /* model.Ref = values.Ref;
        model.Name = values.Name;
        
        if(model !== undefined || model!== null)
        {
            ElementTypesService.UpdateAsync(model)
            .then((response) => {
                //OnModified();
            });
        } */
    }
        
    const AddNewElementType = (values) =>
    {
        console.log(values)
        let elementType = new ElementType()
        elementType.Ref = values.Ref;
        elementType.Name = values.Name;
        ElementTypesService.AddAsync(elementType)
            .then((response) => { 
                    //OnModified();
            });

    }
 
    const DeleteElementType = (model) =>
    {
        if(model !== undefined || model!== null)
        {
            ElementTypesService.DeleteAsync(model.Id)
                .then((response) => {
                   // OnModified();
                })
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