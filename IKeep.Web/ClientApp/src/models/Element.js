import Entity from './Entity'

class Element extends Entity
{
    constructor(json)
    {
        super(json);
        if(json)
        {
            this.Status = json.status;
            this.RetirementDate = json.retirementDate;
            this.Ref = json.ref;
            this.Brand = json.brand;
            this.Model = json.model;
            this.Description = json.description;
            this.SafetyAndHealth = json.safetyAndHealth;
            
            this.AreaId = json.areaId;
            this.Location = json.location;
            this.GenericElementId = json.genericElementId;

            this.Name = json.name;
            this.TypeName = json.typeName;

            this.ElementGenericChoresIds = json.elementGenericChoresIds;
            this.Correctives = json.correctives;
            this.Observations = json.observations;

            this.Chores = json.chores;
        }
        else
        {
            this.Status = 1;
            this.RetirementDate = "";
            this.Ref = "";
            this.Brand = "";
            this.Model = "";
            this.Description = "";
            this.SafetyAndHealth = "";
            
            this.AreaId = "";
            this.Location = "";
            this.GenericElementId = "";

            this.Name = "";
            this.TypeName = "";

            this.ElementGenericChoresIds = [];
            this.Correctives = [];
            this.Observations = [];

            this.Chores = [];
        }
    }
}

export default Element;