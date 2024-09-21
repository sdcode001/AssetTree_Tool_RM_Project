using System.ComponentModel.DataAnnotations.Schema;

namespace AssetTree_Tool.Models.Entity;

[Table("assets")]
public class Asset
{
    [Column("id")]
    public int id { get; set; }

    [Column("asset_name")]
    public string asset_name { get; set; }

    [Column("display_name")]
    public string display_name { get; set; }

    [Column("asset_type_name")]
    public string asset_type_name { get; set; }

    [Column("asset_type_id")]
    public int asset_type_id { get; set; }

    [Column("parent_asset_id")]
    public int? parent_asset_id { get; set; }
}
