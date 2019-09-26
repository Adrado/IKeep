import GenericService from'./GenericService'
class CRUDService extends GenericService
{
    constructor(url)
    {
        super(url);
    }

    GetAllAsync()
    {
        return this.Get();
    }

    AddAsync(entity)
    {
        return this.Post(entity);
    }

    UpdateAsync(entity)
    {
        return this.Put(entity);
    }

    DeleteAsync(entity)
    {
        return this.Delete(entity);
    }
}

export default CRUDService;