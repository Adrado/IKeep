import { useState, useCallback, useEffect } from 'react';

const useAreaForm = (model, AddNew, Save, Delete) =>
{

    const [values, setValues] = useState({
        Ref: model.Ref,
        Name: model.Name,
    });
    
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
    }, [AddNew, values, model]) 

    const onSave = useCallback(() => 
    {
        Save(model, values);
    },[Save, model, values])

    const onDelete = useCallback(() => 
    {
       Delete(model);
       CleanForm();
    },[Delete, model])
     
    const CleanForm = () =>
    {
        setValues(prevState => ({ ...prevState, Ref : ""}));
        setValues(prevState => ({ ...prevState, Name : ""}));
    } 

    useEffect(() =>
    {
        setValues(prevState => ({ ...prevState, Ref : model.Ref}));
        setValues(prevState => ({ ...prevState, Name : model.Name}));

    },[model])

    return {
       values,
       handleOnChange,
       onAdd,
       onSave,
       onDelete
    };
}

export default useAreaForm;