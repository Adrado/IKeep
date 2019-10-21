import {useState, useEffect, useContext, useCallback} from 'react';
import Installation from '../../models/Installation';
import {Services} from '../../providers/Providers';

const VALUE = 'value';
const ERROR = 'error';

function isObject(value) {
  return value !== null && typeof value === 'object';
}

function getPropValues(stateSchema, prop) {
  if (!isObject(stateSchema) || !prop) {
    throw new Error('Invalid Parameter passed.');
  }

  return Object.keys(stateSchema).reduce((accumulator, curr) => {
    accumulator[curr] = stateSchema[curr][prop];

    return accumulator;
  }, {});
}

function isRequiredField(value, isRequired) {
  if (!value && isRequired) return REQUIRED_FIELD_ERROR;
  return '';
}

const useInstallationViewModel = (stateSchema = {}, stateValidatorSchema = {}) =>
{
    const InstallationsService = useContext(Services);
    const [state, setStateSchema] = useState(stateSchema);

    const [values, setValues] = useState(getPropValues(state, VALUE));
    const [errors, setErrors] = useState(getPropValues(state, VALUE));
    
    //const [SelectedInstallation, setSelectedInstallation] = useState({})

    const [disable, setDisable] = useState(true);
    const [isDirty, setIsDirty] = useState(false);

    // Get a local copy of stateSchema
    useEffect(() => 
    {
        setStateSchema(stateSchema);
        setDisable(true);// Disable button in initial render.
    }, []);// eslint-disable-line

    // For every changed in our state this will be fired
    // To be able to disable the button
    useEffect(() => 
    {
        if (isDirty) {
        setDisable(validateState());
        }
    }, [state, isDirty]);

    // Used to disable submit button if there's an error in state
    // or the required field in state has no value.
    // Wrapped in useCallback to cached the function to avoid intensive memory leaked
    // in every re-render in component
    const validateErrorState = useCallback(
        () => Object.values(errors).some(error => error),
        [errors]
      );
    
    const HandleInputChange = useCallback((event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setForm(prevForm =>({ ...prevForm,[name] : value}));
    });

        
    function AddNewInstallation()
    {
        let installation = new Installation();
        installation.Ref = Form.Ref
        installation.Name = Form.Name;
        installation.CIF = Form.CIF;
        installation.CP = Form.CP;
        installation.Address = Form.Address;
        installation.City = Form.City;
        installation.Phone = Form.Phone;
        installation.Phone2 = Form.Phone2;
        installation.Fax = Form.Fax;
        installation.Email = Form.Email;

        
        InstallationsService.AddAsync(installation)
            .then((response) => { OnAddedInstallation(response); });


        CleanForm();
    }

    function OnAddedInstallation(response)
    {
        alert("Eureka!!");
        let installation = new Installation (response.data);
        //Mandar info a installation Manager
    }

    function CleanForm()
    {
        setForm({
            Ref : '',
            Name : '',
            CIF : '',
            CP : '',
            Address :'',
            City : '',
            Phone : '',
            Phone2 : '',
            Fax : '',
            Email : ''
          });
    }

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
        let installation = new Installation(response.data)
        setSelectedInstallation(installation)
        setForm({
            Name: installation.Name,
            Ref :installation.Ref,
            CIF : installation.CIF,
            CP : installation.CP,
            Address : installation.Address,
            City : installation.City,
            Phone : installation.Phone,
            Phone2 : installation.Phone2,
            Fax : installation.Fax,
            Email : installation.Email
          });
    }

    function SaveInstallationChanges()
    {
        SelectedInstallation.Name = Form.Name;
        SelectedInstallation.Ref = Form.Ref;
        SelectedInstallation.CIF = Form.CIF;
        SelectedInstallation.CP = Form.CP;
        SelectedInstallation.Address = Form.Address;
        SelectedInstallation.City = Form.City;
        SelectedInstallation.Phone = Form.Phone;
        SelectedInstallation.Phone2 = Form.Phone2;
        SelectedInstallation.Fax = Form.Fax;
        SelectedInstallation.Email = Form.Email;

        this.InstallationsService.UpdateAsync(this.SelectedInstallation)
        .then((response) =>
        {
            this.OnUpdateInstallation(response);
        });
    }

    function OnUpdateInstallation(response)
    {
        //Mandar info a installation manager
    }
    
    function DesactiveInstallation()
    {
        this.InstallationsService.DeleteAsync(this.SelectedInstallation.Id)
        .then((response) =>
        {
            this.OnDesactiveInstallation(response);
        });
    }

    function OnDesactiveInstallation(response)
    {
       // Mandar info a installation manager
    }

    return
    {
        AddNewInstallation,
        SaveInstallationChanges,
        DesactiveInstallation,
        HandleInputChange,
        Form
    };
}
export default useInstallationViewModel;