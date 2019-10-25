class TreeNode
{
    constructor(json)
    {
        if(json)
        {
            this.Id = json.id,
            this.ParentId = json.parentId,
            this.New = json.new ? json.new : false,
            this.Type = json.type
        }
        else
        {
            this.Id = null,
            this.ParentId = "",
            this.New = false,
            this.Type = ""
        }
    }
}

export default TreeNode