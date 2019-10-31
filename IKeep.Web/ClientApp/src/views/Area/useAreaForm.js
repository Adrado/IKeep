import { useState, useCallback, useEffect } from 'react';
//import {Functions} from '../../providers/Providers'

const useAreaForm = (model, AddNew, Save, Delete) =>
{
   // const OnModified = useContext(Functions);
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
    
    const onAdd = useCallback((value) => 
    {
       alert("Llaman en useAreaForm" + value.Ref)
       AddNew(model, values);
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
        alert("Llaman al Clean")
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