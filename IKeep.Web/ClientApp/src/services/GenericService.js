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
        return await axios.get(this.Url)
    }

    /* async getDataAxios(){
        const response =
          await axios.get("api/users")
        console.log(response.data)
    } */

    /* Post(entity)
    {
        return this.Http.post(this.Url, entity, this.Config);
    }

    Put(entity)
    {
        let urlID = this.Url + entity.Id;
        return this.Http.put(this.Url, entity, this.Config);
    }

    Delete(entity)
    {
        let urlID = this.Url + entity.Id;
        return this.Http.delete(urlID);
    } */
}

export default GenericService;