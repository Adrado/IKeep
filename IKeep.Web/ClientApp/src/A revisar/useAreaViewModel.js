import { useState, useEffect, useCallback, useContext } from 'react';
import Area from '../../models/Area';
import {Services} from '../../providers/Providers'


const useAreaViewModel = (id) =>
{
    const AreasService = useContext(Services);

    const [values, setValues] = useState({
        Name: "",
        Ref: ""
    });

    const [selectedArea, setSelectedArea] = useState(new Area());

    const handleOnChange = useCallback( event =>
    {
        const name = event.target.name
        const value = event.target.values
        setValues(values => ({...values, [name] : value}));
    })
    
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
        let area = new Area(response.data);
        console.log(area);

        setValues(values =>  ({ ...values, Ref : area.Ref }))
        setValues(values =>  ({ ...values, Name : area.Name }))

        setSelectedArea(selectedArea => ({ ...selectedArea, Id : area.Id }));
        setSelectedArea(selectedArea => ({ ...selectedArea, Name : area.Name }));
        setSelectedArea(selectedArea => ({ ...selectedArea, Ref : area.Ref }));

        //setSelectedArea(area);
    } 

    function AddNewArea()
    {
        let area = new Area();
        area.Ref = values.Ref;
        area.Name = values.Name;
        
        AreasService.AddAsync(area)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveArea()
    {
        setSelectedArea(prevState =>
            ({...prevState, Ref : values.Ref},
             {...prevState, Name : values.Name}));

        AreasService.UpdateAsync(selectedArea)
            .then((response) => {
                console.log(response)
            })

        alert(selectedArea.Name);
    }

    function DeleteArea(id)
    {
        AreasService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            })
    }

    const onAdd = useCallback( () => {AddNewArea();}, []);

    const onSave = useCallback( () => {SaveArea();}, []);

    const onDelete = useCallback( () => { DeleteArea();}, []);

    useEffect(()=>{
        
        if(id !== null)
        {
            GetArea(id);
        }

    },[])

    /* useEffect(() => {
        const interval = setInterval(() => {
          console.log(selectedArea);
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

export default useAreaViewModel;