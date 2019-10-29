import { useState, useCallback, useContext, useEffect } from 'react';
import {Services} from '../../providers/Providers'
import {Functions} from '../../providers/Providers'


const useAreaForm = (model) =>
{

    const AreasService = useContext(Services);
    const OnModified = useContext(Functions);

    const [values, setValues] = useState({
        Ref: model.Ref,
        Name: model.Name,
    });

    const [save, setSave] = useState(false);
    const [add, setAdd] = useState(false);
    const [erase, setErase] = useState(false);

    const handleOnChange = useCallback( event =>
    {
        let name = event.target.name;
        let value = event.target.value;

        setValues(prevState => ({ ...prevState, [name] : value}));
    }, [])
    

    const onAdd = useCallback( () => {setAdd(true);}, []);

    const onSave = useCallback( () => {setSave(true);}, []);

    const onDelete = useCallback( () => {setErase(true);}, []);

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

    useEffect(() =>
    {
        const SaveArea = async () =>
        {
            model.Ref = values.Ref;
            model.Name = values.Name;

            AreasService.UpdateAsync(model)
                    .then((response) => {
                        console.log(response)
                    })
            
            OnModified(model.Id);
        }
        if(save === true)
        {
            SaveArea();
            setSave(false);
        }
    },[save])

    useEffect(() =>
    {
        const AddNewArea = async () =>
        {
            model.Ref = values.Ref;
            model.Name = values.Name;
            
            AreasService.AddAsync(model)
                .then((response) => { 
                    console.log(response); 
                });

            OnModified(model.Ref);
            CleanForm();
            //alert(model.Ref)
            //alert(model.Id)
        }
        if(add === true)
        {
            AddNewArea();
            setAdd(false);
        }
    },[add])

    useEffect(() =>
    {
        const DeleteArea = async () =>
        {
            alert(model.Id);
            AreasService.DeleteAsync(model.Id)
                .then((response) => {
                console.log(response)
                })
            OnModified(model.Id);
            CleanForm();
        }

        if(erase === true)
        {
            DeleteArea();
            setErase(false);
        }
    }, [erase])

    return {
       values,
       handleOnChange,
       onAdd,
       onSave,
       onDelete
    };
}

export default useAreaForm;