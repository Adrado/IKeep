import { useState, useEffect, useCallback, useContext } from 'react';
import Floor from '../../models/Floor';
import {Services} from '../../providers/Providers'


const useFloorViewModel = (id) =>
{
    const FloorsService = useContext(Services);

    const [values, setValues] = useState({
        Name : "",
        Ref : ""
    });

    const [selectedFloor, setSelectedFloor] = useState(new Floor());

    const handleOnChange = useCallback( event =>
    {
        const name = event.target.name
        const value = event.target.value
        setValues(values => ({...values, [name] : value}));
    })
    
    function GetFloor(id)
    {
        FloorsService.GetByIdAsync(id)
        .then((response) =>
        {
            OnGetFloor(response);
        })
    }

    function OnGetFloor(response)
    {
        let floor = new Floor(response.data);
        console.log(floor);

        setValues(values =>  ({ ...values, Ref : floor.Ref }))
        setValues(values =>  ({ ...values, Name : floor.Name }))

        setSelectedFloor(selectedFloor => ({ ...selectedFloor, Id : floor.Id }));
        setSelectedFloor(selectedFloor => ({ ...selectedFloor, Name : floor.Name }));
        setSelectedFloor(selectedFloor => ({ ...selectedFloor, Ref : floor.Ref }));

        //setSelectedFloor(floor);
    } 

    function AddNewFloor()
    {
        let floor = new Floor();
        floor.Ref = values.Ref;
        floor.Name = values.Name;
        
        FloorsService.AddAsync(floor)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveFloor()
    {
        setSelectedFloor(prevState =>
            ({...prevState, Ref : values.Ref},
             {...prevState, Name : values.Name}));

        FloorsService.UpdateAsync(selectedFloor)
            .then((response) => {
                console.log(response)
            })

        alert(selectedFloor.Name);
    }

    function DeleteFloor(id)
    {
        FloorsService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            })
    }

    const onAdd = useCallback( () => {AddNewFloor();}, []);

    const onSave = useCallback( () => {SaveFloor();}, []);

    const onDelete = useCallback( () => { DeleteFloor();}, []);

    useEffect(()=>{
        
        if(id !== null)
        {
            GetFloor(id);
        }

    },[])

    /* useEffect(() => {
        const interval = setInterval(() => {
          console.log(selectedFloor);
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

export default useFloorViewModel;