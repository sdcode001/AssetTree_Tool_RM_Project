using System.ComponentModel.DataAnnotations.Schema;

namespace AssetTree_Tool.Models.Entity;


[Table("asset_datails")]
public class AssetDetail {
    [Column("id")]
    public int id { get; set; }

    [Column("tag_name")]
    public string tag_name { get; set; }

    [Column("display_name")]
    public string display_name { get; set; }

    [Column("tag_type")]
    public string tag_type { get; set; }

    [Column("unit_name")]
    public string unit_name { get; set; }

    [Column("unit_symbol")]
    public string unit_symbol { get; set; }

}
