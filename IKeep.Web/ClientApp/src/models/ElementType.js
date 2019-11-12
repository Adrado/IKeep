import Entity from './Entity';

class ElementType extends Entity
{
    constructor(json)
    {
        super(json)
        if(json)
        {
            this.Ref = json.ref;
            this.Name = json.name;
            this.GenericElementsIds = json.genericElementsIds;
        }
        else
        {
            this.Ref = "";
            this.Name = "";
            this.GenericElementsIds = [];
        } 
    }
}
export default ElementType;