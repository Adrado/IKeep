import GenericService from'./GenericService'
class CRUDService extends GenericService
{
    constructor(model)
    {
        super(model);
    }

    GetAllAsync()
    {
        return this.Get();
    }

    GetByIdAsync(id)
    {
        return this.GetById(id)
    }

    AddAsync(dto)
    {
        return this.Post(dto);
    }

    UpdateAsync(dto)
    {
        return this.Put(dto);
    }

    DeleteAsync(id)
    {
        return this.Delete(id);
    }
    CancelOperation()
    {
        return this.Cancel();
    }
}

export default CRUDService;