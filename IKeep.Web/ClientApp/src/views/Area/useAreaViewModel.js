import { useState, useEffect, useCallback, useContext } from 'react';
import Area from '../../models/Area';
import {Services} from '../../providers/Providers'
//import { set } from 'date-fns';


const useAreaViewModel = (id) =>
{
    const AreasService = useContext(Services);

    const [values, setValues] = useState({
        Ref: "",
        Name: "",
    });

    const [selectedArea, setSelectedArea] = useState(new Area());

    const [ready, setReady] = useState(false);
    const [save, setSave] = useState(false)

    const handleOnChange = useCallback( event =>
    {
        let name = event.target.name;
        let value = event.target.value;

        setValues(prevState => ({ ...prevState, [name] : value}));
    })
    
    function AddNewArea()
    {
        let area = new Area();
        area.Ref = values.Ref;
        area.Name = values.Name;
        //area.FloorId = model.ParentId;
        
        AreasService.AddAsync(area)
            .then((response) => { 
                console.log(response); 
            });
    }

    function SaveArea()
    {
        setReady(true);
    }

    function DeleteArea()
    {
        alert(id + "eliminado")
        /* AreasService.DeleteAsync(id)
            .then((response) => {
            console.log(response)
            }) */
    }

    const onAdd = useCallback( () => {AddNewArea();}, []);

    const onSave = useCallback( () => {SaveArea();}, []);

    const onDelete = useCallback( () => { DeleteArea();}, []);


    useEffect(()=>
    {
        const GetArea = async (id) =>
        {
            try{
                const response = await AreasService.GetByIdAsync(id);
                let area = new Area(response.data);

                setSelectedArea(selectedArea => (Object.assign(selectedArea, area)));

                setValues(values => ({...values, Ref : area.Ref }));
                setValues(values => ({...values, Name : area.Name }));

                
                console.log(selectedArea);
                console.log(values);
            }
            catch (error){} 
        }
        
        if(id !== null)
        {
            GetArea(id);
        }
    },[])

    useEffect(() => 
    {
        console.log(values);
        if(ready === true)
        {
            setSelectedArea(prevState =>
            ({...prevState, Ref : values.Ref},
            {...prevState, Name : values.Name}));
            setSave(true);
        }
        
    });

    useEffect(() => 
    {
        if(ready !== false && save !== false)
        {
            alert(values.Name)
            AreasService.UpdateAsync(selectedArea)
                .then((response) => {
                    console.log(response)
                })
            alert("guardado" + selectedArea.Name + " " + selectedArea.Id);
        }
        setReady(false);
        setSave(false);

    }, [save])
   

    return {
       values,
       handleOnChange,
       onAdd,
       onSave,
       onDelete
    };
}

export default useAreaViewModel;