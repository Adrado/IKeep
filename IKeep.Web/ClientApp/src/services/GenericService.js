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

    constructor(url)
    {
        this.Url = url;
        //this.Token = $window.Token;
    }

    async Get()
    {
        return await axios.get(this.Url);
    }

    async Post(entity)
    {
        return await axios.post(this.Url, entity);
    }

    async Put(entity)
    {
        return await axios.put(this.Url, entity);
    }

    async Delete(entity)
    {
        let urlId = this.Url + entity.Id;
        return await axios.delete(urlId);
    }
}

export default GenericService;