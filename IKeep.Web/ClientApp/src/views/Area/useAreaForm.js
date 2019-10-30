import { useState, useCallback, useEffect } from 'react';
//import {Services} from '../../providers/Providers'
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
    

    const onAdd = useCallback( () => {
        AddNew(values);
        CleanForm();
    }, [values]);

    const onSave = useCallback( () => {
        Save(values);
    }, [values]);

    const onDelete = useCallback( () => {
        Delete();
        CleanForm();
    }, [values]);

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