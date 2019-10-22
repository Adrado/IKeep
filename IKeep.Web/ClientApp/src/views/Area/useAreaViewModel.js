import { useState, useEffect, useCallback, useContext } from 'react';
import Area from '../../models/Area';
import {Services} from '../../providers/Providers'


const useAreaViewModel = (id) =>
{
    const AreasService = useContext(Services);

    const [stateSchema, setStateSchema] = useState(areaSchema);
    const [selectedArea, setSelectedArea] = useState({});

    
    function GetArea(id)
    {
        AreasService.GetByIdAsync(id)
        .then((response) =>
        {
            OnGetArea(response);
        })
    }

    function OnGetArea(response)
    {
        let area = new Area(response.data)
        alert(area.Name);
        setSelectedArea(area);
        setStateSchema(stateSchema => 
            ({ ...stateSchema.Ref, value : area.Ref },
            {...stateSchema.Name, value : area.Name}));
        console.log(selectedArea);
    }

    function AddNewArea(model)
    {
        let area = new Area();
        area.Ref = model.Ref;
        area.Name = model.Name;
        
        AreasService.AddAsync(area)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveArea(model)
    {
        setSelectedArea(prevState =>
            ({...prevState, Ref : model.Ref},
             {...prevState, Name : model.Name}));

        /*AreasService.UpdateAsync(selectedArea)
            .then((response) => {
                console.log(response)
            }) */

        alert(selectedArea.Name);
    }

    function DeleteArea(id)
    {
        AreasService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            })
    }

    const onAdd = useCallback( e => {AddNewArea(e);}, []);

    const onSave = useCallback( e => {SaveArea(e);}, []);

    const onDelete = useCallback( e => { DeleteArea(e);}, []);

    useEffect(()=>{
        
        if(id !== null)
        {
            AreasService.GetByIdAsync(id)
            .then((response) =>
            {
                let area = new Area(response.data);
                setSelectedArea(area);
                setStateSchema(stateSchema => 
                    ({ ...stateSchema.Ref, value : area.Ref },
                    {...stateSchema.Name, value : area.Name}));
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

export default useAreaViewModel;