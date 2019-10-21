import { useState, useEffect, useCallback, useContext } from 'react';
import Floor from '../../models/Floor';
import {Services} from '../../providers/Providers'

const stateValidatorSchema = 
{
    Ref : 
        {
            required: true,
            validator: 
            {
                //func: value => /^[A-Za-z0-9\s]+$/.test(value),
                func: true,
                error: 'Invalid Ref format.',
            }
        },
    Name : 
        {
            required: true,
            validator: 
            {
                func: true,
                error: 'Invalid Name format.',
            }
        }
}

const useFloorViewModel = (id) =>
{
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

    return
    {
        stateSchema
    };
}

export default useFloorViewModel;