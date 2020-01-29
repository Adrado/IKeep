class MultimediaDto
{
    constructor(json)
    {
        if(json)
        {
            this.MultimediaId = json.multimediaDto;
            this.ParentId = json.parentId;
            this.Base64 = json.base64;
            this.CreateDate = json.createDate;
            this.Name = json.name;
            this.Description = json.description;
            this.Downloads = json.downloads;
        }
        else
        {
            this.MultimediaId = "00000000-0000-0000-0000-000000000000";
            this.ParentId = "";
            this.Base64 = "";
            this.CreateDate = "";
            this.Name = "";
            this.Description = "";
            this.Downloads = "";
        }
    }
}

export default MultimediaDto;