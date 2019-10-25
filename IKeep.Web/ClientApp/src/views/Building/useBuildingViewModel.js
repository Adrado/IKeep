import { useState, useEffect, useCallback, useContext } from 'react';
import Building from '../../models/Building';
import {Services} from '../../providers/Providers'


const useBuildingViewModel = (model) =>
{
    const BuildingsService = useContext(Services);

    const [values, setValues] = useState({
        Name: "",
        Ref: ""
    });

    const [selectedBuilding, setSelectedBuilding] = useState(new Building());

    const handleOnChange = useCallback( event =>
    {
        const name = event.target.name
        const value = event.target.value
        setValues(values => ({...values, [name] : value}));
    })
    
    function GetBuilding(id)
    {
        BuildingsService.GetByIdAsync(id)
        .then((response) =>
        {
            OnGetBuilding(response);
        })
    }

    function OnGetBuilding(response)
    {
        let building = new Building(response.data);
        console.log(building);

        setValues(values =>  ({ ...values, Ref : building.Ref }))
        setValues(values =>  ({ ...values, Name : building.Name }))

        setSelectedBuilding(selectedBuilding => ({ ...selectedBuilding, Id : building.Id }));
        setSelectedBuilding(selectedBuilding => ({ ...selectedBuilding, Name : building.Name }));
        setSelectedBuilding(selectedBuilding => ({ ...selectedBuilding, Ref : building.Ref }));

        //setSelectedBuilding(building);
    } 

    function AddNewBuilding()
    {
        let building = new Building();
        building.Ref = values.Ref;
        building.Name = values.Name;
        building.InstallationId = model.ParentId;
        
        BuildingsService.AddAsync(building)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveBuilding()
    {
        setSelectedBuilding(prevState =>
            ({...prevState, Ref : values.Ref},
             {...prevState, Name : values.Name}));

        BuildingsService.UpdateAsync(selectedBuilding)
            .then((response) => {
                console.log(response)
            })

        alert(selectedBuilding.Name);
    }

    function DeleteBuilding(id)
    {
        BuildingsService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            })
    }

    const onAdd = useCallback( () => {AddNewBuilding();}, []);

    const onSave = useCallback( () => {SaveBuilding();}, []);

    const onDelete = useCallback( () => { DeleteBuilding();}, []);

    useEffect(()=>{
        
        if(model.Id !== null)
        {
            GetBuilding(model.Id);
        }

    },[model])

    /* useEffect(() => {
        const interval = setInterval(() => {
          console.log(selectedBuilding);
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

export default useBuildingViewModel;