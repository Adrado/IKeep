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
    }

    async Get()
    {
        return await axios.get(this.ApiUrl);
    }
    
    async GetById(id)
    {
        return await axios.get(this.ApiUrl + "/"+ id)
    }

    async Post(entity)
    {
        return await axios.post(this.ApiUrl, entity);
    }

    async Put(entity)
    {
        return await axios.put(this.ApiUrl, entity);
    }

    async Delete(id)
    {
        return await axios.delete(this.ApiUrl + "/" + id);
    }
}

export default GenericService;