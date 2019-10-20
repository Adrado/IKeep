import {useState, useContext, useCallback} from 'react';
//import CreateInstallationForm from './CreateInstallationForm';
import Installation from '../../models/Installation';
import {Services} from '../../providers/Providers';


const useInstallationViewModel = (callback) =>
{
    const [Form, setForm] = useState(
        {
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
        }
    )
    const [SelectedInstallation, setSelectedInstallation] = useState({})
    
    const InstallationsService = useContext(Services);
    
    const HandleInputChange = useCallback((event) =>
    {
        const name = event.target.name;
        const value = event.target.value;
        setForm(prevForm =>({ ...prevForm,[name] : value}));
    });

    /* function HandleInputChange(e)
    {
        setForm(Form => {Form[e.target.id] = e.target.value});
    } */
        
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

    return{
        AddNewInstallation,
        SaveInstallationChanges,
        DesactiveInstallation,
        HandleInputChange,
        Form
    };

    /* return(
        <CreateInstallationForm
            onClickAdd = {AddNewInstallation}
            onClickSave = {SaveInstallationChanges}
            onClickDelete = {DesactiveInstallation}
            onChange = {HandleInputChange}
            Form = {Form}
        />
        ) */

}
export default useInstallationViewModel;

/* 
class InstallationViewModel extends Component
{
    constructor(props, contextType)
    {
        super(props);
        this.state =
        {
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
        };

        this.SelectedInstallation = null;
        this.HandleInputChange = this.HandleInputChange.bind(this);
        //Funciones
        this.AddNewInstallation = this.AddNewInstallation.bind(this);
        this.SaveInstallationChanges = this.SaveInstallationChanges.bind(this);
        this.DesactiveInstallation = this.DesactiveInstallation.bind(this);
        //Servicios
         this.InstallationsService = InstallationService;
        this.BuildingsService = BuildingService;
        this.FloorsService = FloorService;
        this.AreasService = AreaService;
        alert("Gato");
    }
    
    
    HandleInputChange(e)
    {
        this.setState({[e.target.id] : e.target.value});
    }
        
    AddNewInstallation()
    {
        let installation = new Installation();
        installation.Ref = this.state.Ref;
        installation.Name = this.state.Name;
        installation.CIF = this.state.CIF;
        installation.CP = this.state.CP;
        installation.Address = this.state.Address;
        installation.City = this.state.City;
        installation.Phone = this.state.Phone;
        installation.Phone2 = this.state.Phone2;
        installation.Fax = this.state.Fax;
        installation.Email = this.state.Email;

        IntallationService.AddAsync(installation)
            .then((response) => { this.OnAddedInstallation(response); });

        this.CleanForm();
    }

    OnAddedInstallation(response)
    {
        let installation = new Installation (response.data);
        this.Installations.push(installation);
    }

    CleanForm()
    {
        this.setState({
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

    GetInstallation(id)
    {
        InstallationsService.GetByIdAsync(id)
        .then((response) =>
        {
            this.OnGetInstallation(response);
        })
    }

    OnGetInstallation(response)
    {
        let installation = new Installation(response.data)
        this.SelectedInstallation = installation;
        this.setState({
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

    SaveInstallationChanges()
    {
        this.SelectedInstallation.Name = this.state.Name;
        this.SelectedInstallation.Ref = this.state.Ref;
        this.SelectedInstallation.CIF = this.state.CIF;
        this.SelectedInstallation.CP = this.state.CP;
        this.SelectedInstallation.Address = this.state.Address;
        this.SelectedInstallation.City = this.state.City;
        this.SelectedInstallation.Phone = this.state.Phone;
        this.SelectedInstallation.Phone2 = this.sate.Phone2;
        this.SelectedInstallation.Fax = this.state.Fax;
        this.SelectedInstallation.Email = this.state.Email;

        this.InstallationsService.UpdateAsync(this.SelectedInstallation)
        .then((response) =>
        {
            this.OnUpdateInstallation(response);
        });
    }

    OnUpdateInstallation(response)
    {
        //Mandar info a installation manager
    }
    
    DesactiveInstallation()
    {
        this.InstallationsService.DeleteAsync(this.SelectedInstallation.Id)
        .then((response) =>
        {
            this.OnDesactiveInstallation(response);
        });
    }

    OnDesactiveInstallation(response)
    {
       // Mandar info a installation manager
    }

    render()
    {
        return(
                <CreateInstallationForm
                    onClickAdd = {this.AddNewInstallation}
                    onClickSave = {this.SaveChanges}
                    onClickDelete = {this.Delete}
                    onChange = {this.HandleInputChange}
                    State = {this.state}
                />
        )
    }
}
InstallationViewModel.contextType = InstallationSvc; */

