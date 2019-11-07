import { useState, useCallback, useEffect } from 'react';

const useForm = (modelState, model, AddNew, Save, Delete) =>
{

    const [values, setValues] = useState(modelState);
    
    const CleanForm = useCallback(() =>
    {
        setValues(modelState);
    }, [modelState]) 

    const handleOnChange = useCallback( event =>
    {
        let name = event.target.name;
        let value = event.target.value;

        setValues(prevState => ({ ...prevState, [name] : value}));
    }, [])
    
    const onAdd = useCallback(() => 
    {
       AddNew(model, values)
       CleanForm();
    }, [AddNew, values, model, CleanForm]) 

    const onSave = useCallback(() => 
    {
        Save(model, values);
    },[Save, model, values])

    const onDelete = useCallback(() => 
    {
       Delete(model);
       CleanForm();
    },[Delete, model, CleanForm])
     
    useEffect(() =>
    {
        setValues(prevState => ({...prevState, ...model}))
        /* setValues(prevState => ({ ...prevState, Ref : model.Ref}));
        setValues(prevState => ({ ...prevState, Name : model.Name}));  */

    },[model])

    return {
       values,
       handleOnChange,
       onAdd,
       onSave,
       onDelete
    };
}

export default useForm;