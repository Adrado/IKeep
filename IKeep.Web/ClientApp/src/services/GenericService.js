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

    constructor(dtoName)
    {
        this.ApiUrl = "api/" + dtoName;
        //this.Token = $window.Token;
        this.CancelToken = axios.CancelToken;
        this.source = this.CancelToken.source();
    }

    async Get()
    {
        return await axios.get(this.ApiUrl, {cancelToken: this.source.token});
    }
    
    async GetById(id)
    {
        return await axios.get(this.ApiUrl + "/"+ id)
    }

    async Post(dto)
    {
        return await axios.post(this.ApiUrl, dto);
    }

    async Put(dto)
    {
        return await axios.put(this.ApiUrl, dto);
    }

    async Delete(id)
    {
        return await axios.delete(this.ApiUrl + "/" + id);
    }

    Cancel()
    {
        this.source.cancel();
    }
}

export default GenericService;