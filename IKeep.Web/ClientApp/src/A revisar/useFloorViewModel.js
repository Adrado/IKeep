import { useState, useEffect, useCallback, useContext } from 'react';
import Floor from '../../models/Floor';
import {Services} from '../../providers/Providers'


const useFloorViewModel = (id) =>
{
    let stateValidatorSchema = 
    {
        Ref : 
            {
                required: false,
                validator: 
                {
                    func: value => /^[A-Za-z0-9\s]+$/.test(value),
                    error: 'Invalid Ref format.',
                }
            },
        Name : 
            {
                required: true,
                validator: 
                {
                    func: value => /^[A-Za-z0-9\s]+$/.test(value),
                    error: 'Invalid Name format.',
                }
            }
    }

    const FloorsService = useContext(Services);
     
    /* if(id !== null)
    {
        GetFloor(id);
    } */

    
    

    let floorSchema = 
    {
        Ref: { value: 'Odioso', error: '' },
        Name: { value: 'Nya', error: '' },
    };


    const [stateSchema, setStateSchema] = useState(floorSchema);
    const [selectedFloor, setSelectedFloor] = useState({});

    

    
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
        let floor = new Floor(response.data)
        alert(floor.Name);
        setSelectedFloor(floor);
        setStateSchema(stateSchema => 
            ({ ...stateSchema.Ref, value : floor.Ref },
            {...stateSchema.Name, value : floor.Name}));
        console.log(selectedFloor);
    }

    function AddNewFloor(model)
    {
        let floor = new Floor();
        floor.Ref = model.Ref;
        floor.Name = model.Name;
        
        FloorsService.AddAsync(floor)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveFloor(model)
    {
        setSelectedFloor(prevState =>
            ({...prevState, Ref : model.Ref},
             {...prevState, Name : model.Name}));

        /*FloorsService.UpdateAsync(selectedFloor)
            .then((response) => {
                console.log(response)
            }) */

        alert(selectedFloor.Name);
    }

    function DeleteFloor(id)
    {
        FloorsService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            })
    }

    const onAdd = useCallback( e => {AddNewFloor(e);}, []);

    const onSave = useCallback( e => {SaveFloor(e);}, []);

    const onDelete = useCallback( e => { DeleteFloor(e);}, []);

    useEffect(()=>{
        
        if(id !== null)
        {
            FloorsService.GetByIdAsync(id)
            .then((response) =>
            {
                let floor = new Floor(response.data);
                setSelectedFloor(floor);
                setStateSchema(stateSchema => 
                    ({ ...stateSchema.Ref, value : floor.Ref },
                    {...stateSchema.Name, value : floor.Name}));
            })
        }
    },[])

    return {
       stateSchema,
       stateValidatorSchema,
       onAdd,
       onSave,
       onDelete,
    };
}

export default useFloorViewModel;