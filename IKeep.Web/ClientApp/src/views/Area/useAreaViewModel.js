import { useState, useEffect, useCallback, useContext } from 'react';
import Area from '../../models/Area';
import {Services} from '../../providers/Providers'


const useAreaViewModel = (id) =>
{
    const AreasService = useContext(Services);

    const [values, setValues] = useState({
        Ref: "",
        Name: "",
    });

    const [selectedArea, setSelectedArea] = useState(new Area());

    const handleOnChange = useCallback( event =>
    {
        const name = event.target.name
        const value = event.target.values
        setValues(values => ({...values, [name] : value}));
    })
    
   

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
        /* setSelectedArea(prevState =>
            ({...prevState, Ref : values.Ref},
             {...prevState, Name : values.Name}));

        AreasService.UpdateAsync(selectedArea)
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

    const onAdd = useCallback( () => {AddNewArea();}, []);

    const onSave = useCallback( () => {SaveArea();}, []);

    const onDelete = useCallback( () => { DeleteArea();}, []);

    useEffect(()=>{
        const GetArea = async (id) =>
        {
            try{
                const response = await AreasService.GetByIdAsync(id);
                let area = new Area(response.data);
                for (const prop in values)
                {
                    setValues(values => ({...values, [prop] : "area.prop" }));
                }
                setSelectedArea(selectedArea => (Object.assign(selectedArea, area)));
                console.log(selectedArea);
                console.log(values);
            }
            catch (error){} 
           // const response = await AreasService.GetByIdAsync(id)
        }
    
        /* function OnGetArea(response)
        {
            setSelectedArea(values => ({ ...values, Name : area.Name }));
            setSelectedArea(selectedArea => ({ ...selectedArea, Name : area.Name }));
            setSelectedArea(selectedArea => ({ ...selectedArea, Ref : area.Ref })); 
            setSelectedArea(area);
        }  */

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