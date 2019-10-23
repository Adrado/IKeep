import { useState, useEffect, useCallback, useContext } from 'react';
import Installation from '../../models/Installation';
import {Services} from '../../providers/Providers'


const useInstallationViewModel = (id) =>
{
    const InstallationsService = useContext(Services);

    const [values, setValues] = useState({
        Id : "",
        Name : "",
        Ref : "",
        Ref : "",
        CIF : "",
        CP : "",
        Address : "",
        City : "",
        Phone : "",
        Phone2 : "",
        Fax : "",
        Email : ""
    });

    const [selected, setSelected] = useState(new Installation());

    const handleOnChange = useCallback( event =>
    {
        const name = event.target.name
        const value = event.target.value
        setValues(values => ({...values, [name] : value}));
    })
    
    function GetInstallation(id)
    {
        InstallationsService.GetByIdAsync(id)
        .then((response) =>
        {
            OnGetInstallation(response);
        })
    }

    function OnGetInstallation(response)
    {
        let installation = new Installation(response.data);
        console.log(response.data);

        
        setValues(values => (Object.assign(values, installation)));
        setSelected(selected => (Object.assign(selected, installation)));
        setValues(values => ({...values, Id : installation.Id}));
    } 

    function AddNewInstallation()
    {
        let installation = new Installation();
        installation.Ref = values.Ref;
        installation.Name = values.Name;
        
        InstallationsService.AddAsync(installation)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveInstallation()
    {
        setValues(values => ({...values, Ref : "Que sucede"}));
        setSelected(selected => (Object.assign(selected, values)));
        setSelected(selected => ({...selected, CIF : "1000"}));
        
        /* setSelected(prevState =>
            ({...prevState, Ref : values.Ref},
             {...prevState, Name : values.Name})); */


        InstallationsService.UpdateAsync(selected)
            .then((response) => {
                console.log(response)
            })

        alert(selected.Name);
    }

    function DeleteInstallation(id)
    {
        InstallationsService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            })
    }

    const onAdd = useCallback( () => {AddNewInstallation();}, []);

    const onSave = useCallback( () => {SaveInstallation();}, []);

    const onDelete = useCallback( () => { DeleteInstallation();}, []);

    useEffect(()=>{
        
        if(id !== null)
        {
            GetInstallation(id);
        }

    },[])

    useEffect(()=>{
        console.log("Hola");
        console.log(selected.Name);
    },[selected])

    /* useEffect(() => {
        const interval = setInterval(() => {
          console.log(selectedInstallation);
          console.log(values);
        }, 5000);
        return () => clearInterval(interval);
      }, []); */

    return {
       values,
       handleOnChange,
       onAdd,
       onSave,
       onDelete
    };
}

export default useInstallationViewModel;