import GenericService from './GenericService'
class ImagesService extends GenericService
{
    constructor()
    {
        super("images");
    }
    
    GetCurrentChores(request)
    {
        return this.Post(request);
    }
}

export default ImagesService;
