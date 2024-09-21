using AssetTree_Tool.Models.Entity;

namespace AssetTree_Tool.Models;

public class AssetDetailQueryOutput {
    public string asset_id { get; set; }

    public int tags_count { get; set; }

    public List<AssetDetail> tags { get; set; }
}

