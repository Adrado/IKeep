import React, { useState, useCallback, useEffect } from 'react';
import {MenuItem} from '@material-ui/core'; 

const useForm = (modelState, model, AddNew, Save, Delete, selectorData, selectedId) =>
{

    const [values, setValues] = useState(modelState);

    const[selectData, setSelectData] = useState(selectorData);
    const[selected, setSelected]= useState(selectedId);
    const[name, setName]= useState("");

    const handleSelectorChange = (event) => {
        setName(event.target.name);
        setSelected(event.target.value);
        //this.setState({ selected: event.target.value, name: event.target.name});
      };

    const renderOptions = () => {
        return selectData.map((dt, i) => {
         //console.log(dt);
          return (
              <MenuItem
                label="Seleccione un Tipo"
                value={dt.Id}
               key={i} name={dt.Name}>{dt.Name}</MenuItem>
          );
        });
    }
    
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
       AddNew(model, values, selected);
       CleanForm();
    }, [AddNew, values, model, CleanForm, selected]) 

    const onSave = useCallback(() => 
    {
        Save(model, values, selected);
    },[Save, model, values, selected])

    const onDelete = useCallback(() => 
    {
       Delete(model);
       CleanForm();
    },[Delete, model, CleanForm])
     
    useEffect(() =>
    {
        setValues(prevState => ({...prevState, ...model}));
        setSelected(selectedId);
        /* setValues(prevState => ({ ...prevState, Ref : model.Ref}));
        setValues(prevState => ({ ...prevState, Name : model.Name}));  */

    },[model, selectedId])

    return {
       values,
       handleOnChange,
       onAdd,
       onSave,
       onDelete,
       handleSelectorChange,
       renderOptions,
       selected
    };
}

export default useForm;