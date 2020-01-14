import GenericService from "./GenericService";
import LoginRequest from "./dtos/LoginRequest";

class LoginService extends GenericService
{    
    constructor($http, $window)
    {
        super($http, $window, 'login');
    }

    LoginAsync(LoginName, password)
    {
        var request = new LoginRequest(LoginName, password);
        return this.PostAsync(request);
    }
}

export default LoginService;