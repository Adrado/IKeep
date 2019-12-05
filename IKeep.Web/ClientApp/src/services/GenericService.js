import axios from 'axios';
class GenericService
{
    get Config()
    {
        var config =
        {
            headers:
            {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.Token
            }
        };
        return config;
    }

    get CreateCancelToken()
    {
        const CancelToken = this.CancelToken
        var c = new CancelToken(c=>{this.CancelFunction = c})
        return c
    }

    constructor(dtoName)
    {
        this.ApiUrl = "api/" + dtoName;
        //this.Token = $window.Token;
        this.CancelToken = axios.CancelToken;
        this.CancelFunction = this.CancelToken.source.cancel;
    }

    async Get()
    {
        return await axios.get(this.ApiUrl, {cancelToken: this.CreateCancelToken});
    }
    
    async GetById(id)
    {
        return await axios.get(this.ApiUrl + "/"+ id, {cancelToken: this.CreateCancelToken})
    }

    async Post(dto)
    {
        return await axios.post(this.ApiUrl, dto, {cancelToken: this.CreateCancelToken});
    }

    async Put(dto)
    {
        return await axios.put(this.ApiUrl, dto, {cancelToken: this.CreateCancelToken});
    }

    async Delete(id)
    {
        return await axios.delete(this.ApiUrl + "/" + id, {cancelToken: this.CreateCancelToken});
    }

    Cancel()
    {
        this.CancelFunction();
    }
}

export default GenericService;