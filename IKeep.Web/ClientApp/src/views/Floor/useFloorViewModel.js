import { useState, useEffect, useCallback, useContext } from 'react';
import Floor from '../../models/Floor';
import {Services} from '../../providers/Providers'


const useFloorViewModel = (id) =>
{
    const stateValidatorSchema = 
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
     
    if(id === null)
    {
        GetFloor(id);
    }

    const floorSchema = 
    {
        Ref: { value: '', error: '' },
        Name: { value: '', error: '' },
    };

    const [stateSchema, setStateSchema] = useState(floorSchema);
    const [selectedFloor, setSelectedFloor] = useState(null);
    
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
        setSelectedFloor(floor)
        setStateSchema(prevState => 
            ({ ...prevState.Ref, value : floor.Ref },
            {...prevState.Name, value : floor.Name}));
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

        FloorsService.UpdateAsync(selectedFloor)
            .then((response) => {
                console.log(response)
            })
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

    return {
        stateSchema,
        stateValidatorSchema,
        onAdd,
        onSave,
        onDelete,
    };
}

export default useFloorViewModel;