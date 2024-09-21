namespace AssetTree_Tool.Models;

public class AssetTreeNode
{
    public int asset_id {  get; set; }

    public string asset_name { get; set; }

    public string display_name { get; set; }

    public string asset_type_name { get; set; }

    public List<AssetTreeNode> childs { get; set; }
}
